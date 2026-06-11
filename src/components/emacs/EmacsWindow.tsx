import type { FringeIndicator, WindowSpec } from './types';
import { TabLine } from './TabLine';
import { ModeLine } from './ModeLine';
import { CodeBuffer } from './buffers/CodeBuffer';
import { MediaBuffer } from './buffers/MediaBuffer';
import { WebkitBuffer } from './buffers/WebkitBuffer';

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

interface Props {
  spec: WindowSpec;
  selected: boolean;
  onSelect: () => void;
}

export const EmacsWindow = ({ spec, selected, onSelect }: Props) => (
  <div className={`emacs-window${selected ? ' selected' : ''}`} onClick={onSelect}>
    <TabLine tabs={spec.tabLine} />
    <div className="emacs-window-body">
      <div className="window-margin left" title="left margin"></div>
      <Fringe side="left" indicators={spec.leftFringe} />
      <div className="window-text">
        {spec.buffer === 'code' && <CodeBuffer />}
        {spec.buffer === 'media' && <MediaBuffer />}
        {spec.buffer === 'webkit' && <WebkitBuffer url="https://neomacs.org" />}
      </div>
      <Fringe side="right" />
      <div className="window-margin right" title="right margin"></div>
    </div>
    <ModeLine info={spec.modeLine} active={selected} />
  </div>
);
