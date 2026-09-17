import { motion } from 'framer-motion';
import {
  Zap,
  Cpu,
  Layers,
  Github,
  Monitor,
  MousePointer2,
  ShieldCheck,
  ChevronRight,
  Star,
  Heart,
  Youtube,
  UserRound,
  UsersRound,
  UserPlus,
  Download,
  Scale
} from 'lucide-react';
import { EmacsFrame } from './components/emacs/EmacsFrame';
import { WasmIcon } from './components/WasmIcon';
import sponsorsData from './data/sponsors.json';
import './App.css';

const FeatureCard = ({ icon: Icon, title, description, delay }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    viewport={{ once: true }}
    className="feature-card"
  >
    <div className="feature-icon">
      <Icon size={24} />
    </div>
    <h3>{title}</h3>
    <p>{description}</p>
  </motion.div>
);

const WipBanner = () => (
  <div className="wip-banner">
    <span className="wip-banner-status">
      <span className="wip-banner-dot" aria-hidden="true" />
      <span>
      NEO Emacs and this site are <strong>works in progress</strong>
      <span className="wip-banner-extra">
        {' '}— a WebAssembly build is in development so you can try NEO Emacs in your browser
      </span>.
      </span>
    </span>
    <a
      className="wasm-preview-link"
      href="https://eval-exec.github.io/neomacs/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span>Try NEO Emacs WASM build (experimental and incomplete)</span>
      <ChevronRight size={16} aria-hidden="true" />
    </a>
  </div>
);

const Navbar = () => (
  <nav className="navbar">
    <div className="container nav-content">
      <div className="logo">
        <img className="header-window-icon" src="/favicon.svg" alt="" aria-hidden="true" />
        <span className="logo-text">NEO Emacs <span className="logo-wip">Working in progress</span></span>
      </div>
      <div className="nav-links">
        <a href="#features">Features</a>
        <a href="https://github.com/eval-exec/neomacs" target="_blank" rel="noopener noreferrer" className="github-btn">
          <div className="btn-item">
            <Star size={14} fill="currentColor" />
            <span>Star</span>
          </div>
          <span className="separator">/</span>
          <div className="btn-item">
            <Heart size={14} fill="currentColor" className="sponsor-heart" />
            <span>Sponsor on GitHub</span>
          </div>
        </a>
      </div>
    </div>
  </nav>
);

const Hero = () => (
  <section className="hero">
    <div className="container hero-content">
      <aside className="wip-notice" aria-labelledby="wip-heading">
        <div className="wip-notice-copy">
          <h2 id="wip-heading">Working in progress</h2>
          <p>NEO Emacs is still in active development. Expect bugs, incomplete features, and breaking changes.</p>
        </div>
      </aside>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="hero-badge"
      >
        <Zap size={14} className="badge-icon" />
        GPU-Accelerated Emacs Powered by Rust
      </motion.div>
      
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="hero-title"
      >
        The <span className="gradient-text">Emacs</span> from <br />
        the <span className="glow-text">Future</span>
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="hero-subtitle"
      >
        Rewritten in Rust. Rendered by GPU. <br />
        Aiming for modern design, multi-threaded Elisp, 10x performance and 100% Emacs compatibility.
      </motion.p>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="hero-actions"
      >
        <a href="https://github.com/eval-exec/neomacs" className="primary-btn">
          <Github size={18} aria-hidden="true" />
          Get Started
        </a>
        <a
          href="https://www.youtube.com/@eval-exec"
          target="_blank"
          rel="noopener noreferrer"
          className="youtube-btn"
        >
          <Youtube size={18} aria-hidden="true" />
          Watch Demo
        </a>
        <a
          href="https://eval-exec.github.io/neomacs/"
          target="_blank"
          rel="noopener noreferrer"
          className="wasm-btn"
        >
          <WasmIcon />
          Try WASM Build
        </a>
      </motion.div>
    </div>
    
    <div className="hero-visual">
       {/* Abstract background effect */}
       <div className="glow-orb top-right"></div>
       <div className="glow-orb bottom-left"></div>
    </div>
  </section>
);

