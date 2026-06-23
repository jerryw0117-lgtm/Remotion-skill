import React from 'react';
import {Composition} from 'remotion';
import {DailyVlog, TOTAL_FRAMES} from './DailyVlog';

export const RemotionRoot: React.FC = () => (
  <Composition
    id="DailyVlog"
    component={DailyVlog}
    durationInFrames={TOTAL_FRAMES}
    fps={30}
    width={1080}
    height={1920}
  />
);
