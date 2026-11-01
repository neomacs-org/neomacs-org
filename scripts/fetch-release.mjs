#!/usr/bin/env node
/**
 * Writes src/data/latest-release.json from the latest GitHub release of
 * eval-exec/neomacs, so the download section never pins a stale version.
 *
 * The release asset names encode OS, architecture and package kind, e.g.
 * `neomacs-0.0.20-aarch64-apple-darwin.dmg`. This classifies them once at
 * build time; the site then renders links straight from the JSON.
 *
 * Without network access (or when GitHub rate-limits the request) this warns
 * and exits 0, leaving the committed file in place — same contract as
 * fetch-sponsors.mjs.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outFile = join(root, 'src', 'data', 'latest-release.json');

const API = 'https://api.github.com/repos/eval-exec/neomacs/releases/latest';

const archOf = (name) => (/(aarch64|arm64)/i.test(name) ? 'aarch64' : 'x86_64');

const classify = (name) => {
  if (name.endsWith('.AppImage')) {
    return { os: 'linux', kind: 'AppImage', arch: archOf(name) };
  }
  if (name.endsWith('.deb')) {
    return { os: 'linux', kind: '.deb', arch: archOf(name) };
  }
  if (name.endsWith('.rpm')) {
    return { os: 'linux', kind: '.rpm', arch: archOf(name) };
  }
  if (name.includes('linux') && name.endsWith('.tar.gz')) {
    return { os: 'linux', kind: '.tar.gz', arch: archOf(name) };
  }
  if (name.includes('apple-darwin')) {
    const kind = ['.dmg', '.zip', '.tar.gz'].find((ext) => name.endsWith(ext));
    if (kind) return { os: 'macos', kind, arch: archOf(name) };
  }
  if (name.includes('pc-windows-msvc')) {
    const kind = name.endsWith('user-setup.exe') ? 'Installer' : name.endsWith('.zip') ? '.zip' : null;
    if (kind) return { os: 'windows', kind, arch: archOf(name) };
  }
  return null;
};

async function main() {
  try {
    const res = await fetch(API, {
      headers: {
        Accept: 'application/vnd.github+json',
        'User-Agent': 'neomacs.org-build',
      },
    });
    if (!res.ok) throw new Error(`GitHub API responded ${res.status}`);

    const release = await res.json();
    const data = {
      tag: release.tag_name,
      version: String(release.tag_name ?? '').replace(/^v/, ''),
      publishedAt: release.published_at,
      assets: (release.assets ?? [])
        .map((asset) => {
          const meta = classify(asset.name);
          return meta ? { name: asset.name, url: asset.browser_download_url, ...meta } : null;
        })
        .filter(Boolean),
    };

    writeFileSync(outFile, `${JSON.stringify(data, null, 2)}\n`);
    console.log(`Latest release ${data.tag}: ${data.assets.length} package assets.`);
  } catch (error) {
    let cached = false;
    try {
      readFileSync(outFile);
      cached = true;
    } catch {
      // no cache either
    }
    console.warn(
      `Could not fetch the latest release (${error.message}); ` +
        (cached ? 'keeping the existing latest-release.json.' : 'no cached file available.')
    );
  }
}

await main();
