import { Play } from 'lucide-react';

const BARS = [38, 52, 30, 64, 44, 72, 58, 86, 66, 94, 78, 60];

const ImageFigure = () => (
  <svg
    viewBox="0 0 320 130"
    className="media-image"
    role="img"
    aria-label="Frame time graph rendered as an inline image"
  >
    <defs>
      <linearGradient id="media-bar-grad" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0%" stopColor="#ff4d4d" />
        <stop offset="100%" stopColor="#ff9900" />
      </linearGradient>
    </defs>
    <rect width="320" height="130" rx="8" fill="#101016" />
    {BARS.map((h, i) => (
      <rect
        key={i}
        x={18 + i * 24}
        y={108 - h * 0.85}
        width="14"
        height={h * 0.85}
        rx="3"
        fill="url(#media-bar-grad)"
        opacity={0.45 + (i / BARS.length) * 0.55}
      />
    ))}
    <text x="18" y="24" fill="#888" fontSize="11" fontFamily="JetBrains Mono, monospace">
      frame time: 2.1 ms
    </text>
    <text x="290" y="26" fill="#ff4d4d" fontSize="18" fontFamily="JetBrains Mono, monospace" fontWeight="bold">
      λ
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
    <div className="org-line org-link">[[file:frame-graph.svg]]</div>
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
