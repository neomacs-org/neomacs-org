import { Github, Scale, Heart, Download, Youtube, Terminal } from 'lucide-react';
import { WasmIcon } from './WasmIcon';

export const Footer = () => {
  return (
    <footer className="footer-dense">
      <div className="container footer-grid-dense">
        <div className="footer-brand-dense">
          <div className="brand-title-row">
            <span className="brand-bracket">[</span>
            <img className="brand-icon" src="/favicon.svg" alt="" aria-hidden="true" />
            <span className="brand-bracket">]</span>
            <span className="brand-name">neomacs</span>
            <span className="brand-chip">core: rust</span>
          </div>
          <p className="brand-desc">
            Next-generation Emacs engine. Rewritten in Rust with a 120 FPS hardware compositor
            powered by <code>wgpu</code>. Free software under GNU GPL-3.0.
          </p>
          <div className="brand-lisp-exp">
            <code>(provide 'neomacs-future)</code>
          </div>
        </div>

        <nav className="footer-col-dense" aria-labelledby="footer-runtime">
          <h3 id="footer-runtime">Runtime & Binaries</h3>
          <a
            href="https://github.com/eval-exec/neomacs/releases"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link-dense"
          >
            <Download size={13} aria-hidden="true" />
            <span>Releases & Binaries</span>
          </a>
          <a
            href="https://eval-exec.github.io/neomacs/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link-dense"
          >
            <WasmIcon size={13} />
            <span>WebAssembly Target</span>
          </a>
          <a
            href="https://www.youtube.com/@eval-exec"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link-dense"
          >
            <Youtube size={13} aria-hidden="true" />
            <span>4K Video Demonstration</span>
          </a>
        </nav>

        <nav className="footer-col-dense" aria-labelledby="footer-project">
          <h3 id="footer-project">Open Source</h3>
          <a
            href="https://github.com/eval-exec/neomacs"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link-dense"
          >
            <Github size={13} aria-hidden="true" />
            <span>github.com/eval-exec/neomacs</span>
          </a>
          <a
            href="https://github.com/eval-exec/neomacs/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link-dense"
          >
            <Terminal size={13} aria-hidden="true" />
            <span>Bug Reports & RFCs</span>
          </a>
          <a
            href="https://github.com/eval-exec/neomacs?tab=GPL-3.0-1-ov-file"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link-dense"
          >
            <Scale size={13} aria-hidden="true" />
            <span>GNU GPL-3.0 License</span>
          </a>
          <a
            href="https://github.com/sponsors/eval-exec"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link-dense"
          >
            <Heart size={13} aria-hidden="true" />
            <span>Sponsor Maintainer</span>
          </a>
        </nav>
      </div>

      <div className="container footer-meta-dense">
        <span>© 2026 NEO Emacs Project · GPL-3.0 Free Software</span>
        <div className="meta-telem-line">
          <span>ARCH: x86_64 / aarch64</span>
          <span className="sep">/</span>
          <span>COMPOSITOR: wgpu (vulkan/metal/dx12)</span>
          <span className="sep">/</span>
          <span>VM: neovm (rust)</span>
        </div>
      </div>
    </footer>
  );
};
