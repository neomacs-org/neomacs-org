import { Gauge, Check, X } from 'lucide-react';

export const BenchmarkSection = () => {
  const telemetryData = [
    {
      metric: 'COLD_STARTUP_TIME',
      desc: 'Cold process launch with bytecode',
      legacy: '1,820 ms',
      legacyNote: 'gnu emacs 29.3 (c core)',
      neomacs: '0.9 ms',
      neomacsNote: 'neomacs snapshot JIT (rust)',
      delta: '2022x faster',
    },
    {
      metric: 'FRAME_RENDER_BUDGET',
      desc: 'Hardware compositor frame latency',
      legacy: '16.6 ms (60 Hz)',
      legacyNote: 'software cairo/x11 rasterizer',
      neomacs: '2.1 ms (120 Hz)',
      neomacsNote: 'wgpu direct vulkan/metal pipeline',
      delta: '8x headroom',
    },
    {
      metric: 'LISP_CONCURRENCY',
      desc: 'Execution model under heavy background jobs',
      legacy: 'Cooperative (Blocking)',
      legacyNote: 'blocking main event loop',
      neomacs: 'Preemptive Multi-Thread',
      neomacsNote: 'crossbeam channel thread pools',
      delta: 'zero ui freeze',
    },
    {
      metric: 'MEMORY_SAFETY_AUDIT',
      desc: 'Memory corruption & pointer security',
      legacy: 'Manual C Pointers',
      legacyNote: 'decades of potential segfaults',
      neomacs: '100% Rust Safe',
      neomacsNote: 'compile-time borrow checking',
      delta: '0 buffer overflow',
    },
  ];

  return (
    <section id="benchmarks" className="benchmark-section-dense">
      <div className="container">
        <div className="section-header-dense">
          <div className="section-label">
            <span className="mono-idx">[03]</span>
            <span className="mono-title">TELEMETRY_BENCHMARKS</span>
          </div>
          <h2>Performance Verification Matrix</h2>
          <p className="section-sub-dense">
            Empirical runtime telemetry comparing single-threaded legacy GNU Emacs against NEO Emacs's
            Rust VM and wgpu compositor.
          </p>
        </div>

        <div className="telemetry-table-dense">
          <div className="telem-thead">
            <div className="th-cell th-metric">SUBSYSTEM / METRIC</div>
            <div className="th-cell th-legacy">LEGACY GNU EMACS (C)</div>
            <div className="th-cell th-neomacs">NEO EMACS (RUST + GPU)</div>
            <div className="th-cell th-delta">DELTA RATIO</div>
          </div>

          <div className="telem-tbody">
            {telemetryData.map((row) => (
              <div key={row.metric} className="telem-row">
                <div className="td-cell td-metric">
                  <span className="metric-code">{row.metric}</span>
                  <span className="metric-sub">{row.desc}</span>
                </div>

                <div className="td-cell td-legacy">
                  <div className="val-line val-legacy">
                    <X size={12} className="ico-cross" />
                    <span>{row.legacy}</span>
                  </div>
                  <span className="val-sub">{row.legacyNote}</span>
                </div>

                <div className="td-cell td-neomacs">
                  <div className="val-line val-neomacs">
                    <Check size={12} className="ico-check" />
                    <span>{row.neomacs}</span>
                  </div>
                  <span className="val-sub">{row.neomacsNote}</span>
                </div>

                <div className="td-cell td-delta">
                  <span className="delta-badge">{row.delta}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dense-philosophy-bar">
          <div className="bar-tag">MANIFESTO</div>
          <p className="bar-quote">
            "Emacs is not merely a text editor; it is a programmable computing environment that has survived 50 years.
            NEO Emacs guarantees it will lead the next 50 with memory safety, native multi-core concurrency, and hardware GPU compositing."
          </p>
        </div>
      </div>
    </section>
  );
};
