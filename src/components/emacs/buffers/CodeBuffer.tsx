import type { ReactNode } from 'react';

const CODE_LINES: ReactNode[] = [
  <span className="code-comment">;; Welcome to the future of editing</span>,
  <>(<span className="code-keyword">require</span> <span className="code-const">'neo-emacs</span>)</>,
  <>&nbsp;</>,
  <span className="code-comment">;; GPU acceleration enabled</span>,
  <>(<span className="code-keyword">setq</span> neomacs-gpu-backend <span className="code-const">'vulkan</span>)</>,
  <>(<span className="code-keyword">setq</span> neomacs-render-fps <span className="code-number">120</span>)</>,
  <>&nbsp;</>,
  <span className="code-comment">;; Rich buffers: video + WebKit</span>,
  <>(neomacs-play-video <span className="code-string">"demo.webm"</span>)</>,
  <>(neomacs-webkit-browse <span className="code-string">"https://neomacs.org"</span>)</>,
  <>&nbsp;</>,
  <span className="code-comment">;; Activating future effects</span>,
  <>(neomacs-cursor-mode <span className="code-const">'pixiedust</span>)</>,
  <>(neomacs-scroll-effect <span className="code-const">'wobbly</span>)</>,
  <>&nbsp;</>,
  <>
    (<span className="code-keyword">message</span> <span className="code-string">"NEO Emacs is ready."</span>)
    <span className="cursor-blink"></span>
  </>,
];

export const CodeBuffer = () => (
  <div className="code-buffer">
    <div className="line-numbers">
      {CODE_LINES.map((_, i) => (
        <div key={i} className="line-no">
          {i + 1}
        </div>
      ))}
    </div>
    <div className="code-area">
      {CODE_LINES.map((line, i) => (
        <div key={i} className="code-line">
          {line}
        </div>
      ))}
    </div>
  </div>
);
