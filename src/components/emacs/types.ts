export interface TabLineTab {
  label: string;
  active?: boolean;
  closable?: boolean;
}

export type BufferKind = 'code' | 'media' | 'webkit';

export type FringeKind = 'added' | 'modified' | 'breakpoint';

export interface FringeIndicator {
  line: number;
  kind: FringeKind;
}

export interface ModeLineStat {
  label: string;
  accent?: boolean;
}

export interface ModeLineInfo {
  tag: string;
  name: string;
  pos: string;
  mode: string;
  right: ModeLineStat[];
}

export interface WindowSpec {
  type: 'window';
  id: string;
  buffer: BufferKind;
  tabLine: TabLineTab[];
  modeLine: ModeLineInfo;
  leftFringe?: FringeIndicator[];
}

export interface SplitSpec {
  type: 'split';
  dir: 'h' | 'v';
  ratio: number;
  children: [WindowNode, WindowNode];
}

export type WindowNode = WindowSpec | SplitSpec;
