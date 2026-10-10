#!/usr/bin/env node
/**
 * Writes src/data/sponsors.json from the maintainer's GitHub Sponsors.
 *
 * Sponsors cannot be read without authentication: GitHub's
 * `sponsorshipsAsMaintainer` field only answers for the authenticated account,
 * and there is no public endpoint. So this runs at build time with a token in
 * the environment (CI secret), and the result is bundled as static JSON — the
 * token never reaches the client.
 *
 * Privacy: private sponsors are counted but never named. Two queries give the
 * count without needing the `read:user` scope — which a stock `gh auth login`
 * token does not have, and which reading `privacyLevel` would require:
 *
 *   includePrivate: false -> the public sponsors, with identity
 *   includePrivate: true  -> totalCount, identity never requested
 *
 * The difference is how many sponsors chose to stay anonymous. A private
 * sponsor's login, name and avatar are therefore never fetched, never written
 * to the committed JSON, and never bundled — there is nothing to leak.
 *
 * Past sponsors are listed too, by set difference: the sponsorships the
 * maintainer has ever received, minus the current ones. That is deliberate.
 * GitHub distinguishes current from past with `Sponsorship.isActive`, but that
 * field requires the `read:user` scope — the very scope this script exists to
 * avoid (the API answers INSUFFICIENT_SCOPES without it). The `activeOnly`
 * argument is not scope-gated, so the two-pass difference is the way in. Do
 * not "simplify" this to `isActive`; the scheduled job would start failing.
 *
 * Without a token this warns and exits 0, leaving any existing file in place,
 * so local builds and outside contributions never break on a missing secret.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outFile = join(root, 'src', 'data', 'sponsors.json');

// In a build, a missing or bad token must never break anything — the committed
// file is a perfectly good fallback. In the scheduled refresh it is the whole
// job, so a silent no-op would look identical to "no new sponsors" and could
// go unnoticed for months. --strict turns those into a visible failure.
const strict = process.argv.includes('--strict');

const token = process.env.GH_TOKEN || process.env.GITHUB_TOKEN;
// Overridable so the pagination and privacy logic can be tested against a stub.
const endpoint = process.env.GITHUB_GRAPHQL_URL || 'https://api.github.com/graphql';

// Logins listed here are dropped from the current and the past list alike —
// the escape hatch for someone who asks to be taken off the wall. GitHub
// logins are case-insensitive, so write entries in lowercase; they are
// compared against the lowercased login.
const HIDDEN_LOGINS = new Set();

if (!token) {
  console.warn('[sponsors] GH_TOKEN unset — keeping the existing sponsors.json');
  process.exit(strict ? 1 : 0);
}

// Asks only for identity of sponsors who are already public. `tier` is
// deliberately not requested: GitHub's generated tier names are dollar
// amounts, so asking for it would pull sponsor amounts into the repo.
//
// `activeOnly` is the one difference between the two passes: true is the list
// shown as current sponsors, false is everyone who has ever sponsored. The
// difference between the two sets is the past list.
const PUBLIC_QUERY = (activeOnly) => `
  query ($after: String) {
    viewer {
      sponsorshipsAsMaintainer(first: 100, after: $after, includePrivate: false, activeOnly: ${activeOnly}) {
        pageInfo { hasNextPage endCursor }
        nodes {
          sponsorEntity {
            ... on User { login name avatarUrl url }
            ... on Organization { login name avatarUrl url }
          }
        }
      }
    }
  }
`;

// Asks only for a number — no sponsorEntity is requested, so this cannot
// return a private sponsor's identity even by accident.
const COUNT_QUERY = `
  query {
    viewer {
      sponsorshipsAsMaintainer(first: 1, includePrivate: true) {
        totalCount
      }
    }
  }
`;

/** How many sponsors the file on disk currently lists, or 0 if unreadable. */
function readSponsorCount(file) {
  try {
    const parsed = JSON.parse(readFileSync(file, 'utf8'));
    const active = Array.isArray(parsed?.sponsors) ? parsed.sponsors.length : 0;
    const past = Array.isArray(parsed?.pastSponsors) ? parsed.pastSponsors.length : 0;
    return active + past;
  } catch {
    return 0;
  }
}

async function graphql(query, variables) {
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'User-Agent': 'neomacs-org-sponsors-build',
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    throw new Error(`GitHub API responded ${res.status} ${res.statusText}`);
  }

  const json = await res.json();
  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join('; '));
  }

  return json.data.viewer.sponsorshipsAsMaintainer;
}

