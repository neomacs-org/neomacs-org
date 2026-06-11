import { ArrowLeft, ArrowRight, RotateCw, Lock } from 'lucide-react';

export const WebkitBuffer = ({ url }: { url: string }) => (
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
    <div className="webkit-page">
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
      </div>
    </div>
  </div>
);
