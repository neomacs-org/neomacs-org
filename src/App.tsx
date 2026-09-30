import { useState } from 'react';
import {
  Zap,
  Cpu,
  Layers,
  Github,
  Monitor,
  MousePointer2,
  ShieldCheck,
  ChevronRight,
  Youtube,
  AlertTriangle,
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { InstallWidget } from './components/InstallWidget';
import { ArchitectureBento } from './components/ArchitectureBento';
import { BenchmarkSection } from './components/BenchmarkSection';
import { WasmSandbox } from './components/WasmSandbox';
import { SponsorsSection } from './components/SponsorsSection';
import { Footer } from './components/Footer';
import { WasmIcon } from './components/WasmIcon';
import './App.css';

const SubsystemCard = ({ icon: Icon, code, title, description }: any) => (
  <div className="subsystem-card-dense">
    <div className="subsystem-head">
      <span className="subsystem-code">{code}</span>
      <Icon size={15} className="subsystem-icon" />
    </div>
    <h4>{title}</h4>
    <p>{description}</p>
  </div>
);

const WipBanner = () => (
  <aside className="wip-banner-prominent" aria-label="Work in Progress Disclosure">
    <div className="container">
      <div className="wip-banner-box">
        <div className="wip-banner-top">
          <span className="wip-hazard-beacon" aria-hidden="true" />
          <span className="wip-tag">ALPHA ADVISORY // EARLY SYSTEMS EXPERIMENT</span>
        </div>
        <h2 className="wip-headline-huge">
          NEO EMACS IS A <mark className="wip-highlight-badge">WORK IN PROGRESS</mark>
        </h2>
        <p className="wip-sub-prominent">
          Expect bugs, incomplete features, and breaking changes.
          We are systematically rewriting 40 years of legacy GNU Emacs C subsystems in Rust
          and engineering a hardware GPU compositor from scratch.
        </p>
      </div>
    </div>
  </aside>
);

const HeroCockpit = ({
  wasmBooted,
  onBootWasm,
}: {
  wasmBooted: boolean;
  onBootWasm: () => void;
}) => (
  <section className="hero-cockpit" id="overview">
    <div className="cockpit-grid-bg" aria-hidden="true" />

    <div className="container cockpit-container">
      {/* Left Column: Mission Control & Install */}
      <div className="cockpit-left">
        <div className="cockpit-sys-badge">
          <span className="status-ping" aria-hidden="true" />
          <span className="sys-key">SYS_TARGET:</span>
          <span className="sys-val">WGPU_VULKAN</span>
          <span className="sys-sep">/</span>
          <span className="sys-key">ENGINE:</span>
          <span className="sys-val">NEOVM_RUST</span>
          <span className="sys-sep">/</span>
          <span className="sys-key">RATE:</span>
          <span className="sys-val">120_FPS</span>
        </div>

        <h1 className="cockpit-title">
          THE <span className="title-accent">REVOLUTIONARY</span> <br />
          GPU EMACS ENGINE.
        </h1>

        <p className="cockpit-sub">
          Performance-first. 100% Hackable. Blazing 120 FPS.
          Systematic Rust core rewrite with a native hardware compositor,
          preemptive multi-threaded Elisp VM, and zero configuration breakages.
        </p>

        {/* Compact Terminal Install Widget */}
        <div className="cockpit-install">
          <InstallWidget />
        </div>

        {/* Action CTAs */}
        <div className="cockpit-actions">
          <button
            type="button"
            className="btn-dense btn-wasm"
            onClick={onBootWasm}
            title="Launch in-page WebAssembly sandbox"
          >
            <WasmIcon size={14} />
            <span>Launch In-Page WASM</span>
          </button>

          <a
            href="https://github.com/eval-exec/neomacs"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-dense btn-primary"
          >
            <Github size={14} aria-hidden="true" />
            <span>Source Code (GitHub)</span>
          </a>

          <a
            href="https://www.youtube.com/@eval-exec"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-dense btn-ghost"
          >
            <Youtube size={14} className="ico-yt" aria-hidden="true" />
            <span>Watch 4K Demo</span>
          </a>
        </div>

        {/* Micro Telemetry Metrics */}
        <div className="cockpit-pills-row">
          <div className="cp-pill">
            <span className="cp-dot" />
            <span className="cp-text"><strong>10x Faster</strong> JIT Execution</span>
          </div>
          <div className="cp-pill">
            <span className="cp-dot" />
            <span className="cp-text"><strong>0.9ms</strong> Cold Startup</span>
          </div>
          <div className="cp-pill">
            <span className="cp-dot" />
            <span className="cp-text"><strong>100% Memory Safe</strong> Rust</span>
          </div>
        </div>
      </div>

      {/* Right Column: Genuine WebAssembly Sandbox */}
      <div className="cockpit-right">
        <WasmSandbox bootTriggered={wasmBooted} />
      </div>
    </div>
  </section>
);

const Features = () => (
  <section id="features" className="features-section-dense">
    <div className="container">
      <div className="section-header-dense">
        <div className="section-label">
          <span className="mono-idx">[04]</span>
          <span className="mono-title">CORE_SUBSYSTEMS</span>
        </div>
        <h2>Engineering Architecture Specifications</h2>
        <p className="section-sub-dense">
          Six foundational architectural upgrades replacing 40 years of single-threaded technical debt.
        </p>
      </div>

      <div className="subsystems-grid-dense">
        <SubsystemCard
          code="MOD_01 // RUNTIME"
          icon={Cpu}
          title="Rust Neovm VM"
          description="Memory-safe, preemptive multi-threaded Elisp virtual machine with OS thread pools and zero memory leaks."
        />
        <SubsystemCard
          code="MOD_02 // RENDERER"
          icon={Zap}
          title="wgpu Compositor"
          description="Direct hardware rendering on Vulkan, Metal, Direct3D 12, and WebGPU with sub-2.5ms frame times."
        />
        <SubsystemCard
          code="MOD_03 // ECOSYSTEM"
          icon={Layers}
          title="100% Elisp ABI"
          description="Drop-in compatible with existing init.el, Doom, Spacemacs, Magit, Org-mode, and LSP configurations."
        />
        <SubsystemCard
          code="MOD_04 // BUFFERS"
          icon={Monitor}
          title="Rich 4K Media Buffers"
          description="Direct zero-copy 4K video streams, GPU-decoded image rasterization, and inline WPE WebKit buffers."
        />
        <SubsystemCard
          code="MOD_05 // MOTION"
          icon={MousePointer2}
          title="21 Liquid Motion Modes"
          description="Shader-accelerated smooth inertial scrolling, fluid kinetic physics, and particle cursor aura modes."
        />
        <SubsystemCard
          code="MOD_06 // INTEGRITY"
          icon={ShieldCheck}
          title="Memory Safety by Design"
          description="Complete elimination of legacy C buffer overflows, wild pointers, and unexpected core segmentation faults."
        />
      </div>
    </div>
  </section>
);

const App = () => {
  const [wasmBooted, setWasmBooted] = useState(false);

  const triggerBootWasm = () => {
    setWasmBooted(true);
    document.getElementById('wasm-sandbox')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="app-dense">
      <Navbar onBootWasm={triggerBootWasm} />

      <main>
        <WipBanner />
        <HeroCockpit
          wasmBooted={wasmBooted}
          onBootWasm={triggerBootWasm}
        />
        <ArchitectureBento />
        <BenchmarkSection />
        <Features />
        <SponsorsSection />
      </main>

      <Footer />
    </div>
  );
};

export default App;
