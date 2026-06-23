import React from 'react';
import {Composition} from 'remotion';
import {CitywalkCollage, TOTAL_FRAMES} from './CitywalkCollage';
import {EditorRecreation, EDITOR_RECREATION_FRAMES} from './EditorRecreation';
import {OddBeatCut, ODD_BEAT_FRAMES} from './OddBeatCut';

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="CitywalkCollage"
      component={CitywalkCollage}
      durationInFrames={TOTAL_FRAMES}
      fps={30}
      width={1080}
      height={1920}
    />
    <Composition
      id="EditorRecreation"
      component={EditorRecreation}
      durationInFrames={EDITOR_RECREATION_FRAMES}
      fps={30}
      width={1080}
      height={1920}
    />
    <Composition
      id="OddBeatCut"
      component={OddBeatCut}
      durationInFrames={ODD_BEAT_FRAMES}
      fps={30}
      width={1080}
      height={1920}
    />
  </>
);
