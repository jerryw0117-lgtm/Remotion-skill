import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Easing,
  OffthreadVideo,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

type Clip = {
  from: number;
  duration: number;
  source: number;
  direction: -1 | 1;
  ghost?: boolean;
  warm?: boolean;
};

const FPS = 30;

const sourceMoments = [
  28.5, 8.23, 4.77, 18.67, 20.57, 22.5, 25.37, 30.13, 31.43, 34.47,
  36.27, 37.97, 43.43, 47.63, 49.77, 51.67, 52.0, 54.03, 58.33, 60.53,
  62.9, 64.9, 69.63, 71.37, 72.17, 73.3, 74.1, 75.17, 76.63, 77.23,
  77.93, 78.97, 81.07, 83.97, 85.23, 86.4, 18.67, 25.37, 28.5, 37.97,
  43.43, 51.67, 58.33, 64.9, 73.3, 77.93, 83.97,
];

const beatFrames = [
  7, 25, 42, 58, 75, 92, 108, 125, 141, 157, 171, 187, 202, 217, 232,
  247, 263, 279, 294, 309, 323, 340, 356, 371, 387, 403, 417, 433, 449,
  464, 479, 495, 510, 525, 541, 556, 571, 587, 603, 617, 633, 648, 664,
  679, 695, 710, 725, 741, 756, 771, 787, 802, 818, 833, 850, 867, 883,
  899, 915,
];

const strongBeats = [
  2, 24, 41, 54, 58, 62, 65, 84, 86, 92, 102, 125, 164, 187, 217, 225,
  233, 247, 254, 278, 286, 293, 371, 402, 433, 464, 518, 617, 656, 678,
  695, 709, 832, 915,
];

const makeClips = (): Clip[] => {
  const clips: Clip[] = [];
  let sourceIndex = 0;

  clips.push({from: 0, duration: 92, source: 34.0, direction: 1, ghost: true});

  for (let i = 5; i < 47; i++) {
    const from = beatFrames[i];
    const next = beatFrames[i + 1] ?? from + 15;
    clips.push({
      from,
      duration: next - from,
      source: sourceMoments[sourceIndex % sourceMoments.length],
      direction: sourceIndex % 2 === 0 ? 1 : -1,
      ghost: sourceIndex % 7 === 2,
      warm: sourceIndex % 5 === 0,
    });
    sourceIndex++;
  }

  clips.push({from: 741, duration: 46, source: 18.67, direction: -1, warm: true});
  clips.push({from: 787, duration: 46, source: 25.37, direction: 1, ghost: true});
  clips.push({from: 833, duration: 50, source: 52.0, direction: -1, warm: true});
  clips.push({from: 883, duration: 32, source: 37.97, direction: 1});
  clips.push({from: 915, duration: 58, source: 38.0, direction: -1, ghost: true});

  return clips;
};

const clips = makeClips();

const ClipLayer: React.FC<{clip: Clip; index: number}> = ({clip, index}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [0, Math.max(1, clip.duration - 1)], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });
  const zoomIn = index % 3 !== 1;
  const scale = zoomIn
    ? interpolate(progress, [0, 1], [1.055, 1.14])
    : interpolate(progress, [0, 1], [1.15, 1.06]);
  const translateX = interpolate(progress, [0, 1], [-18 * clip.direction, 18 * clip.direction]);
  const edge = Math.min(frame, Math.max(0, clip.duration - frame - 1));
  const blur = interpolate(edge, [0, 3], [7, 0], {
    extrapolateRight: 'clamp',
  });
  const contrast = clip.warm ? 1.15 : 1.08;
  const saturation = clip.warm ? 1.28 : 1.16;

  const video = (
    <OffthreadVideo
      src={staticFile('source.mp4')}
      trimBefore={Math.round(clip.source * FPS)}
      muted
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        transform: `translateX(${translateX}px) scale(${scale})`,
        filter: `blur(${blur}px) contrast(${contrast}) saturate(${saturation})`,
      }}
    />
  );

  return (
    <AbsoluteFill style={{backgroundColor: '#050505', overflow: 'hidden'}}>
      {video}
      {clip.ghost ? (
        <AbsoluteFill style={{opacity: 0.2, transform: `translateX(${clip.direction * 22}px)`, mixBlendMode: 'screen'}}>
          {video}
        </AbsoluteFill>
      ) : null}
      <AbsoluteFill
        style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.62) 100%)',
        }}
      />
    </AbsoluteFill>
  );
};

