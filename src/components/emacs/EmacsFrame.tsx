import { useState } from 'react';
import type { WindowNode } from './types';
import { TabBar } from './TabBar';
import { EmacsWindow } from './EmacsWindow';
import { EchoArea } from './EchoArea';
import './emacs.css';

const FRAME_TREE: WindowNode = {
  type: 'split',
  dir: 'h',
  ratio: 0.52,
  children: [
    {
      type: 'window',
      id: 'code',
      buffer: 'code',
      tabLine: [
        { label: 'init.el', active: true },
        { label: 'early-init.el' },
        { label: '*scratch*' },
      ],
      modeLine: {
        tag: 'U:---',
        name: 'init.el',
        pos: '(64%)',
        mode: 'elisp/l NEO',
        right: [
          { label: 'GPU: Vulkan', accent: true },
          { label: '120 FPS' },
          { label: 'L16:C31' },
        ],
      },
      leftFringe: [
        { line: 5, kind: 'modified' },
        { line: 6, kind: 'modified' },
        { line: 9, kind: 'added' },
        { line: 10, kind: 'added' },
        { line: 16, kind: 'breakpoint' },
      ],
    },
    {
      type: 'split',
      dir: 'v',
      ratio: 0.58,
      children: [
        {
          type: 'window',
          id: 'media',
          buffer: 'media',
          tabLine: [{ label: 'media.org', active: true }, { label: '*Messages*' }],
          modeLine: {
            tag: 'U:%%-',
            name: 'media.org',
            pos: '(Top)',
            mode: 'Org/media',
            right: [{ label: '4K decode', accent: true }],
          },
        },
        {
          type: 'window',
          id: 'webkit',
          buffer: 'webkit',
          tabLine: [
            { label: 'neomacs.org', active: true, closable: true },
            { label: 'docs', closable: true },
          ],
          modeLine: {
            tag: 'U:%%-',
            name: '*webkit*',
            pos: '(All)',
            mode: 'WebKit',
            right: [{ label: 'WPE', accent: true }],
          },
        },
      ],
    },
  ],
};

const ECHO_MESSAGES: Record<string, string> = {
  code: 'NEO Emacs initialized in 0.001s. [Render Engine: wgpu]',
  media: 'Decoding demo.webm on GPU — zero-copy into wgpu texture.',
  webkit: 'WPE WebKit buffer ready — https://neomacs.org',
};

interface TreeProps {
  node: WindowNode;
  selected: string;
  onSelect: (id: string) => void;
}

const WindowTree = ({ node, selected, onSelect }: TreeProps) => {
  if (node.type === 'window') {
    return (
      <EmacsWindow spec={node} selected={selected === node.id} onSelect={() => onSelect(node.id)} />
    );
  }
  return (
    <div className={`emacs-split emacs-split-${node.dir}`}>
      {node.children.map((child, i) => (
        <div
          key={i}
          className="emacs-split-pane"
          style={{ flexGrow: i === 0 ? node.ratio : 1 - node.ratio }}
        >
          <WindowTree node={child} selected={selected} onSelect={onSelect} />
        </div>
      ))}
    </div>
  );
};

export const EmacsFrame = () => {
  const [selected, setSelected] = useState('code');

  return (
    <div className="emacs-frame">
      <div className="emacs-frame-title">
        <div className="frame-controls">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="frame-text">NEO Emacs</div>
      </div>
      <TabBar />
      <div className="emacs-window-tree">
        <WindowTree node={FRAME_TREE} selected={selected} onSelect={setSelected} />
      </div>
      <EchoArea message={ECHO_MESSAGES[selected]} />
    </div>
  );
};
