import type { ModeLineInfo } from './types';

export const ModeLine = ({ info, active }: { info: ModeLineInfo; active: boolean }) => (
  <div className={`emacs-mode-line${active ? ' active' : ''}`}>
    <div className="mode-line-left">
      <span className="mode-tag">{info.tag}</span>
      <span className="mode-file-name">{info.name}</span>
      <span className="mode-pos">{info.pos}</span>
      <span className="major-mode">
        <span className="mode-icon">λ</span> {info.mode}
      </span>
    </div>
    <div className="mode-line-right">
      {info.right.map((stat) => (
        <span key={stat.label} className={`mode-stat${stat.accent ? ' accent' : ''}`}>
          {stat.label}
        </span>
      ))}
    </div>
  </div>
);