const FlashLayer: React.FC = () => {
  const frame = useCurrentFrame();
  const nearest = strongBeats.reduce((best, beat) =>
    Math.abs(beat - frame) < Math.abs(best - frame) ? beat : best,
  );
  const distance = Math.abs(frame - nearest);
  const opacity = interpolate(distance, [0, 1, 4], [0.62, 0.24, 0], {
    extrapolateRight: 'clamp',
  });
  const x = nearest % 2 === 0 ? '-15%' : '45%';

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <AbsoluteFill style={{backgroundColor: 'white', opacity}} />
      <div
        style={{
          position: 'absolute',
          left: x,
          top: '-20%',
          width: '70%',
          height: '140%',
          transform: 'rotate(18deg)',
          background: 'linear-gradient(90deg, transparent, rgba(255,216,139,0.75), transparent)',
          filter: 'blur(32px)',
          opacity: opacity * 0.85,
        }}
      />
    </AbsoluteFill>
  );
};

const IntroTitle: React.FC = () => {
  const frame = useCurrentFrame();
  const enter = interpolate(frame, [5, 22], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  return (
    <AbsoluteFill style={{justifyContent: 'flex-end', padding: '0 56px 62px', color: 'white'}}>
      <div
        style={{
          transform: `translateX(${interpolate(enter, [0, 1], [-70, 0])}px)`,
          opacity: enter,
          width: 520,
          borderLeft: '8px solid #f7bd48',
          padding: '16px 22px',
          background: 'rgba(8,8,10,0.74)',
          boxShadow: '0 12px 42px rgba(0,0,0,0.42)',
        }}
      >
        <div style={{fontSize: 48, lineHeight: 1.05, fontWeight: 900}}>田山花子</div>
        <div style={{fontSize: 25, marginTop: 10, fontWeight: 600, color: '#f3e8d0'}}>便利店后的夜，偏偏遇见你</div>
      </div>
    </AbsoluteFill>
  );
};

const MidCaption: React.FC = () => {
  const frame = useCurrentFrame();
  const pop = interpolate(frame, [0, 8, 42, 50], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 54}}>
      <div
        style={{
          opacity: pop,
          transform: `scale(${interpolate(pop, [0, 1], [0.9, 1])})`,
          color: 'white',
          background: 'rgba(10,10,12,0.82)',
          border: '2px solid rgba(255,255,255,0.48)',
          padding: '12px 28px',
          fontSize: 34,
          fontWeight: 800,
        }}
      >
        她一出现，节奏就变了
      </div>
    </AbsoluteFill>
  );
};

const FinalTitle: React.FC = () => {
  const frame = useCurrentFrame();
  const inProgress = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  return (
    <AbsoluteFill
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.34)',
        color: 'white',
        textAlign: 'center',
      }}
    >
      <div style={{opacity: inProgress, transform: `scale(${interpolate(inProgress, [0, 1], [1.22, 1])})`}}>
        <div style={{fontSize: 72, lineHeight: 1, fontWeight: 950, textShadow: '0 4px 24px rgba(0,0,0,0.75)'}}>
          便利店后的烟火
        </div>
        <div style={{fontSize: 30, marginTop: 18, color: '#ffd47a', fontWeight: 800}}>
          你以为是偶遇，其实是心动
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const DouyinAnime: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const finalFade = interpolate(frame, [945, 972], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{backgroundColor: '#050505', fontFamily: 'Arial, PingFang SC, sans-serif'}}>
      <Audio src={staticFile('music.mp3')} volume={1} />

      {clips.map((clip, index) => (
        <Sequence
          key={`${clip.from}-${clip.source}`}
          from={clip.from}
          durationInFrames={clip.duration}
          premountFor={fps}
        >
          <ClipLayer clip={clip} index={index} />
        </Sequence>
      ))}

      <Sequence from={0} durationInFrames={92} premountFor={fps}>
        <IntroTitle />
      </Sequence>
      <Sequence from={371} durationInFrames={52} premountFor={fps}>
        <MidCaption />
      </Sequence>
      <Sequence from={883} durationInFrames={90} premountFor={fps}>
        <FinalTitle />
      </Sequence>
      <FlashLayer />
      <AbsoluteFill style={{backgroundColor: 'black', opacity: 1 - finalFade}} />
    </AbsoluteFill>
  );
};
