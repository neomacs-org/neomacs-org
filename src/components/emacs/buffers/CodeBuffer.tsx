import type { ReactNode } from 'react';

export const CodeBuffer = ({ lines }: { lines: ReactNode[] }) => (
  <div className="code-buffer">
    <div className="line-numbers">
      {lines.map((_, i) => (
        <div key={i} className="line-no">
          {i + 1}
        </div>
      ))}
    </div>
    <div className="code-area">
      {lines.map((line, i) => (
        <div key={i} className="code-line">
          {line}
        </div>
      ))}
    </div>
  </div>
);
