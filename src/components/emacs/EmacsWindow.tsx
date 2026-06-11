import type { BufferDef, FringeIndicator, WindowSpec } from './types';
import { BUFFERS } from './buffers/registry';
import { TabLine } from './TabLine';
import { ModeLine } from './ModeLine';
import { CodeBuffer } from './buffers/CodeBuffer';
import { MediaBuffer } from './buffers/MediaBuffer';
import { WebkitBuffer } from './buffers/WebkitBuffer';
import { LinesBuffer } from './buffers/LinesBuffer';

const Fringe = ({
  side,
  indicators,
}: {
  side: 'left' | 'right';
  indicators?: FringeIndicator[];
}) => (
  <div className={`window-fringe ${side}`} title={`${side} fringe`}>
    {indicators?.map((ind, i) => (
      <span
        key={i}
        className={`fringe-ind ${ind.kind}`}
        style={{
          top:
            ind.kind === 'breakpoint'
              ? `calc(1rem + ${ind.line - 1} * 1.7em + 0.4em)`
              : `calc(1rem + ${ind.line - 1} * 1.7em)`,
        }}
      ></span>
    ))}
  </div>
);

const BufferView = ({ buffer }: { buffer: BufferDef }) => {
  switch (buffer.kind) {
    case 'code':
      return <CodeBuffer lines={buffer.lines} />;
    case 'media':
      return <MediaBuffer />;
    case 'webkit':
      return <WebkitBuffer url={buffer.url} page={buffer.page} />;
    case 'lines':
      return <LinesBuffer lines={buffer.lines} variant={buffer.variant} />;
  }
};

interface Props {
  spec: WindowSpec;
  activeBufferId: string;
  selected: boolean;
  onSelect: () => void;
  onSelectBuffer: (bufferId: string) => void;
}

export const EmacsWindow = ({ spec, activeBufferId, selected, onSelect, onSelectBuffer }: Props) => {
  const buffer = BUFFERS[activeBufferId];
  return (
    <div className={`emacs-window${selected ? ' selected' : ''}`} onClick={onSelect}>
      <TabLine
        tabs={spec.buffers.map((id) => ({
          id,
          label: BUFFERS[id].name,
          closable: BUFFERS[id].kind === 'webkit',
        }))}
        active={activeBufferId}
        onSelect={onSelectBuffer}
      />
      <div className="emacs-window-body">
        <div className="window-margin left" title="left margin"></div>
        <Fringe side="left" indicators={buffer.kind === 'code' ? buffer.fringe : undefined} />
        <div className="window-text buffer-fade" key={activeBufferId}>
          <BufferView buffer={buffer} />
        </div>
        <Fringe side="right" />
        <div className="window-margin right" title="right margin"></div>
      </div>
      <ModeLine
        info={{
          tag: buffer.tag,
          name: buffer.name,
          pos: buffer.pos,
          mode: buffer.mode,
          right: spec.right,
        }}
        active={selected}
      />
    </div>
  );
};
