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
 * Without a token this warns and exits 0, leaving any existing file in place,
 * so local builds and outside contributions never break on a missing secret.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outFile = join(root, 'src', 'data', 'sponsors.json');

const token = process.env.GH_TOKEN || process.env.GITHUB_TOKEN;
// Overridable so the pagination and privacy logic can be tested against a stub.
const endpoint = process.env.GITHUB_GRAPHQL_URL || 'https://api.github.com/graphql';

if (!token) {
  console.warn('[sponsors] GH_TOKEN unset — keeping the existing sponsors.json');
  process.exit(0);
}

// Asks only for identity of sponsors who are already public. `tier` is
// deliberately not requested: GitHub's generated tier names are dollar
// amounts, so asking for it would pull sponsor amounts into the repo.
const PUBLIC_QUERY = `
  query ($after: String) {
    viewer {
      sponsorshipsAsMaintainer(first: 100, after: $after, includePrivate: false) {
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
    return Array.isArray(parsed?.sponsors) ? parsed.sponsors.length : 0;
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

async function fetchPublicNodes() {
  const nodes = [];
  let after = null;

  // Cursor loop: a single `first: 100` would silently drop sponsor #101.
  for (;;) {
    const page = await graphql(PUBLIC_QUERY, { after });
    nodes.push(...page.nodes);
    if (!page.pageInfo.hasNextPage) break;
    after = page.pageInfo.endCursor;
    if (nodes.length >= 1000) {
      console.warn('[sponsors] stopped at 1000 sponsors');
      break;
    }
  }

  return nodes;
}

let sponsors;
let anonymousCount;
try {
  const nodes = await fetchPublicNodes();
  const { totalCount } = await graphql(COUNT_QUERY);

  // A node can come back with a null sponsorEntity when the account behind it
  // was deleted. It is still counted in totalCount, so it has to be subtracted
  // separately — deriving the anonymous count from the rendered list instead
  // would quietly promote each dead account into an anonymous sponsor.
  const usable = nodes.filter((node) => node.sponsorEntity);
  const dropped = nodes.length - usable.length;
  if (dropped > 0) {
    console.warn(`[sponsors] skipped ${dropped} sponsorship(s) with no sponsor account`);
  }

  sponsors = usable.map((node) => ({
    login: node.sponsorEntity.login,
    name: node.sponsorEntity.name || node.sponsorEntity.login,
    avatarUrl: node.sponsorEntity.avatarUrl,
    url: node.sponsorEntity.url,
  }));

  anonymousCount = Math.max(0, totalCount - nodes.length);
} catch (err) {
  // Never fail a build over the sponsors strip — the section degrades to its CTA.
  console.warn(`[sponsors] fetch failed: ${err.message}`);
  console.warn('[sponsors] keeping the existing sponsors.json');
  process.exit(0);
}

// A valid token can legitimately return nothing — the wrong account, a token
// for a bot, or a transient empty response. Writing that would blank a live
// sponsor wall on deploy, so an empty result never overwrites a populated file.
if (sponsors.length === 0 && anonymousCount === 0) {
  const previous = readSponsorCount(outFile);
  if (previous > 0) {
    console.warn(`[sponsors] fetch returned no sponsors, but sponsors.json lists ${previous}.`);
    console.warn('[sponsors] Keeping the existing file. If your sponsors really have all');
    console.warn('[sponsors] gone, delete src/data/sponsors.json and run this again.');
    process.exit(0);
  }
}

// Sponsors are kept in the order the API returns them — no sorting, since any
// ordering would imply a ranking we deliberately do not compute.
const payload = { sample: false, sponsors, anonymousCount };
writeFileSync(outFile, `${JSON.stringify(payload, null, 2)}\n`);
console.log(
  `[sponsors] wrote ${sponsors.length} public + ${anonymousCount} anonymous sponsor(s)`,
);
