import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  Cpu, 
  Layers, 
  Terminal, 
  ExternalLink, 
  Github, 
  Monitor, 
  MousePointer2, 
  Layout, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
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

const Navbar = () => (
  <nav className="navbar">
    <div className="container nav-content">
      <div className="logo">
        <span className="logo-text">NEO Emacs <span className="logo-wip">(WIP)</span></span>
      </div>
      <div className="nav-links">
        <a href="#features">Features</a>
        <a href="#performance">Performance</a>
        <a href="https://github.com/eval-exec/neomacs" target="_blank" rel="noopener noreferrer" className="github-btn">
          <Github size={18} />
          Star on GitHub
        </a>
      </div>
    </div>
  </nav>
);

const Hero = () => (
  <section className="hero">
    <div className="container hero-content">
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
        the <span className="glow-text">Future</span> <span className="wip-tag">(WIP)</span>
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
          Get Started <ChevronRight size={18} />
        </a>
        <button className="secondary-btn">
          Watch Demo
        </button>
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

const TerminalPreview = () => (
  <section className="preview-section">
    <div className="container">
      <div className="terminal-window">
        <div className="terminal-header">
          <div className="terminal-controls">
            <span></span><span></span><span></span>
          </div>
          <div className="terminal-title">NEO Emacs — The Emacs from the Future</div>
        </div>
        <div className="terminal-body">
          <div className="code-line"><span className="code-comment">;; Welcome to the future of editing</span></div>
          <div className="code-line">(require 'neo-emacs)</div>
          <div className="code-line">&nbsp;</div>
          <div className="code-line"><span className="code-comment">;; GPU Acceleration enabled</span></div>
          <div className="code-line">(setq neomacs-gpu-backend 'vulkan)</div>
          <div className="code-line">(setq neomacs-render-fps 120)</div>
          <div className="code-line">&nbsp;</div>
          <div className="code-line"><span className="code-comment">;; Activating future effects</span></div>
          <div className="code-line">(neomacs-cursor-mode 'pixiedust)</div>
          <div className="code-line">(neomacs-scroll-effect 'wobbly)</div>
          <div className="code-line">&nbsp;</div>
          <div className="code-line"><span className="code-keyword">Ready to launch...</span></div>
          <div className="cursor-blink"></div>
        </div>
      </div>
    </div>
  </section>
);

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <TerminalPreview />
      <Features />
      
      <footer className="footer">
        <div className="container footer-content">
          <div className="footer-logo">NEO Emacs</div>
          <p>© 2026 Neomacs Project. Built for the modern age.</p>
          <div className="social-links">
            <a href="https://github.com/eval-exec/neomacs" target="_blank" rel="noopener noreferrer"><Github size={20} /></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
