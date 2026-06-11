import type { ReactNode } from 'react';

export const LinesBuffer = ({ lines, variant }: { lines: ReactNode[]; variant?: string }) => (
  <div className={`lines-buffer${variant ? ` lines-${variant}` : ''}`}>
    {lines.map((line, i) => (
      <div key={i} className="buf-line">
        {line}
      </div>
    ))}
  </div>
);
