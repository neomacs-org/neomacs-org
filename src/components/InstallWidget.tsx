import { useState, useEffect } from 'react';
import { Copy, Check, Terminal, ExternalLink } from 'lucide-react';
import { WasmIcon } from './WasmIcon';

type InstallTab = 'curl' | 'nix' | 'wasm';

export const InstallWidget = () => {
  const [activeTab, setActiveTab] = useState<InstallTab>('curl');
  const [copied, setCopied] = useState(false);
  const [platform, setPlatform] = useState('x86_64-linux (vulkan/wayland)');

  useEffect(() => {
    if (typeof window !== 'undefined' && navigator.userAgent) {
      const ua = navigator.userAgent;
      if (ua.includes('Mac')) {
        setPlatform('aarch64-apple-darwin (metal)');
      } else if (ua.includes('Win')) {
        setPlatform('x86_64-pc-windows (d3d12/vulkan)');
      } else if (ua.includes('Linux')) {
        setPlatform('x86_64-unknown-linux (vulkan)');
      }
    }
  }, []);

  const commands: Record<InstallTab, string> = {
    curl: 'curl -fsSL https://neomacs.org/install.sh | bash',
    nix: 'nix run github:eval-exec/neomacs',
    wasm: 'https://eval-exec.github.io/neomacs/',
  };

  const handleCopy = async () => {
    const textToCopy = commands[activeTab];
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = textToCopy;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="install-widget-dense">
      <div className="install-dense-bar">
        <div className="install-tabs-dense" role="tablist">
          <button
            role="tab"
            aria-selected={activeTab === 'curl'}
            className={`tab-dense ${activeTab === 'curl' ? 'active' : ''}`}
            onClick={() => setActiveTab('curl')}
          >
            sh/curl
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'nix'}
            className={`tab-dense ${activeTab === 'nix' ? 'active' : ''}`}
            onClick={() => setActiveTab('nix')}
          >
            nix flake
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'wasm'}
            className={`tab-dense wasm-dense ${activeTab === 'wasm' ? 'active' : ''}`}
            onClick={() => setActiveTab('wasm')}
          >
            wasm
          </button>
        </div>

        <div className="platform-dense-tag">
          <span className="dot-active" aria-hidden="true" />
          <span>{platform}</span>
        </div>
      </div>

      <div className="install-dense-body">
        <div className="prompt-prefix">$</div>
        <code className="cmd-text">{commands[activeTab]}</code>

        {activeTab === 'wasm' ? (
          <a
            href="https://eval-exec.github.io/neomacs/"
            target="_blank"
            rel="noopener noreferrer"
            className="dense-action-btn wasm-action"
            title="Launch WASM target"
          >
            <span>run</span>
            <ExternalLink size={12} />
          </a>
        ) : (
          <button
            className={`dense-action-btn copy-action ${copied ? 'copied' : ''}`}
            onClick={handleCopy}
            title="Copy command to clipboard"
            aria-label="Copy to clipboard"
          >
            {copied ? (
              <>
                <Check size={12} />
                <span>copied</span>
              </>
            ) : (
              <>
                <Copy size={12} />
                <span>copy</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};
