import { useState, useRef, useEffect } from 'react';
import { Play, RotateCcw, ExternalLink, Terminal, Cpu, ShieldCheck } from 'lucide-react';
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
          <span className="meta-tag tag-cyan">COMPOSITOR: WebGPU</span>
        </div>

        <div className="sandbox-actions">
          {isBooted && (
            <button
              type="button"
              className="sandbox-btn"
              onClick={handleRestart}
              title="Restart WebAssembly instance"
            >
              <RotateCcw size={12} />
              <span>Restart</span>
            </button>
          )}

          <a
            href="https://eval-exec.github.io/neomacs/"
            target="_blank"
            rel="noopener noreferrer"
            className="sandbox-btn btn-ext"
            title="Open NEO Emacs in a new browser tab"
          >
            <ExternalLink size={12} />
            <span>Open in New Tab</span>
          </a>
        </div>
      </div>

      {/* Main Sandbox Body */}
      <div className="sandbox-body">
        {isBooted ? (
          <div className="wasm-frame-container">
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
              <div className="standby-main">
                <div className="standby-logos">
                  <img src="/favicon.svg" alt="NEO Emacs" className="standby-logo" />
                  <span className="standby-logo-plus" aria-hidden="true">+</span>
                  <img src="/webassembly.svg" alt="WebAssembly" className="standby-logo" />
                </div>

                <h3 className="standby-title">NEO Emacs, in your browser</h3>
                <span className="standby-badge">RUST CORE · WEBGPU ENGINE</span>

                <p className="standby-desc">
                  The real NEO Emacs compiled to WebAssembly — no installation, no
                  download. It runs entirely client-side.
                </p>

                <div className="standby-specs">
                  <span className="standby-spec">
                    <span className="spec-k">LISP</span> GNU Elisp
                  </span>
                  <span className="standby-spec">
                    <span className="spec-k">GPU</span> wgpu / WebGPU
                  </span>
                  <span className="standby-spec">
                    <span className="spec-k">STARTUP</span> 0 MB on-demand
                  </span>
                </div>
              </div>

              <div className="standby-footer">
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
                    title="Boot NEO Emacs in a new browser tab"
                  >
                    <ExternalLink size={14} />
                    <span>New Tab</span>
                  </a>
                </div>

                <div className="standby-footnote">
                  <ShieldCheck size={12} className="shield-ico" />
                  <span>Zero bandwidth transfer until booted. Runs entirely client-side via WebAssembly sandbox.</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
