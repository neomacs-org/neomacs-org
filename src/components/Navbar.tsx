import { useState, useEffect } from 'react';
import { Star, Heart, Menu, X } from 'lucide-react';
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
            <img
              className="header-window-icon"
              src="/favicon.svg"
              alt="NEO Emacs logo"
              aria-hidden="true"
            />
            <span className="logo-text">NEO Emacs</span>
            <span className="logo-wip">(WIP)</span>
          </a>

        </div>

        {/* Dense Nav Links */}
        <nav className="nav-center" aria-label="Main Navigation">
          <a href="#download" className="nav-link">
            <span className="nav-idx">01/</span>Download
          </a>
          <a href="#try" className="nav-link">
            <span className="nav-idx">02/</span>Try NEO Emacs
          </a>
          <a href="#architecture" className="nav-link">
            <span className="nav-idx">03/</span>Architecture
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
          {/* Sponsor */}
          <a
            href="https://github.com/sponsors/eval-exec"
            target="_blank"
            rel="noopener noreferrer"
            className="github-btn header-sponsor-btn"
            aria-label="Sponsor eval-exec on GitHub"
          >
            <Heart size={13} fill="currentColor" aria-hidden="true" />
            <span>Sponsor</span>
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
              href="#download"
              className="mobile-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              [01] Download
            </a>
            <a
              href="#try"
              className="mobile-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              [02] Try NEO Emacs
            </a>
            <a
              href="#architecture"
              className="mobile-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              [03] Rust & GPU Architecture
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
              [05] Sponsors
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
            <a
              href="https://github.com/sponsors/eval-exec"
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-action-btn sponsor-btn"
            >
              <Heart size={14} fill="currentColor" />
              <span>Sponsor NEO Emacs</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
