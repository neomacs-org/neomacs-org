import { ArrowLeft, ArrowRight, RotateCw, Lock } from 'lucide-react';

const HomePage = () => (
  <>
    <div className="mini-nav">
      <span className="mini-logo">NEO Emacs</span>
      <span className="mini-links">
        <i></i>
        <i></i>
        <i></i>
      </span>
    </div>
    <div className="mini-hero">
      <span className="mini-badge">⚡ GPU-Accelerated</span>
      <div className="mini-title">
        The <em>Emacs</em> from the Future
      </div>
      <div className="mini-buttons">
        <span className="mini-btn-primary"></span>
        <span className="mini-btn-ghost"></span>
      </div>
      <div className="mini-cards">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </>
);

const DocsPage = () => (
  <div className="mini-docs">
    <div className="mini-docs-side">
      <i className="on"></i>
      <i></i>
      <i></i>
      <i></i>
      <i></i>
    </div>
    <div className="mini-docs-main">
      <div className="mini-docs-title">Getting Started</div>
      <div className="mini-docs-bar w95"></div>
      <div className="mini-docs-bar w80"></div>
      <div className="mini-docs-bar w90"></div>
      <div className="mini-docs-code">$ neomacs --gpu vulkan</div>
      <div className="mini-docs-bar w70"></div>
      <div className="mini-docs-bar w85"></div>
    </div>
  </div>
);

export const WebkitBuffer = ({ url, page }: { url: string; page: 'home' | 'docs' }) => (
  <div className="webkit-buffer">
    <div className="webkit-toolbar">
      <ArrowLeft size={12} />
      <ArrowRight size={12} className="webkit-dim" />
      <RotateCw size={11} />
      <div className="webkit-url">
        <Lock size={9} />
        {url}
      </div>
      <span className="webkit-engine">WPE WebKit</span>
    </div>
    <div className="webkit-page">{page === 'home' ? <HomePage /> : <DocsPage />}</div>
  </div>
);
