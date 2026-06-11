export interface TabLineTab {
  id: string;
  label: string;
  closable?: boolean;
}

export const TabLine = ({
  tabs,
  active,
  onSelect,
}: {
  tabs: TabLineTab[];
  active: string;
  onSelect: (id: string) => void;
}) => (
  <div className="emacs-tab-line" title="tab-line (window-local buffer tabs)">
    {tabs.map((tab) => (
      <button
        key={tab.id}
        type="button"
        className={`tab-line-tab${tab.id === active ? ' active' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(tab.id);
        }}
      >
        {tab.label}
        {tab.closable && <span className="tab-close">×</span>}
      </button>
    ))}
  </div>
);
