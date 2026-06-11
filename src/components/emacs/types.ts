import type { ReactNode } from 'react';

export type FringeKind = 'added' | 'modified' | 'breakpoint';

export interface FringeIndicator {
  line: number;
  kind: FringeKind;
}

export interface ModeLineStat {
  label: string;
  accent?: boolean;
}

/* Mode-line chrome shared by every buffer */
export interface BufferChrome {
  name: string;
  mode: string;
  tag: string;
  pos: string;
}

export type BufferDef =
  | ({ kind: 'code'; lines: ReactNode[]; fringe?: FringeIndicator[] } & BufferChrome)
  | ({ kind: 'media' } & BufferChrome)
  | ({ kind: 'webkit'; url: string; page: 'home' | 'docs' } & BufferChrome)
  | ({ kind: 'lines'; lines: ReactNode[]; variant?: string } & BufferChrome);

export interface WindowSpec {
  type: 'window';
  id: string;
  buffers: string[]; /* buffer ids shown in this window's tab-line; first is default */
  right: ModeLineStat[];
}

export interface SplitSpec {
  type: 'split';
  dir: 'h' | 'v';
  ratio: number;
  children: [WindowNode, WindowNode];
}

export type WindowNode = WindowSpec | SplitSpec;

export interface Workspace {
  label: string;
  tree: WindowNode;
  defaultWindow: string;
  echo: string;
}
