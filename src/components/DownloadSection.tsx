import { useEffect, useState } from 'react';
import { Apple, Download, ExternalLink, Monitor, Terminal } from 'lucide-react';
import releaseData from '../data/latest-release.json';

type Platform = 'linux' | 'macos' | 'windows';
type Arch = 'x86_64' | 'aarch64';

type ReleaseAsset = {
  name: string;
  url: string;
  os: Platform;
  kind: string;
  arch: Arch;
};

type Release = {
  tag: string;
  assets: ReleaseAsset[];
};

const release = releaseData as Release;

type PlatformDef = {
  id: Platform;
  label: string;
  icon: typeof Terminal;
  primaryLabel: string;
  preferredKind: string;
};

const PLATFORMS: PlatformDef[] = [
  {
    id: 'linux',
    label: 'Linux',
    icon: Terminal,
    primaryLabel: 'Download AppImage',
    preferredKind: 'AppImage',
  },
  {
    id: 'macos',
    label: 'macOS',
    icon: Apple,
    primaryLabel: 'Download .dmg',
    preferredKind: '.dmg',
  },
  {
    id: 'windows',
    label: 'Windows',
    icon: Monitor,
    primaryLabel: 'Download Installer',
    preferredKind: 'Installer',
  },
];

const archLabel = (arch: Arch) => (arch === 'x86_64' ? 'x64' : 'arm64');

const defaultArch = (platform: Platform): Arch => (platform === 'macos' ? 'aarch64' : 'x86_64');

const detect = (): { platform: Platform; arch: Arch } => {
  const ua = navigator.userAgent;
  if (/Mac/i.test(ua)) return { platform: 'macos', arch: 'aarch64' };
  if (/Win/i.test(ua)) {
    return { platform: 'windows', arch: /arm64|aarch64/i.test(ua) ? 'aarch64' : 'x86_64' };
  }
  return { platform: 'linux', arch: /arm64|aarch64/i.test(ua) ? 'aarch64' : 'x86_64' };
};

type Detected = { platform: Platform; arch: Arch };

export const DownloadSection = () => {
  const [detected, setDetected] = useState<Detected | null>(null);

  useEffect(() => {
    const base = detect();
    setDetected(base);

    // Safari reports an Intel UA on Apple Silicon, so ask Chromium for the real
    // architecture where it is available. Elsewhere the default guess stands.
    const uaData = (
      navigator as Navigator & {
        userAgentData?: {
          getHighEntropyValues: (hints: string[]) => Promise<{ architecture?: string }>;
        };
      }
    ).userAgentData;

    uaData
      ?.getHighEntropyValues(['architecture'])
      .then((values) => {
        if (values.architecture) {
          setDetected({
            platform: base.platform,
            arch: values.architecture === 'arm' ? 'aarch64' : 'x86_64',
          });
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section id="download" className="download-section-dense">
      <div className="section-header-dense">
          <div className="section-label">
            <span className="mono-idx">[01]</span>
            <span className="mono-title">DOWNLOAD_NEO_EMACS</span>
          </div>
          <h2>Native builds for every platform</h2>
          <p className="section-sub-dense">
            Latest release {release.tag} — Linux, macOS and Windows on x86_64 and ARM64.
          </p>
        </div>

        <div className="download-grid-dense">
          {PLATFORMS.map((platform) => {
            const isDetected = detected?.platform === platform.id;
            const arch =
              detected?.platform === platform.id ? detected.arch : defaultArch(platform.id);
            const packages = release.assets.filter((asset) => asset.os === platform.id);
            const primary =
              packages.find(
                (asset) => asset.kind === platform.preferredKind && asset.arch === arch
              ) ??
              packages.find((asset) => asset.arch === arch) ??
              packages[0];
            const others = packages.filter((asset) => asset.url !== primary.url);

            return (
              <div
                key={platform.id}
                className={`download-card-dense ${isDetected ? 'detected' : ''}`}
              >
                <div className="download-card-head">
                  <span className="download-platform">
                    <platform.icon size={14} aria-hidden="true" />
                    {platform.label}
                  </span>
                  {isDetected && <span className="download-detected">DETECTED</span>}
                </div>

                <a
                  className="download-primary-btn"
                  href={primary.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download size={13} aria-hidden="true" />
                  {platform.primaryLabel}
                  <span className="download-arch">{archLabel(arch)}</span>
                </a>

                <div className="download-links">
                  {others.map((asset) => (
                    <a
                      key={asset.url}
                      className="download-link"
                      href={asset.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`${platform.label} ${asset.kind} ${archLabel(asset.arch)}`}
                    >
                      {asset.kind} {archLabel(asset.arch)}
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="download-footer-dense">
          <a
            href="https://github.com/eval-exec/neomacs/releases"
            target="_blank"
            rel="noopener noreferrer"
          >
            All releases and SHA256SUMS
            <ExternalLink size={11} aria-hidden="true" />
          </a>
        </div>
    </section>
  );
};