const Features = () => (
  <section id="features" className="features-section">
    <div className="container">
      <div className="section-header">
        <h2>Uncompromising Engineering</h2>
        <p>Built for the next generation of developers.</p>
      </div>
      
      <div className="features-grid">
        <FeatureCard 
          icon={Cpu}
          title="Rust Core"
          description="Systematic rewrite of the C core in Rust for safety, speed, and true multi-threading."
          delay={0.1}
        />
        <FeatureCard 
          icon={Zap}
          title="GPU Engine"
          description="Powered by wgpu (Vulkan/Metal/DX12). Fluid 120fps rendering and visual effects."
          delay={0.2}
        />
        <FeatureCard 
          icon={Layers}
          title="Full Compatibility"
          description="100% compatible with your existing Elisp configuration and packages."
          delay={0.3}
        />
        <FeatureCard 
          icon={Monitor}
          title="Rich Media"
          description="Direct 4K video playback, GPU-decoded images, and embedded WebKit buffers."
          delay={0.4}
        />
        <FeatureCard 
          icon={MousePointer2}
          title="Liquid Animations"
          description="21 scroll effects and cursor modes that make the interface feel alive."
          delay={0.5}
        />
        <FeatureCard 
          icon={ShieldCheck}
          title="Modern Safety"
          description="Memory safety by design, eliminating decades of legacy C-subsystem bugs."
          delay={0.6}
        />
      </div>
    </div>
  </section>
);

const EmacsPreview = () => (
  <section className="preview-section">
    <div className="preview-container">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <EmacsFrame />
      </motion.div>
    </div>
  </section>
);

// No tier or amount: sponsor amounts are deliberately not collected, so there
// is nothing here that could disclose what anyone gives.
const sponsorInitials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');

/* Sponsors are individuals, not companies, so there are no logos to show.
   Every well-known project that faces this — Svelte, FastAPI, Astro — does the
   same thing: a warm sentence, a plain run of linked names, and a quiet link
   out. No cards, no tiers, no decoration. It also holds up as the list grows,
   where a sparse grid of tiles only ever advertises how few there are. */
const Sponsors = () => {
  const { sample, sponsors, anonymousCount } = sponsorsData;

  return (
    <section id="sponsors" className="sponsors-section">
      <div className="container">
        <div className="section-header">
          <span className="section-icon" aria-hidden="true">
            <Heart size={26} fill="currentColor" />
          </span>
          <h2>
            Support the <span className="heading-accent">Future</span>
          </h2>
          <p>
            <span className="licence-brand">NEO Emacs</span> is{' '}
            <a
              className="licence-badge"
              href="https://github.com/eval-exec/neomacs?tab=GPL-3.0-1-ov-file"
              target="_blank"
              rel="noopener noreferrer"
              title="Read the licence"
            >
              GPL-3.0
            </a>{' '}
            licensed and will always be <strong className="licence-emph">free</strong> and{' '}
            <strong className="licence-emph">open source</strong>.
          </p>
        </div>

        <a
          className="primary-btn sponsors-cta"
          href="https://github.com/sponsors/eval-exec"
          target="_blank"
          rel="noopener noreferrer"
        >
          Become a Sponsor
          <ChevronRight size={16} aria-hidden="true" />
        </a>

        <div className="sponsor-cards">
          {sponsors.map((sponsor) => {
            const duplicatesLogin =
              sponsor.name.trim().toLowerCase() === sponsor.login.toLowerCase();

            return (
              <a
                className="sponsor-card"
                key={sponsor.login}
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                title={`@${sponsor.login}`}
              >
                {sponsor.avatarUrl ? (
                  <img src={sponsor.avatarUrl} alt="" loading="lazy" />
                ) : (
                  <span className="sponsor-card-initials" aria-hidden="true">
                    {sponsorInitials(sponsor.name)}
                  </span>
                )}
                <span className="sponsor-card-name">{sponsor.name}</span>
                {!duplicatesLogin && (
                  <span className="sponsor-card-handle">@{sponsor.login}</span>
                )}
              </a>
            );
          })}

          {/* No profile to visit, so this one is not a link. */}
          {anonymousCount > 0 && (
            <span
              className="sponsor-card sponsor-card-anon"
              role="img"
              aria-label={`${anonymousCount} sponsors who chose to stay anonymous`}
              title={`${anonymousCount} sponsor${anonymousCount === 1 ? '' : 's'} who chose to stay anonymous`}
            >
              <span className="sponsor-card-initials" aria-hidden="true">
                {/* Plural glyph only when it is actually plural. */}
                {anonymousCount === 1 ? (
                  <UserRound size={30} />
                ) : (
                  <UsersRound size={32} />
                )}
              </span>
              <span className="sponsor-card-name">
                {anonymousCount} Anonymous{' '}
                {anonymousCount === 1 ? 'Sponsor' : 'Sponsors'}
              </span>
            </span>
          )}

          <a
            className="sponsor-card sponsor-card-reserved"
            href="https://github.com/sponsors/eval-exec"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="sponsor-card-initials" aria-hidden="true">
              <UserPlus size={30} />
            </span>
            <span className="sponsor-card-name">Your name here</span>
          </a>
        </div>

        {sample && (
          <p className="sponsors-sample-note">
            Placeholder entries — set <code>GH_TOKEN</code> and run{' '}
            <code>npm run fetch-sponsors</code> to list real sponsors.
          </p>
        )}
      </div>
    </section>
  );
};

