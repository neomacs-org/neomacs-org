import { useState } from 'react';
import type { WindowNode, Workspace } from './types';
import { BUFFERS } from './buffers/registry';
import { TabBar } from './TabBar';
import { EmacsWindow } from './EmacsWindow';
import { EchoArea } from './EchoArea';
import './emacs.css';

const MAIN_TREE: WindowNode = {
  type: 'split',
  dir: 'h',
  ratio: 0.19,
  children: [
    {
      type: 'window',
      id: 'tree',
      buffers: ['tree'],
      right: [],
    },
    {
      type: 'split',
      dir: 'h',
      ratio: 0.52,
      children: [
        {
          type: 'window',
          id: 'code',
          buffers: ['init', 'early-init', 'scratch'],
          right: [
            { label: 'GPU: Vulkan', accent: true },
            { label: '120 FPS' },
            { label: 'L19:C31' },
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
              buffers: ['media', 'messages'],
              right: [{ label: '4K decode', accent: true }],
            },
            {
              type: 'window',
              id: 'webkit',
              buffers: ['webkit-home', 'webkit-docs'],
              right: [{ label: 'WPE', accent: true }],
            },
          ],
        },
      ],
    },
  ],
};

const MAIL_TREE: WindowNode = {
  type: 'split',
  dir: 'v',
  ratio: 0.42,
  children: [
    {
      type: 'window',
      id: 'mail-headers',
      buffers: ['mail-inbox'],
      right: [{ label: '4 mail', accent: true }, { label: '1 unread' }],
    },
    {
      type: 'window',
      id: 'mail-view',
      buffers: ['mail-view'],
      right: [{ label: 'mu4e' }],
    },
  ],
};

const IRC_TREE: WindowNode = {
  type: 'split',
  dir: 'h',
  ratio: 0.74,
  children: [
    {
      type: 'window',
      id: 'irc-chat',
      buffers: ['irc-neomacs', 'irc-emacs'],
      right: [{ label: 'libera.chat', accent: true }],
    },
    {
      type: 'window',
      id: 'irc-nicks',
      buffers: ['nicks'],
      right: [{ label: '6' }],
    },
  ],
};

const WORKSPACES: Record<string, Workspace> = {
  main: {
    label: 'main',
    tree: MAIN_TREE,
    defaultWindow: 'code',
    echo: 'NEO Emacs initialized in 0.001s. [Render Engine: wgpu]',
  },
  mail: {
    label: 'mail',
    tree: MAIL_TREE,
    defaultWindow: 'mail-headers',
    echo: 'mu4e: contacting mail server... 4 messages retrieved',
  },
  irc: {
    label: 'irc',
    tree: IRC_TREE,
    defaultWindow: 'irc-chat',
    echo: 'ERC: connected to irc.libera.chat — joined #neomacs',
  },
};

const WINDOW_ECHO: Record<string, string> = {
  tree: 'Treemacs: workspace ~/eval-exec/neomacs — 8 dirs, 9 files',
  code: 'NEO Emacs initialized in 0.001s. [Render Engine: wgpu]',
  media: 'Decoding demo.webm on GPU — zero-copy into wgpu texture.',
  webkit: 'WPE WebKit buffer ready — https://neomacs.org',
  'mail-headers': '4 messages in INBOX (1 unread)',
  'mail-view': 'Viewing message from The Lisp Machine',
  'irc-chat': 'ERC: #neomacs — 6 users',
  'irc-nicks': '6 users on #neomacs',
};

interface TreeProps {
  node: WindowNode;
  selected: string;
  bufferFor: (windowId: string, defaultId: string) => string;
  onSelectWindow: (id: string) => void;
  onSelectBuffer: (windowId: string, bufferId: string) => void;
}

const WindowTree = ({ node, selected, bufferFor, onSelectWindow, onSelectBuffer }: TreeProps) => {
  if (node.type === 'window') {
    return (
      <EmacsWindow
        spec={node}
        activeBufferId={bufferFor(node.id, node.buffers[0])}
        selected={selected === node.id}
        onSelect={() => onSelectWindow(node.id)}
        onSelectBuffer={(bufferId) => onSelectBuffer(node.id, bufferId)}
      />
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
          <WindowTree
            node={child}
            selected={selected}
            bufferFor={bufferFor}
            onSelectWindow={onSelectWindow}
            onSelectBuffer={onSelectBuffer}
          />
        </div>
      ))}
    </div>
  );
};

const initialWorkspace = () => {
  const hash = typeof window !== 'undefined' ? window.location.hash.slice(1) : '';
  return WORKSPACES[hash] ? hash : 'main';
};

export const EmacsFrame = () => {
  const [workspace, setWorkspace] = useState(initialWorkspace);
  const [selectedWin, setSelectedWin] = useState(WORKSPACES[workspace].defaultWindow);
  const [bufferOverrides, setBufferOverrides] = useState<Record<string, string>>({});
  const [echo, setEcho] = useState(WORKSPACES[workspace].echo);

  const selectWorkspace = (id: string) => {
    setWorkspace(id);
    setSelectedWin(WORKSPACES[id].defaultWindow);
    setEcho(WORKSPACES[id].echo);
  };

  const selectWindow = (id: string) => {
    setSelectedWin(id);
    setEcho(WINDOW_ECHO[id] ?? '');
  };

  const selectBuffer = (windowId: string, bufferId: string) => {
    setBufferOverrides((prev) => ({ ...prev, [windowId]: bufferId }));
    setSelectedWin(windowId);
    setEcho(`Switched to buffer ${BUFFERS[bufferId].name}`);
  };

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
      <TabBar
        tabs={Object.entries(WORKSPACES).map(([id, ws]) => ({ id, label: ws.label }))}
        active={workspace}
        onSelect={selectWorkspace}
      />
      <div className="emacs-window-tree">
        <div className="workspace ws-fade" key={workspace}>
          <WindowTree
            node={WORKSPACES[workspace].tree}
            selected={selectedWin}
            bufferFor={(windowId, defaultId) => bufferOverrides[windowId] ?? defaultId}
            onSelectWindow={selectWindow}
            onSelectBuffer={selectBuffer}
          />
        </div>
      </div>
      <EchoArea message={echo} />
    </div>
  );
};
