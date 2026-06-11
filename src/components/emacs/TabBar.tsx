export interface TabBarTab {
  id: string;
  label: string;
}

/* The eval/apply cycle: two lambdas chasing each other, spinning */
const EvalApply = () => (
  <svg viewBox="0 0 40 40" className="eval-apply" role="img" aria-label="the eval/apply cycle">
    <circle cx="20" cy="20" r="18.5" fill="#14141b" stroke="#2a2a33" strokeWidth="1" />

    {/* cycle arrows */}
    <path
      d="M 29.3 8.9 A 14.5 14.5 0 0 1 29.3 31.1"
      fill="none"
      stroke="#ff4d4d"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <polygon points="27.2,32.9 28.3,29.9 30.3,32.3" fill="#ff4d4d" />
    <path
      d="M 10.7 31.1 A 14.5 14.5 0 0 1 10.7 8.9"
      fill="none"
      stroke="#ff9900"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <polygon points="12.8,7.1 11.7,10.1 9.7,7.7" fill="#ff9900" />

    {/* two lambdas in point symmetry */}
    <text
      x="20"
      y="17"
      textAnchor="middle"
      fontSize="13"
      fontWeight="bold"
      fill="#ff4d4d"
      fontFamily="JetBrains Mono, monospace"
    >
      λ
    </text>
    <text
      x="20"
      y="17"
      textAnchor="middle"
      fontSize="13"
      fontWeight="bold"
      fill="#ff9900"
      fontFamily="JetBrains Mono, monospace"
      transform="rotate(180 20 20)"
    >
      λ
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
