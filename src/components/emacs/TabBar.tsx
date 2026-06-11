const TABS = [
  { label: 'main', active: true },
  { label: 'mail', active: false },
  { label: 'irc', active: false },
];

export const TabBar = () => (
  <div className="emacs-tab-bar" title="tab-bar (frame-level workspaces)">
    {TABS.map((tab, i) => (
      <div key={tab.label} className={`tab-bar-tab${tab.active ? ' active' : ''}`}>
        <span className="tab-index">{i + 1}</span>
        {tab.label}
      </div>
    ))}
    <div className="tab-bar-tab tab-bar-new">+</div>
    <div className="tab-bar-hint">tab-bar-mode</div>
  </div>
);
