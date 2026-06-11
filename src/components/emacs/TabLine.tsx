import type { TabLineTab } from './types';

export const TabLine = ({ tabs }: { tabs: TabLineTab[] }) => (
  <div className="emacs-tab-line" title="tab-line (window-local buffer tabs)">
    {tabs.map((tab) => (
      <div key={tab.label} className={`tab-line-tab${tab.active ? ' active' : ''}`}>
        {tab.label}
        {tab.closable && <span className="tab-close">×</span>}
      </div>
    ))}
  </div>
);
