import { useState, useEffect } from 'react';
import { Star, Menu, X, ChevronRight } from 'lucide-react';
import { WasmIcon } from './WasmIcon';

interface NavbarProps {
  onBootWasm?: () => void;
}

export const Navbar = ({ onBootWasm }: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`main-navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-content-fullwidth">
        {/* Brand */}
        <div className="nav-left">
          <a href="#" className="logo">
            <span className="logo-bracket">[</span>
            <img
              className="header-window-icon"
              src="/favicon.svg"
              alt="NEO Emacs logo"
              aria-hidden="true"
            />
            <span className="logo-bracket">]</span>
            <span className="logo-text">neomacs</span>
            <span className="logo-version">v1.0-alpha</span>
          </a>

          {/* High-density telemetry pill */}
          <div className="nav-telemetry-badge" title="Active development: WebAssembly build online">
            <span className="status-indicator-dot" aria-hidden="true" />
            <span className="telem-label">wgpu: 120hz</span>
            <span className="telem-sep">|</span>
            <a
              href="#wasm-sandbox"
              onClick={() => onBootWasm?.()}
              className="telem-wasm-link"
            >
              <span>wasm target online</span>
              <ChevronRight size={11} />
            </a>
          </div>
        </div>

        {/* Dense Nav Links */}
        <nav className="nav-center" aria-label="Main Navigation">
          <a href="#wasm-sandbox" className="nav-link" onClick={() => onBootWasm?.()}>
            <span className="nav-idx">01/</span>WASM Runner
          </a>
          <a href="#architecture" className="nav-link">
            <span className="nav-idx">02/</span>Architecture
          </a>
          <a href="#benchmarks" className="nav-link">
            <span className="nav-idx">03/</span>Benchmarks
          </a>
          <a href="#features" className="nav-link">
            <span className="nav-idx">04/</span>Features
          </a>
          <a href="#sponsors" className="nav-link">
            <span className="nav-idx">05/</span>Sponsors
          </a>
        </nav>

        {/* Right Actions */}
        <div className="nav-right">
          {/* WASM CTA */}
          <a
            href="#wasm-sandbox"
            onClick={() => onBootWasm?.()}
            className="nav-wasm-btn"
            title="Launch WebAssembly build in browser"
          >
            <WasmIcon size={13} />
            <span>Try WASM</span>
          </a>

          {/* GitHub Star */}
          <a
            href="https://github.com/eval-exec/neomacs"
            target="_blank"
            rel="noopener noreferrer"
            className="github-btn"
            aria-label="Star eval-exec/neomacs on GitHub"
          >
            <Star size={13} fill="currentColor" />
            <span>GitHub</span>
          </a>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <div className="mobile-nav-links">
            <a
              href="#wasm-sandbox"
              className="mobile-link"
              onClick={() => {
                setMobileMenuOpen(false);
                onBootWasm?.();
              }}
            >
              [01] WASM Sandbox Runner
            </a>
            <a
              href="#architecture"
              className="mobile-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              [02] Rust & GPU Architecture
            </a>
            <a
              href="#benchmarks"
              className="mobile-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              [03] Telemetry & Benchmarks
            </a>
            <a
              href="#features"
              className="mobile-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              [04] Feature Systems
            </a>
            <a
              href="#sponsors"
              className="mobile-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              [05] Backers & Sponsors
            </a>
          </div>

          <div className="mobile-actions">
            <a
              href="#wasm-sandbox"
              onClick={() => {
                setMobileMenuOpen(false);
                onBootWasm?.();
              }}
              className="mobile-action-btn wasm-btn"
            >
              <WasmIcon size={14} />
              <span>Launch In-Browser WASM</span>
            </a>
            <a
              href="https://github.com/eval-exec/neomacs"
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-action-btn gh-btn"
            >
              <Star size={14} fill="currentColor" />
              <span>GitHub Repository</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