const App = () => {
  return (
    <div className="app">
      <WipBanner />
      <Navbar />
      <Hero />
      <EmacsPreview />
      <Features />
      <Sponsors />
      
      <footer className="footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <img className="footer-mark" src="/favicon.svg" alt="" aria-hidden="true" />
            <div>
              <div className="footer-logo">NEO Emacs</div>
              <p className="footer-tagline">
                GPU-powered Emacs, rewritten in Rust. Work in progress.
              </p>
            </div>
          </div>

          {/* Only destinations that exist. A footer of 404s reads as an
              abandoned project, which is the opposite of the point. */}
          <nav className="footer-col" aria-labelledby="footer-get">
            <h3 id="footer-get">Get started</h3>
            <a href="https://github.com/eval-exec/neomacs/releases" target="_blank" rel="noopener noreferrer">
              <Download size={15} aria-hidden="true" />
              Download
            </a>
            <a href="https://eval-exec.github.io/neomacs/" target="_blank" rel="noopener noreferrer">
              <span className="icon-wasm"><WasmIcon size={15} /></span>
              Try the WASM build
            </a>
            <a href="https://www.youtube.com/@eval-exec" target="_blank" rel="noopener noreferrer">
              <Youtube size={15} className="icon-youtube" aria-hidden="true" />
              Watch demo
            </a>
          </nav>

          <nav className="footer-col" aria-labelledby="footer-project">
            <h3 id="footer-project">Project</h3>
            <a href="https://github.com/eval-exec/neomacs" target="_blank" rel="noopener noreferrer">
              <Github size={15} className="icon-github" aria-hidden="true" />
              Source code
            </a>
            <a href="https://github.com/eval-exec/neomacs?tab=GPL-3.0-1-ov-file" target="_blank" rel="noopener noreferrer">
              <Scale size={15} aria-hidden="true" />
              Licence (GPL-3.0)
            </a>
            <a href="https://github.com/sponsors/eval-exec" target="_blank" rel="noopener noreferrer">
              <Heart size={15} className="icon-sponsor" aria-hidden="true" />
              Sponsor on GitHub
            </a>
          </nav>
        </div>

        <div className="container footer-bottom">
          <p>© 2026 NEO Emacs · GPL-3.0 licensed</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
