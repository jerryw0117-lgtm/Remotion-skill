import React from 'react';
import {Composition} from 'remotion';
import {DouyinAnime} from './DouyinAnime';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="DouyinAnime"
      component={DouyinAnime}
      durationInFrames={973}
      fps={30}
      width={1280}
      height={720}
    />
  );
};
