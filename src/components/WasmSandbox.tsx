import { useState, useRef, useEffect } from 'react';
import { Play, RotateCcw, Maximize2, Minimize2, ExternalLink, Terminal, Cpu, ShieldCheck } from 'lucide-react';
import { WasmIcon } from './WasmIcon';

interface WasmSandboxProps {
  bootTriggered?: boolean;
}

export const WasmSandbox = ({ bootTriggered = false }: WasmSandboxProps) => {
  const [isBooted, setIsBooted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bootTriggered) {
      setIsBooted(true);
    }
  }, [bootTriggered]);

  const handleBoot = () => {
    setIsBooted(true);
  };

  const handleRestart = () => {
    setReloadKey((prev) => prev + 1);
  };

  const toggleFullscreen = () => {
    setIsFullscreen((prev) => !prev);
  };

  return (
    <div
      ref={containerRef}
      className={`wasm-sandbox-card ${isFullscreen ? 'wasm-fullscreen' : ''}`}
      id="wasm-sandbox"
    >
      {/* Workstation Frame Header */}
      <div className="sandbox-header">
        <div className="sandbox-controls">
          <span className="dot dot-close" onClick={() => setIsFullscreen(false)} title="Close" />
          <span className="dot dot-min" onClick={() => setIsFullscreen(false)} title="Minimize" />
          <span className="dot dot-max" onClick={toggleFullscreen} title="Maximize" />
        </div>

        <div className="sandbox-meta">
          <span className="meta-tag">TARGET: wasm32-unknown-unknown</span>
          <span className="meta-sep">/</span>
          <span className="meta-tag tag-cyan">COMPOSITOR: WebGPU</span>
        </div>

        <div className="sandbox-actions">
          {isBooted && (
            <>
              <button
                type="button"
                className="sandbox-btn"
                onClick={handleRestart}
                title="Restart WebAssembly instance"
              >
                <RotateCcw size={12} />
                <span>Restart</span>
              </button>

              <button
                type="button"
                className="sandbox-btn"
                onClick={toggleFullscreen}
                title={isFullscreen ? 'Exit Fullscreen' : 'Expand Fullscreen'}
              >
                {isFullscreen ? <Minimize2 size={12} /> : <Maximize2 size={12} />}
                <span>{isFullscreen ? 'Exit' : 'Expand'}</span>
              </button>
            </>
          )}

          <a
            href="https://eval-exec.github.io/neomacs/"
            target="_blank"
            rel="noopener noreferrer"
            className="sandbox-btn btn-ext"
            title="Open in standalone tab"
          >
            <ExternalLink size={12} />
            <span>Standalone</span>
          </a>
        </div>
      </div>

      {/* Main Sandbox Body */}
      <div className="sandbox-body">
        {isBooted ? (
          <div className="wasm-frame-container">
            <div className="wasm-status-banner">
              <span className="status-live-dot" />
              <span>Running real NEO Emacs instance compiled from Rust. Click inside to capture keyboard input.</span>
            </div>
            <iframe
              key={reloadKey}
              src="https://eval-exec.github.io/neomacs/"
              title="NEO Emacs WebAssembly Target"
              className="wasm-iframe"
              allow="cross-origin-isolated"
            />
          </div>
        ) : (
          <div className="wasm-standby-view">
            <div className="standby-content">
              <div className="standby-brand-row">
                <img src="/favicon.svg" alt="NEO Emacs" className="standby-logo" />
                <div className="standby-title-wrap">
                  <h3>Real NEO Emacs In-Browser Build</h3>
                  <span className="standby-badge">RUST CORE · WEBGPU ENGINE</span>
                </div>
              </div>

              <p className="standby-desc">
                Experience genuine NEO Emacs compiled natively from the Rust source code.
                Runs directly on modern WebGPU drivers in Chrome, Edge, Firefox Nightly, or Safari 18+.
              </p>

              <div className="standby-specs-grid">
                <div className="spec-box">
                  <span className="spec-k">LISP ENGINE</span>
                  <span className="spec-v">GNU Elisp REPL</span>
                </div>
                <div className="spec-box">
                  <span className="spec-k">COMPOSITOR</span>
                  <span className="spec-v">wgpu / WebGPU</span>
                </div>
                <div className="spec-box">
                  <span className="spec-k">INITIAL OVERHEAD</span>
                  <span className="spec-v">0 MB (on-demand)</span>
                </div>
              </div>

              <div className="standby-cta-row">
                <button
                  type="button"
                  className="boot-wasm-primary-btn"
                  onClick={handleBoot}
                  title="Initialize WebAssembly Engine in this page"
                >
                  <Play size={16} fill="currentColor" />
                  <span>BOOT WEBASSEMBLY ENGINE</span>
                </button>

                <a
                  href="https://eval-exec.github.io/neomacs/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="boot-wasm-secondary-btn"
                >
                  <ExternalLink size={14} />
                  <span>Open in Dedicated Tab</span>
                </a>
              </div>

              <div className="standby-footnote">
                <ShieldCheck size={12} className="shield-ico" />
                <span>Zero bandwidth transfer until booted. Runs entirely client-side via WebAssembly sandbox.</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
