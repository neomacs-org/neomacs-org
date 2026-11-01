import { Apple, Download, Monitor, Terminal } from 'lucide-react';
import releaseData from '../data/latest-release.json';

const RELEASES_URL = 'https://github.com/eval-exec/neomacs/releases';

const release = releaseData as { tag: string };

const PLATFORMS = [
  {
    id: 'linux',
    label: 'Linux',
    icon: Terminal,
    note: 'x86_64 · ARM64',
  },
  {
    id: 'macos',
    label: 'macOS',
    icon: Apple,
    note: 'Intel · Apple Silicon',
  },
  {
    id: 'windows',
    label: 'Windows',
    icon: Monitor,
    note: 'x86_64 · ARM64',
  },
];

export const DownloadSection = () => (
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
      {PLATFORMS.map((platform) => (
        <div key={platform.id} className="download-card-dense">
          <div className="download-card-head">
            <span className="download-platform">
              <platform.icon size={14} aria-hidden="true" />
              {platform.label}
            </span>
          </div>
          <span className="download-note">{platform.note}</span>
          <a
            className="download-primary-btn"
            href={RELEASES_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Download size={13} aria-hidden="true" />
            Download
          </a>
        </div>
      ))}
    </div>
  </section>
);
