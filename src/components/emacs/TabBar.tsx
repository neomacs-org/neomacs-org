export interface TabBarTab {
  id: string;
  label: string;
}

/* The eval/apply cycle as a spinning taijitu (SICP cover style) */
const EvalApply = () => (
  <svg viewBox="0 0 40 40" className="eval-apply" role="img" aria-label="the eval/apply cycle">
    <circle cx="20" cy="20" r="18" fill="#ff9900" />
    <path d="M20 2 a18 18 0 0 1 0 36 a9 9 0 0 1 0 -18 a9 9 0 0 0 0 -18 Z" fill="#ff4d4d" />
    <circle cx="20" cy="11" r="3.2" fill="#ff4d4d" />
    <circle cx="20" cy="29" r="3.2" fill="#ff9900" />
    <text
      x="11.5"
      y="22.5"
      textAnchor="middle"
      fontSize="4.6"
      fontWeight="bold"
      fill="rgba(0, 0, 0, 0.6)"
      fontFamily="JetBrains Mono, monospace"
    >
      eval
    </text>
    <text
      x="28.5"
      y="22.5"
      textAnchor="middle"
      fontSize="4.6"
      fontWeight="bold"
      fill="rgba(0, 0, 0, 0.6)"
      fontFamily="JetBrains Mono, monospace"
    >
      apply
    </text>
  </svg>
);

export const TabBar = ({
  tabs,
  active,
  onSelect,
}: {
  tabs: TabBarTab[];
  active: string;
  onSelect: (id: string) => void;
}) => (
  <div className="emacs-tab-bar" title="tab-bar (frame-level workspaces)">
    <span className="tab-bar-brand">
      <EvalApply />
      <span className="tab-bar-badge">Emacs Lisp Machine</span>
    </span>
    {tabs.map((tab, i) => (
      <button
        key={tab.id}
        type="button"
        className={`tab-bar-tab${tab.id === active ? ' active' : ''}`}
        onClick={() => onSelect(tab.id)}
      >
        <span className="tab-index">{i + 1}</span>
        {tab.label}
      </button>
    ))}
    <div className="tab-bar-tab tab-bar-new">+</div>
    <div className="tab-bar-hint">tab-bar-mode</div>
  </div>
);
