import React from 'react';
import {Audio, Video} from '@remotion/media';
import {
  AbsoluteFill,
  Easing,
  Series,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

type ClipSpec = {
  file: string;
  duration: number;
  volume: number;
  label?: string;
  detail?: string;
  position?: string;
  locked?: boolean;
};

const clips: ClipSpec[] = [
  {file: '00-first-version-opening.mp4', duration: 2.9, volume: 0.9, locked: true},
  {file: '02-street.mp4', duration: 3, volume: 0.42, label: '6月19日 · 晚上八点半', detail: '出门吃糖水'},
  {file: '03-store.mp4', duration: 3.2, volume: 0.3},
  {file: '04-queue.mp4', duration: 2.3, volume: 0.12, label: '今晚的快乐，已下单'},
  {file: '05-inside.mp4', duration: 4.5, volume: 0.25, label: '先进去等'},
  {file: '06-waiting.mp4', duration: 3.5, volume: 0.7},
  {file: '07-tease.mp4', duration: 4.5, volume: 1, label: '等到开始自娱自乐'},
  {file: '08-play.mp4', duration: 5, volume: 0.85},
  {file: '09-dessert.mp4', duration: 3, volume: 0.75, label: '终于吃上了'},
  {file: '10-taste.mp4', duration: 4, volume: 1},
  {
    file: '13-chocolate-reveal.mp4',
    duration: 3.2,
    volume: 0.55,
    label: '还有一碗：法芙娜生巧巴斯克',
  },
  {
    file: '14-chocolate-taste.mp4',
    duration: 4.2,
    volume: 0.9,
    label: '这一碗，生巧味很浓',
  },
  {
    file: '15-chocolate-ending.mp4',
    duration: 3,
    volume: 0.55,
    label: '今晚，甜甜收尾',
  },
];

export const TOTAL_FRAMES = clips.reduce(
  (total, clip) => total + Math.round(clip.duration * 30),
  0,
);

const Caption: React.FC<{label?: string; detail?: string}> = ({label, detail}) => {
  const frame = useCurrentFrame();
  const enter = interpolate(frame, [3, 15], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  if (!label) return null;

  return (
    <div
      style={{
        position: 'absolute',
        left: 54,
        right: 54,
        bottom: 142,
        color: 'white',
        textAlign: 'center',
        fontFamily: 'PingFang SC, Hiragino Sans GB, sans-serif',
        textShadow: '0 2px 12px rgba(0,0,0,0.9)',
        opacity: enter,
        transform: `translateY(${interpolate(enter, [0, 1], [16, 0])}px)`,
      }}
    >
      <div style={{fontSize: 42, fontWeight: 600, lineHeight: 1.28}}>{label}</div>
      {detail ? (
        <div style={{fontSize: 30, fontWeight: 400, marginTop: 8}}>{detail}</div>
      ) : null}
    </div>
  );
};

const VlogClip: React.FC<{clip: ClipSpec}> = ({clip}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const durationFrames = Math.round(clip.duration * fps);
  const zoom = interpolate(frame, [0, durationFrames], [1, 1.018], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{backgroundColor: '#0e0e0e', overflow: 'hidden'}}>
      <Video
        src={staticFile(`clips/${clip.file}`)}
        volume={(localFrame) => {
          const fadeIn = interpolate(localFrame, [0, 5], [0.35, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const fadeOut = interpolate(
            localFrame,
            [durationFrames - 6, durationFrames],
            [1, 0.35],
            {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
          );
          return clip.volume * 0.42 * Math.min(fadeIn, fadeOut);
        }}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: clip.position ?? 'center center',
          transform: clip.locked ? 'none' : `scale(${zoom})`,
          filter: clip.locked
            ? 'none'
            : 'saturate(0.94) contrast(1.03) brightness(1.02)',
        }}
      />
      {clip.locked ? null : (
        <>
          <AbsoluteFill
            style={{
              background:
                'linear-gradient(to bottom, rgba(0,0,0,0.08), transparent 62%, rgba(0,0,0,0.26))',
            }}
          />
          <Caption label={clip.label} detail={clip.detail} />
        </>
      )}
    </AbsoluteFill>
  );
};

export const DailyVlog: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: '#0e0e0e'}}>
    <Series>
      {clips.map((clip) => (
        <Series.Sequence
          key={clip.file}
          durationInFrames={Math.round(clip.duration * 30)}
          premountFor={30}
        >
          <VlogClip clip={clip} />
        </Series.Sequence>
      ))}
    </Series>
    <Audio
      src={staticFile('music-latin-lovers.mp3')}
      volume={(frame) => {
        const fadeIn = interpolate(frame, [0, 30], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        const fadeOut = interpolate(frame, [TOTAL_FRAMES - 45, TOTAL_FRAMES], [1, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        const dialogue =
          (frame >= 477 && frame < 717) ||
          (frame >= 957 && frame < 1077) ||
          (frame >= 1173 && frame < 1299);
        return (dialogue ? 0.22 : 0.32) * Math.min(fadeIn, fadeOut);
      }}
    />
  </AbsoluteFill>
);
