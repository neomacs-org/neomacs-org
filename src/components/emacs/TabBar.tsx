export interface TabBarTab {
  id: string;
  label: string;
}

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
