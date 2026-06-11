import { Play } from 'lucide-react';

const MONO = 'JetBrains Mono, monospace';

const STARS: Array<[number, number, number, string]> = [
  [52, 28, 1.4, '#8be9fd'],
  [120, 16, 1, '#ff9900'],
  [232, 22, 1.2, '#ff4d4d'],
  [296, 44, 1, '#bd93f9'],
  [36, 92, 1, '#50fa7b'],
  [310, 120, 1.4, '#8be9fd'],
  [160, 12, 1, '#f1fa8c'],
  [266, 158, 1, '#ff9900'],
];

const ImageFigure = () => (
  <svg
    viewBox="0 0 340 190"
    className="media-image"
    role="img"
    aria-label="NEO Emacs emblem with Lisp artwork"
  >
    <defs>
      <linearGradient id="neo-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#ff4d4d" />
        <stop offset="100%" stopColor="#ff9900" />
      </linearGradient>
      <radialGradient id="neo-glow" cx="0.5" cy="0.45" r="0.6">
        <stop offset="0%" stopColor="#ff4d4d" stopOpacity="0.18" />
        <stop offset="100%" stopColor="#ff4d4d" stopOpacity="0" />
      </radialGradient>
    </defs>

    <rect width="340" height="190" rx="8" fill="#0d0d12" />
    <rect width="340" height="190" rx="8" fill="url(#neo-glow)" />

    {/* giant framing parens */}
    <text x="14" y="150" fill="#1b1b26" fontSize="150" fontFamily={MONO}>
      (
    </text>
    <text x="282" y="150" fill="#1b1b26" fontSize="150" fontFamily={MONO}>
      )
    </text>

    {/* star dust */}
    {STARS.map(([x, y, r, c], i) => (
      <circle key={i} cx={x} cy={y} r={r} fill={c} opacity="0.7" />
    ))}

    {/* center emblem */}
    <text
      x="170"
      y="92"
      textAnchor="middle"
      fill="url(#neo-grad)"
      fontSize="58"
      fontWeight="bold"
      fontFamily={MONO}
    >
      λ
    </text>
    <text
      x="170"
      y="120"
      textAnchor="middle"
      fill="#f5f5f5"
      fontSize="19"
      fontWeight="bold"
      letterSpacing="5"
      fontFamily={MONO}
    >
      NEO Emacs
    </text>
    <text
      x="170"
      y="138"
      textAnchor="middle"
      fill="#6272a4"
      fontSize="9"
      fontStyle="italic"
      fontFamily={MONO}
    >
      (the future of Emacs)
    </text>

    {/* top-right dotted pair */}
    <text x="318" y="26" textAnchor="end" fill="#bd93f9" fontSize="9" fontFamily={MONO}>
      {"'(λ . ∞)"}
    </text>

    {/* bottom-left cons cell diagram: (cons 'λ nil) */}
    <g stroke="#555" strokeWidth="1" fill="none">
      <rect x="24" y="150" width="20" height="16" rx="2" />
      <rect x="44" y="150" width="20" height="16" rx="2" />
      <line x1="34" y1="158" x2="34" y2="172" />
      <line x1="54" y1="158" x2="70" y2="158" />
    </g>
    <circle cx="34" cy="158" r="1.6" fill="#ff9900" />
    <circle cx="54" cy="158" r="1.6" fill="#8be9fd" />
    <text x="31" y="181" fill="#ff9900" fontSize="9" fontFamily={MONO}>
      λ
    </text>
    <text x="73" y="161" fill="#8be9fd" fontSize="8" fontFamily={MONO}>
      nil
    </text>

    {/* bottom-right affirmation */}
    <text x="318" y="178" textAnchor="end" fill="#ff79c6" fontSize="9" fontFamily={MONO}>
      (setq future t)
    </text>
  </svg>
);

const VideoFigure = () => (
  <div className="fake-video">
    <div className="video-scene">
      <div className="video-aurora aurora-red"></div>
      <div className="video-aurora aurora-amber"></div>
      <span className="video-lambda">λ</span>
      <span className="video-badge">4K · GPU</span>
    </div>
    <div className="video-controls">
      <Play size={11} fill="currentColor" />
      <div className="video-progress">
        <div className="video-progress-fill"></div>
      </div>
      <span className="video-time">0:42 / 1:30</span>
    </div>
  </div>
);

export const MediaBuffer = () => (
  <div className="media-buffer">
    <div className="org-line org-title">#+TITLE: Rich Media Buffers</div>
    <div className="org-line org-heading">
      <span className="org-star">*</span> Images — GPU decoded
    </div>
    <div className="org-line org-link">[[file:neo-emacs.svg]]</div>
    <ImageFigure />
    <div className="org-line org-heading">
      <span className="org-star">*</span> Video — zero-copy playback
    </div>
    <div className="org-line org-link">[[video:demo.webm]]</div>
    <VideoFigure />
    <div className="org-line org-heading">
      <span className="org-star">*</span> Notes
    </div>
    <div className="org-line">Any buffer can mix text, images,</div>
    <div className="org-line">4K video and live web views —</div>
    <div className="org-line">all composited by wgpu.</div>
    <div className="org-line org-dim">⌄ scroll me — 120 fps smooth ⌄</div>
  </div>
);