async function fetchPublicNodes(activeOnly) {
  const nodes = [];
  let after = null;

  // Cursor loop: a single `first: 100` would silently drop sponsor #101.
  for (;;) {
    const page = await graphql(PUBLIC_QUERY(activeOnly), { after });
    nodes.push(...page.nodes);
    if (!page.pageInfo.hasNextPage) break;
    after = page.pageInfo.endCursor;
    if (nodes.length >= 1000) {
      console.warn(`[sponsors] stopped at 1000 sponsorships (activeOnly: ${activeOnly})`);
      break;
    }
  }

  return nodes;
}

/** One committed entry per sponsorship node; all of it is already public. */
const toSponsor = (node) => ({
  login: node.sponsorEntity.login,
  name: node.sponsorEntity.name || node.sponsorEntity.login,
  avatarUrl: node.sponsorEntity.avatarUrl,
  url: node.sponsorEntity.url,
});

/**
 * Turns raw nodes into entries, dropping deleted accounts (GitHub returns a
 * null sponsorEntity for those) and hidden logins. `label` only shapes the
 * warning, so one pass cannot be mistaken for the other in the log.
 */
function usableSponsors(nodes, label) {
  const withEntity = nodes.filter((node) => node.sponsorEntity);
  const dropped = nodes.length - withEntity.length;
  if (dropped > 0) {
    console.warn(`[sponsors] skipped ${dropped} ${label} sponsorship(s) with no sponsor account`);
  }

  return withEntity
    .map(toSponsor)
    .filter((sponsor) => !HIDDEN_LOGINS.has(sponsor.login.toLowerCase()));
}

let sponsors;
let pastSponsors;
let anonymousCount;
try {
  const activeNodes = await fetchPublicNodes(true);
  const allNodes = await fetchPublicNodes(false);
  const { totalCount } = await graphql(COUNT_QUERY);

  sponsors = usableSponsors(activeNodes, 'current');
  const everSponsors = usableSponsors(allNodes, 'historical');

  // A cancelled-then-rejoined sponsor has two nodes in the all-time list, and
  // two cancelled stints would otherwise produce two past cards carrying one
  // login. Dedupe by login, and let the current list win over any past node.
  const seen = new Set(sponsors.map((sponsor) => sponsor.login.toLowerCase()));
  pastSponsors = [];
  for (const sponsor of everSponsors) {
    const login = sponsor.login.toLowerCase();
    if (seen.has(login)) continue;
    seen.add(login);
    pastSponsors.push(sponsor);
  }

  // If the two passes ever swap `activeOnly`, this is what catches it: every
  // current sponsor must also appear in the all-time list. Without the check,
  // past sponsors would quietly take over the wall's prominent grid.
  const everLogins = new Set(everSponsors.map((sponsor) => sponsor.login.toLowerCase()));
  const missing = sponsors.find((sponsor) => !everLogins.has(sponsor.login.toLowerCase()));
  if (missing) {
    throw new Error(`current sponsor @${missing.login} is missing from the all-time list`);
  }

  // A node can come back with a null sponsorEntity when the account behind it
  // was deleted. It is still counted in totalCount, so it has to be subtracted
  // separately — deriving the anonymous count from the rendered list instead
  // would quietly promote each dead account into an anonymous sponsor. The
  // count is deliberately the active one: the anonymous tile sits among the
  // current sponsors, and private past sponsors are never fetched at all.
  anonymousCount = Math.max(0, totalCount - activeNodes.length);
} catch (err) {
  // Never fail a build over the sponsors strip — the section degrades to its CTA.
  console.warn(`[sponsors] fetch failed: ${err.message}`);
  console.warn('[sponsors] keeping the existing sponsors.json');
  process.exit(strict ? 1 : 0);
}

// A valid token can legitimately return nothing — the wrong account, a token
// for a bot, or a transient empty response. Writing that would blank a live
// sponsor wall on deploy, so an empty result never overwrites a populated file.
if (sponsors.length === 0 && anonymousCount === 0 && pastSponsors.length === 0) {
  const previous = readSponsorCount(outFile);
  if (previous > 0) {
    console.warn(
      `[sponsors] fetch returned no sponsors at all, but sponsors.json lists ${previous}.`,
    );
    console.warn('[sponsors] Keeping the existing file. If your sponsors really have all');
    console.warn('[sponsors] gone, delete src/data/sponsors.json and run this again.');
    // The likeliest cause is a token for the wrong account, which is exactly
    // what a scheduled run needs to shout about rather than swallow.
    process.exit(strict ? 1 : 0);
  }
}

// Both lists are kept in the order the API returns them — no sorting, since
// any ordering would imply a ranking we deliberately do not compute.
const payload = { sample: false, sponsors, anonymousCount, pastSponsors };
writeFileSync(outFile, `${JSON.stringify(payload, null, 2)}\n`);
console.log(
  `[sponsors] wrote ${sponsors.length} public + ${anonymousCount} anonymous` +
    ` + ${pastSponsors.length} past sponsor(s)`,
);
