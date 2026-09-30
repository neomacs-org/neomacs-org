import { Cpu, Zap, Layers, Monitor, Sparkles, ArrowUpRight, Check, Activity, HardDrive } from 'lucide-react';
import { WasmIcon } from './WasmIcon';

export const ArchitectureBento = () => {
  return (
    <section id="architecture" className="bento-section-dense">
      <div className="container">
        <div className="section-header-dense">
          <div className="section-label">
            <span className="mono-idx">[02]</span>
            <span className="mono-title">VISUAL_ARCHITECTURE_BENTO</span>
          </div>
          <h2>Engineered for Raw Speed & Zero Latency</h2>
          <p className="section-sub-dense">
            Replacing 40 years of monolithic single-threaded C code with modular Rust crates,
            a hardware GPU compositor, and true preemptive concurrency.
          </p>
        </div>

        <div className="bento-dense-grid">
          {/* Card 1: Visual Performance Bar Chart */}
          <div className="bento-dense-card card-span-6 bento-perf-card">
            <div className="card-dense-header">
              <div className="card-crate-badge">
                <span className="crate-type">BENCHMARK</span>
                <span className="crate-name">startup_latency_ms</span>
              </div>
              <span className="card-status-flag flag-cyan">2000X FASTER</span>
            </div>

            <h3>Blazing Fast Cold Startup</h3>
            <p className="card-desc">
              Pre-compiled bytecode snapshots allow instant microsecond cold launches on modern operating systems.
            </p>

            {/* Visual Bar Chart */}
            <div className="perf-chart-visual">
              <div className="chart-bar-group">
                <div className="bar-label-row">
                  <span className="bar-name">NEO Emacs (Rust + Snapshot)</span>
                  <span className="bar-val-accent">0.9 ms</span>
                </div>
                <div className="bar-track">
                  <div className="bar-fill-cyan" style={{ width: '98%' }}></div>
                </div>
              </div>

              <div className="chart-bar-group">
                <div className="bar-label-row">
                  <span className="bar-name">GNU Emacs 29.3 (C Core)</span>
                  <span className="bar-val-dim">1,820 ms</span>
                </div>
                <div className="bar-track">
                  <div className="bar-fill-dim" style={{ width: '8%' }}></div>
                </div>
              </div>
            </div>

            <div className="perf-pills-row">
              <div className="perf-pill">
                <span className="pill-metric">10x</span>
                <span className="pill-lbl">JIT Execution</span>
              </div>
              <div className="perf-pill">
                <span className="pill-metric">2.1ms</span>
                <span className="pill-lbl">120 FPS Budget</span>
              </div>
              <div className="perf-pill">
                <span className="pill-metric">0.0%</span>
                <span className="pill-lbl">UI Blocking</span>
              </div>
            </div>
          </div>

          {/* Card 2: Crates Pipeline & Packaging */}
          <div className="bento-dense-card card-span-6">
            <div className="card-dense-header">
              <div className="card-crate-badge">
                <span className="crate-type">ARCHITECTURE</span>
                <span className="crate-name">rust_crate_pipeline</span>
              </div>
              <span className="card-status-flag">CARGO</span>
            </div>

            <h3>Modular Rust Crates</h3>
            <p className="card-desc">
              Structured as clean, decoupled Rust crates built on top of the Tokio thread pool and wgpu.
            </p>

            <div className="crate-flow-diagram">
              <div className="crate-node node-active">
                <Cpu size={14} className="node-icon" />
                <div className="node-info">
                  <span className="node-title">neovm-engine</span>
                  <span className="node-desc">preemptive VM runtime</span>
                </div>
              </div>
              <span className="crate-arrow">↓</span>
              <div className="crate-node node-renderer">
                <Zap size={14} className="node-icon" />
                <div className="node-info">
                  <span className="node-title">neomacs-renderer-wgpu</span>
                  <span className="node-desc">120fps hardware compositor</span>
                </div>
              </div>
              <span className="crate-arrow">↓</span>
              <div className="crate-node">
                <HardDrive size={14} className="node-icon" />
                <div className="node-info">
                  <span className="node-title">neovm-gc</span>
                  <span className="node-desc">concurrent mark & sweep</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: 100% Elisp Ecosystem */}
          <div className="bento-dense-card card-span-4">
            <div className="card-dense-header">
              <div className="card-crate-badge">
                <span className="crate-type">COMPAT</span>
                <span className="crate-name">elisp_abi_v30</span>
              </div>
              <span className="card-status-flag flag-cyan">100% ABI</span>
            </div>
            <h3>Full GNU Package Support</h3>
            <p className="card-desc">
              Runs your existing packages and configs without modifications or emulation layers.
            </p>
            <div className="package-chips-grid">
              <div className="pkg-chip"><Check size={11} className="chk" /> Magit</div>
              <div className="pkg-chip"><Check size={11} className="chk" /> Org Mode</div>
              <div className="pkg-chip"><Check size={11} className="chk" /> LSP Mode</div>
              <div className="pkg-chip"><Check size={11} className="chk" /> Tree-Sitter</div>
              <div className="pkg-chip"><Check size={11} className="chk" /> Evil Mode</div>
              <div className="pkg-chip"><Check size={11} className="chk" /> mu4e & ERC</div>
            </div>
          </div>

          {/* Card 4: Shaders & Liquid Motion */}
          <div className="bento-dense-card card-span-4">
            <div className="card-dense-header">
              <div className="card-crate-badge">
                <span className="crate-type">SHADERS</span>
                <span className="crate-name">wgpu_fx_pipeline</span>
              </div>
              <span className="card-status-flag">21 MODES</span>
            </div>
            <h3>Liquid Animations & Shaders</h3>
            <p className="card-desc">
              Hardware-accelerated kinetic scroll effects and reactive particle cursor modes rendered by GPU.
            </p>
            <div className="shader-preview-boxes">
              <div className="shader-box box-pixie">
                <span className="shader-dot dot-pixie"></span>
                <span>Pixiedust Aura</span>
              </div>
              <div className="shader-box box-fluid">
                <span className="shader-dot dot-cyan"></span>
                <span>Fluid Glow Trail</span>
              </div>
              <div className="shader-box box-scan">
                <span className="shader-dot dot-amber"></span>
                <span>Wobbly Kinetic Scroll</span>
              </div>
            </div>
          </div>

          {/* Card 5: WebAssembly Sandbox */}
          <div className="bento-dense-card card-span-4 card-wasm-dense">
            <div className="card-dense-header">
              <div className="card-crate-badge">
                <span className="crate-type">BROWSER</span>
                <span className="crate-name">wasm32_webgpu</span>
              </div>
              <a
                href="https://eval-exec.github.io/neomacs/"
                target="_blank"
                rel="noopener noreferrer"
                className="wasm-link-dense"
              >
                <span>launch</span>
                <ArrowUpRight size={12} />
              </a>
            </div>
            <h3>In-Browser Sandbox</h3>
            <p className="card-desc">
              Try NEO Emacs directly in your web browser with native keyboard handling and WebGPU.
            </p>
            <a
              href="https://eval-exec.github.io/neomacs/"
              target="_blank"
              rel="noopener noreferrer"
              className="wasm-dense-cta"
            >
              <WasmIcon size={14} />
              <span>Launch Live WASM Sandbox</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
