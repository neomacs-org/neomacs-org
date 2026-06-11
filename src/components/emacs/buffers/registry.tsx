import type { ReactNode } from 'react';
import type { BufferDef } from '../types';

/* ---- init.el ---- */

const INIT_LINES: ReactNode[] = [
  <span className="code-comment">;; Welcome to the future of editing</span>,
  <>(<span className="code-keyword">require</span> <span className="code-const">'neo-emacs</span>)</>,
  <>&nbsp;</>,
  <span className="code-comment">;; GPU acceleration enabled</span>,
  <>(<span className="code-keyword">setq</span> neomacs-gpu-backend <span className="code-const">'vulkan</span>)</>,
  <>(<span className="code-keyword">setq</span> neomacs-render-fps <span className="code-number">120</span>)</>,
  <>&nbsp;</>,
  <span className="code-comment">;; Rich buffers: video + WebKit</span>,
  <>(neomacs-play-video <span className="code-string">"demo.webm"</span>)</>,
  <>(neomacs-webkit-browse <span className="code-string">"https://neomacs.org"</span>)</>,
  <>&nbsp;</>,
  <span className="code-comment">;; Multi-threaded elisp core</span>,
  <>(<span className="code-keyword">setq</span> neomacs-elisp-threads <span className="code-number">8</span>)</>,
  <>&nbsp;</>,
  <span className="code-comment">;; Activating future effects</span>,
  <>(neomacs-cursor-mode <span className="code-const">'pixiedust</span>)</>,
  <>(neomacs-scroll-effect <span className="code-const">'wobbly</span>)</>,
  <>&nbsp;</>,
  <>
    (<span className="code-keyword">message</span> <span className="code-string">"NEO Emacs is ready."</span>)
    <span className="cursor-blink"></span>
  </>,
];

const EARLY_INIT_LINES: ReactNode[] = [
  <span className="code-comment">;; early-init.el — before the GUI exists</span>,
  <>(<span className="code-keyword">setq</span> package-enable-at-startup <span className="code-const">nil</span>)</>,
  <>&nbsp;</>,
  <span className="code-comment">;; Undecorated, GPU-composited frame</span>,
  <>(<span className="code-keyword">push</span> <span className="code-const">'(undecorated . t)</span> default-frame-alist)</>,
  <>(<span className="code-keyword">setq</span> neomacs-frame-alpha <span className="code-number">0.96</span>)</>,
  <>(<span className="code-keyword">setq</span> neomacs-vsync <span className="code-const">t</span>)</>,
];

const SCRATCH_LINES: ReactNode[] = [
  <span className="code-comment">;; This buffer is for text that is not saved,</span>,
  <span className="code-comment">;; and for Lisp evaluation.</span>,
  <>&nbsp;</>,
  <>(neomacs-version)</>,
  <span className="code-comment">;; =&gt; "NEO Emacs 1.0 (wgpu/vulkan)"</span>,
  <>&nbsp;</>,
  <>
    (<span className="code-keyword">*</span> <span className="code-number">60</span> <span className="code-number">2</span>)
    <span className="code-comment"> ;; =&gt; 120 FPS</span>
    <span className="cursor-blink"></span>
  </>,
];

/* ---- *Messages* ---- */

const MESSAGES_LINES: ReactNode[] = [
  <span className="msg-dim">Loading early-init.el...done (0.0001s)</span>,
  <span className="msg-dim">wgpu: adapter = Radeon RX 9070 XT (vulkan)</span>,
  <span className="msg-dim">Initializing render thread...done</span>,
  <span className="msg-dim">Loading init.el...done (0.0008s)</span>,
  <span className="msg-dim">Turning on tab-bar-mode...done</span>,
  <>NEO Emacs ready in <span className="code-number">0.001s</span></>,
];

/* ---- mail (mu4e style) ---- */

const hdrRow = (
  date: string,
  from: string,
  subj: string,
  opts?: { sel?: boolean; unread?: boolean },
) => (
  <div className={`hdr-row${opts?.sel ? ' sel' : ''}${opts?.unread ? ' unread' : ''}`}>
    <span className="hdr-flag">{opts?.unread ? '●' : ' '}</span>
    <span className="hdr-date">{date}</span>
    <span className="hdr-from">{from}</span>
    <span className="hdr-subj">{subj}</span>
  </div>
);

const MAIL_HEADERS_LINES: ReactNode[] = [
  <div className="hdr-row hdr-title">
    <span className="hdr-flag">{' '}</span>
    <span className="hdr-date">Date</span>
    <span className="hdr-from">From</span>
    <span className="hdr-subj">Subject</span>
  </div>,
  hdrRow('Jun 11', 'The Lisp Machine', 'Welcome to the future of mail', { sel: true, unread: true }),
  hdrRow('Jun 10', 'GPU Pipeline', '120 FPS sustained on 4K buffers'),
  hdrRow('Jun 09', 'rust-core@lists', '[PATCH] parallel elisp GC'),
  hdrRow('Jun 08', 'GitHub', 'neomacs passed 10,000 stars'),
];

const mk = (k: string, v: string) => (
  <>
    <span className="mail-key">{k}: </span>
    <span className="mail-val">{v}</span>
  </>
);

const MAIL_VIEW_LINES: ReactNode[] = [
  mk('From', 'The Lisp Machine <machine@neomacs.org>'),
  mk('To', 'you@future.dev'),
  mk('Subject', 'Welcome to the future of mail'),
  mk('Date', 'Wed, 11 Jun 2026 04:00:00 +0000'),
  <span className="mail-sep">────────────────────────────────────</span>,
  <>Your editor now renders on the GPU.</>,
  <>Buffers hold video, web views and</>,
  <>anything else you can dream in elisp.</>,
  <>&nbsp;</>,
  <>The machine is alive. M-x is the REPL</>,
  <>for your whole computing environment.</>,
  <>&nbsp;</>,
  <span className="msg-dim">— sent from a mail buffer</span>,
];

/* ---- IRC (ERC style) ---- */

const irc = (time: string, nick: string, msg: string, n: number) => (
  <>
    <span className="irc-time">[{time}]</span>{' '}
    <span className={`irc-nick n${n}`}>{'<' + nick + '>'}</span> {msg}
  </>
);

const IRC_NEOMACS_LINES: ReactNode[] = [
  <span className="irc-star">*** You have joined channel #neomacs</span>,
  irc('04:33', 'core-dev', 'JIT hit 12x on the scroll loop today', 1),
  irc('04:35', 'gpu-wizard', '4K video in a buffer, zero copy. it just works', 2),
  irc('04:37', 'elisp-fan', 'my whole config loaded unchanged. unreal', 3),
  irc('04:40', 'core-dev', 'wgpu frame time: 2.1ms — we have headroom', 1),
  irc('04:41', 'newcomer', 'wait, the mode-line is shader-rendered??', 4),
  irc('04:42', 'gpu-wizard', 'everything is. welcome to the future', 2),
  <>&nbsp;</>,
  <>
    <span className="irc-prompt">ERC&gt;</span> <span className="cursor-blink"></span>
  </>,
];

const IRC_EMACS_LINES: ReactNode[] = [
  <span className="irc-star">*** You have joined channel #emacs</span>,
  irc('04:20', 'old-timer', 'so neomacs is real?', 1),
  irc('04:21', 'curious', '100% elisp compat, GPU rendering, they say', 3),
  irc('04:22', 'old-timer', 'M-x believe', 1),
  <>&nbsp;</>,
  <>
    <span className="irc-prompt">ERC&gt;</span> <span className="cursor-blink"></span>
  </>,
];

const NICKS_LINES: ReactNode[] = [
  <span className="nick-title">#neomacs — 6 users</span>,
  <span className="nick-op">@core-dev</span>,
  <span className="nick-op">@gpu-wizard</span>,
  <span className="nick-voice">+elisp-fan</span>,
  <span className="nick-voice">+newcomer</span>,
  <span className="nick-plain">{' '}lurker42</span>,
  <span className="nick-plain">{' '}you</span>,
];

/* ---- registry ---- */

export const BUFFERS: Record<string, BufferDef> = {
  init: {
    kind: 'code',
    name: 'init.el',
    mode: 'elisp/l NEO',
    tag: 'U:---',
    pos: '(64%)',
    lines: INIT_LINES,
    fringe: [
      { line: 5, kind: 'modified' },
      { line: 6, kind: 'modified' },
      { line: 9, kind: 'added' },
      { line: 10, kind: 'added' },
      { line: 13, kind: 'added' },
      { line: 19, kind: 'breakpoint' },
    ],
  },
  'early-init': {
    kind: 'code',
    name: 'early-init.el',
    mode: 'elisp/l NEO',
    tag: 'U:---',
    pos: '(All)',
    lines: EARLY_INIT_LINES,
  },
  scratch: {
    kind: 'code',
    name: '*scratch*',
    mode: 'lisp-interaction',
    tag: 'U:**-',
    pos: '(All)',
    lines: SCRATCH_LINES,
  },
  media: {
    kind: 'media',
    name: 'media.org',
    mode: 'Org/media',
    tag: 'U:%%-',
    pos: '(Top)',
  },
  messages: {
    kind: 'lines',
    name: '*Messages*',
    mode: 'Messages',
    tag: 'U:%%-',
    pos: '(Bot)',
    lines: MESSAGES_LINES,
  },
  'webkit-home': {
    kind: 'webkit',
    name: 'neomacs.org',
    mode: 'WebKit',
    tag: 'U:%%-',
    pos: '(All)',
    url: 'https://neomacs.org',
    page: 'home',
  },
  'webkit-docs': {
    kind: 'webkit',
    name: 'docs',
    mode: 'WebKit',
    tag: 'U:%%-',
    pos: '(Top)',
    url: 'https://neomacs.org/docs',
    page: 'docs',
  },
  'mail-inbox': {
    kind: 'lines',
    name: '*mu4e-headers*',
    mode: 'mu4e:headers',
    tag: 'U:%%-',
    pos: '(Top)',
    lines: MAIL_HEADERS_LINES,
    variant: 'mail-headers',
  },
  'mail-view': {
    kind: 'lines',
    name: '*mu4e-view*',
    mode: 'mu4e:view',
    tag: 'U:%%-',
    pos: '(46%)',
    lines: MAIL_VIEW_LINES,
  },
  'irc-neomacs': {
    kind: 'lines',
    name: '#neomacs',
    mode: 'ERC',
    tag: 'U:%%-',
    pos: '(Bot)',
    lines: IRC_NEOMACS_LINES,
    variant: 'irc',
  },
  'irc-emacs': {
    kind: 'lines',
    name: '#emacs',
    mode: 'ERC',
    tag: 'U:%%-',
    pos: '(Bot)',
    lines: IRC_EMACS_LINES,
    variant: 'irc',
  },
  nicks: {
    kind: 'lines',
    name: '*nicks*',
    mode: 'ERC',
    tag: 'U:%%-',
    pos: '(All)',
    lines: NICKS_LINES,
  },
};
