export interface TabBarTab {
  id: string;
  label: string;
}

/* The eval/apply cycle, laid out like the classic Lisp logo:
   a disc with a yin-yang division and a lambda in each half,
   the second lambda centrosymmetric to the first */
const EvalApply = () => (
  <svg viewBox="0 0 40 40" className="eval-apply" role="img" aria-label="the eval/apply cycle">
    <circle cx="20" cy="20" r="18.5" fill="#ff4d4d" stroke="#2a2a33" strokeWidth="1" />
    <path
      d="M20 1.5 a18.5 18.5 0 0 1 0 37 a9.25 9.25 0 0 1 0 -18.5 a9.25 9.25 0 0 0 0 -18.5 Z"
      fill="#ff9900"
    />
    {/* each lambda rides its comma: wide base in the head bulb,
        narrow apex pointing into the tail */}
    <text
      x="16"
      y="18"
      textAnchor="middle"
      fontSize="16.5"
      fontWeight="bold"
      fill="#0d0d12"
      fontFamily="JetBrains Mono, monospace"
      transform="rotate(225 16 12)"
    >
      λ
    </text>
    <text
      x="16"
      y="18"
      textAnchor="middle"
      fontSize="16.5"
      fontWeight="bold"
      fill="#0d0d12"
      fontFamily="JetBrains Mono, monospace"
      transform="rotate(180 20 20) rotate(225 16 12)"
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
