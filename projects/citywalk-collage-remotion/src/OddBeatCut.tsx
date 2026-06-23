import React from 'react';
import {Audio, Video} from '@remotion/media';
import {
  AbsoluteFill,
  Easing,
  Freeze,
  Sequence,
  interpolate,
  random,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export const ODD_BEAT_FRAMES = 602;

type OddShot = {
  src: string;
  from: number;
  duration: number;
  mode: 'push' | 'pull' | 'hold' | 'snap';
  position?: string;
  scale?: number;
  rotate?: number;
};

type FrozenAsset = {
  src: string;
  freezeAtFrame?: number;
  startFrom?: number;
  position?: string;
  scale?: number;
};

const shots: OddShot[] = [
  {src: '02-street.mp4', from: 0, duration: 42, mode: 'push', scale: 1.06},
  {src: '02-approach.mp4', from: 42, duration: 34, mode: 'snap', scale: 1.1},
  {src: '03-store.mp4', from: 76, duration: 34, mode: 'pull', scale: 1.08},
  {src: '04-queue.mp4', from: 110, duration: 38, mode: 'hold', scale: 1.16, position: 'center 62%'},
  {src: '05-inside.mp4', from: 148, duration: 34, mode: 'push', scale: 1.12},
  {src: '03-store.mp4', from: 182, duration: 32, mode: 'snap', scale: 1.14},
  {src: '09-dessert.mp4', from: 214, duration: 44, mode: 'push', scale: 1.62, position: 'center 82%'},
  {src: '11-close.mp4', from: 258, duration: 34, mode: 'hold', scale: 1.68, position: 'center 84%'},
  {src: '13-chocolate-reveal.mp4', from: 292, duration: 46, mode: 'pull', scale: 1.62, position: 'center 82%'},
  {src: '02-street.mp4', from: 338, duration: 36, mode: 'snap', scale: 1.12},
  {src: '03-store.mp4', from: 374, duration: 34, mode: 'push', scale: 1.1},
  {src: '09-dessert.mp4', from: 408, duration: 40, mode: 'snap', scale: 1.66, position: 'center 82%'},
  {src: '11-close.mp4', from: 448, duration: 34, mode: 'hold', scale: 1.72, position: 'center 84%'},
  {src: '13-chocolate-reveal.mp4', from: 482, duration: 42, mode: 'push', scale: 1.66, position: 'center 82%'},
  {src: '15-chocolate-ending.mp4', from: 524, duration: 78, mode: 'pull', scale: 1.72, position: 'center 84%'},
];

const words = [
  {at: 42, main: 'SO', sub: 'TELL ME', color: '#ff8a2a', x: 0, y: -18},
  {at: 86, main: 'BABE', sub: "WHAT'S", color: '#ffffff', x: -28, y: 8},
  {at: 130, main: 'I NOW', sub: '', color: '#ff3858', x: 18, y: 0},
  {at: 168, main: 'WHAT', sub: 'YOU', color: '#ffffff', x: 0, y: 24},
  {at: 210, main: 'MEAN', sub: '', color: '#ffffff', x: -20, y: -8},
  {at: 264, main: 'DO', sub: '', color: '#ff8a2a', x: 0, y: 0},
  {at: 330, main: 'YOU', sub: '', color: '#ffffff', x: 22, y: 14},
  {at: 382, main: 'EVEN', sub: '', color: '#ffffff', x: 0, y: 0},
  {at: 432, main: "I'M", sub: 'WITH', color: '#ffffff', x: -12, y: -16},
  {at: 506, main: 'CRAZY', sub: 'OVER YOU', color: '#ffffff', x: 0, y: 20},
  {at: 558, main: 'THIS', sub: '', color: '#ffffff', x: 0, y: 0},
];

const cutFrames = shots.slice(1).map((shot) => shot.from);

const clamp = {
  extrapolateLeft: 'clamp' as const,
  extrapolateRight: 'clamp' as const,
};

const FrozenVideoFrame: React.FC<{asset: FrozenAsset}> = ({asset}) => {
  const isFrozen = asset.freezeAtFrame !== undefined;

  const video = (
    <Video
      src={staticFile(`clips/${asset.src}`)}
      muted
      trimBefore={isFrozen ? asset.freezeAtFrame : (asset.startFrom ?? 0)}
      playbackRate={1}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: asset.position ?? 'center center',
        transform: `scale(${asset.scale ?? 1})`,
        filter: 'brightness(.82) contrast(1.2) saturate(.85)',
      }}
    />
  );

  if (!isFrozen) {
    return video;
  }

  return <Freeze frame={0}>{video}</Freeze>;
};

const FrozenFrameGrid: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = interpolate(frame, [0, 10], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });
  const tileSpring = spring({
    frame,
    fps,
    config: {mass: 0.5, damping: 12, stiffness: 150},
  });
  const exit = interpolate(frame, [32, 42], [1, 0], clamp);
  const assets: FrozenAsset[] = [
    {src: '02-street.mp4', freezeAtFrame: 26, scale: 1.08},
    {src: '03-store.mp4', startFrom: 8, scale: 1.05},
    {src: '09-dessert.mp4', freezeAtFrame: 18, position: 'center 82%', scale: 1.55},
    {src: '13-chocolate-reveal.mp4', startFrom: 10, position: 'center 82%', scale: 1.5},
  ];

  return (
    <AbsoluteFill
      style={{
        padding: 34,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: '1fr 1fr',
        gap: 8,
        opacity: enter * exit,
        transform: `scale(${interpolate(enter, [0, 1], [1.18, 1])})`,
        pointerEvents: 'none',
      }}
    >
      {assets.map((asset, index) => (
        <div
          key={`${asset.src}-${index}`}
          style={{
            overflow: 'hidden',
            background: '#050505',
            border: '4px solid white',
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
            transform: `scale(${interpolate(tileSpring, [0, 1], [0.9, 1], clamp)})`,
            transformOrigin: 'center center',
          }}
        >
          <FrozenVideoFrame asset={asset} />
        </div>
      ))}
    </AbsoluteFill>
  );
};

const FrozenBurst: React.FC<{at: number; assets: FrozenAsset[]; label?: string}> = ({
  at,
  assets,
  label,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const local = frame - at;
  if (local < 0 || local > 32) return null;
  const tileSpring = spring({
    frame: local,
    fps,
    config: {mass: 0.5, damping: 12, stiffness: 150},
  });
  const pop = interpolate(local, [0, 7], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
  });
  const opacity = interpolate(local, [0, 5, 24, 32], [0, 1, 1, 0], clamp);
  const positions = [
    {left: 72, top: 260, width: 410, height: 520, rotate: -5},
    {left: 570, top: 320, width: 390, height: 470, rotate: 4},
    {left: 250, top: 875, width: 560, height: 420, rotate: -2},
  ];

  return (
    <AbsoluteFill style={{opacity, pointerEvents: 'none'}}>
      {assets.map((asset, index) => {
        const pos = positions[index % positions.length];
        return (
          <div
            key={`${asset.src}-${index}`}
            style={{
              position: 'absolute',
              left: pos.left,
              top: pos.top,
              width: pos.width,
              height: pos.height,
              overflow: 'hidden',
              border: '4px solid white',
              boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
              transform: `rotate(${pos.rotate}deg) translateY(${interpolate(pop, [0, 1], [90, 0])}px) scale(${interpolate(tileSpring, [0, 1], [0.9, 1], clamp)})`,
            }}
          >
            <FrozenVideoFrame asset={asset} />
          </div>
        );
      })}
      {label ? (
        <div
          style={{
            position: 'absolute',
            left: 80,
            right: 80,
            top: 720,
            textAlign: 'center',
            color: '#fff',
            fontFamily: 'Arial Black, Impact, PingFang SC, sans-serif',
            fontSize: 92,
            textShadow: '0 14px 42px rgba(0,0,0,.72)',
            transform: `scale(${0.84 + pop * 0.16})`,
          }}
        >
          {label}
        </div>
      ) : null}
    </AbsoluteFill>
  );
};

const ShotLayer: React.FC<{shot: OddShot; index: number}> = ({shot, index}) => {
  const frame = useCurrentFrame();
  const local = frame - shot.from;
  const p = interpolate(local, [0, shot.duration], [0, 1], clamp);
  const enter = interpolate(local, [0, 7], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });
  const exit = interpolate(local, [shot.duration - 6, shot.duration], [1, 0.985], clamp);
  const beat = Math.max(0, 1 - (frame % 18) / 5);
  const base = shot.scale ?? 1.1;
  const move =
    shot.mode === 'push'
      ? interpolate(p, [0, 1], [0, 0.12])
      : shot.mode === 'pull'
        ? interpolate(p, [0, 1], [0.1, 0])
        : shot.mode === 'snap'
          ? interpolate(enter, [0, 1], [0.18, 0])
          : 0.025;
  const driftX = (index % 2 === 0 ? -1 : 1) * interpolate(p, [0, 1], [18, -18], clamp);
  const driftY = (index % 3 === 0 ? 1 : -1) * interpolate(p, [0, 1], [-8, 8], clamp);
  const shake = beat > 0.35 && local < 10 ? Math.sin(local * 3.1) * 4 : 0;
  const impactDarken = interpolate(local, [0, 3, 9], [0.5, 0.5, 1], clamp);
  const impactBlur = interpolate(local, [0, 3, 9], [4, 4, 0], clamp);
  const entranceBlur = (1 - enter) * 2.1;

  return (
    <Sequence from={shot.from} durationInFrames={shot.duration + 8} premountFor={25}>
      <AbsoluteFill style={{overflow: 'hidden', background: '#050505'}}>
        <Video
          src={staticFile(`clips/${shot.src}`)}
          muted
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: shot.position ?? 'center center',
            opacity: enter * exit,
            transform: `translate(${driftX + shake}px, ${driftY}px) rotate(${(shot.rotate ?? 0) + shake * 0.02}deg) scale(${base + move + beat * 0.012})`,
            transformOrigin: shot.position ? 'center 82%' : 'center center',
            filter: `brightness(${impactDarken}) contrast(1.22) saturate(.86) blur(${Math.max(impactBlur, entranceBlur)}px)`,
          }}
        />
      </AbsoluteFill>
    </Sequence>
  );
};

const OddWord: React.FC<(typeof words)[number]> = ({at, main, sub, color, x, y}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const local = frame - at;
  if (local < -2 || local > 38) return null;
  const pop = spring({
    frame: Math.max(0, local),
    fps,
    config: {mass: 0.5, damping: 12, stiffness: 150},
  });
  const scale = interpolate(pop, [0, 0.72, 1], [0.3, 1.1, 1], clamp);
  const opacity = interpolate(local, [0, 4, 26, 38], [0, 1, 1, 0], clamp);
  const blur = interpolate(local, [0, 6, 28, 38], [8, 0, 0, 5], clamp);
  const wobble = local >= 0 && local < 8 ? Math.sin(local * 2.8) * 8 : 0;
  return (
    <div
      style={{
        position: 'absolute',
        left: 80,
        right: 80,
        top: 710 + y,
        color,
        opacity,
        textAlign: 'center',
        fontFamily: 'Arial Black, Impact, PingFang SC, sans-serif',
        textShadow: '0 14px 40px rgba(0,0,0,.72)',
        transform: `translate(${x + wobble}px, 0) scale(${scale}) rotate(${interpolate(pop, [0, 1], [-5, 0], clamp)}deg)`,
        filter: `blur(${blur}px) drop-shadow(0px 4px 12px rgba(0,0,0,0.8))`,
      }}
    >
      <div style={{fontSize: main.length > 5 ? 120 : 158, lineHeight: 0.82}}>{main}</div>
      {sub ? <div style={{fontSize: 58, color: '#fff', marginTop: 14, letterSpacing: 1}}>{sub}</div> : null}
    </div>
  );
};

const CutImpact: React.FC = () => {
  const frame = useCurrentFrame();
  const nearest = cutFrames.reduce((best, cut) => Math.min(best, Math.abs(frame - cut)), 999);
  const hit = Math.max(0, 1 - nearest / 5);
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: interpolate(hit, [0, 1], [0, 0.3], clamp),
          background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,.28) 0%, transparent 34%, rgba(0,0,0,.4) 100%)',
          mixBlendMode: 'screen',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: interpolate(hit, [0, 1], [0, 0.5], clamp),
          border: '4px solid rgba(255,255,255,.55)',
          transform: `scale(${interpolate(hit, [0, 1], [1.04, 1])})`,
        }}
      />
    </AbsoluteFill>
  );
};

const OddGrade: React.FC = () => {
  const frame = useCurrentFrame();
  const x = random(`odd-grain-x-${frame}`) * 80;
  const y = random(`odd-grain-y-${frame}`) * 80;
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(0,0,0,.18), transparent 24%, transparent 68%, rgba(0,0,0,.42)), radial-gradient(circle at 50% 42%, transparent 42%, rgba(0,0,0,.64) 100%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.08,
          mixBlendMode: 'overlay',
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(255,255,255,.2) 0px, rgba(255,255,255,.2) 1px, transparent 1px, transparent 4px)',
          backgroundPosition: `${x}px ${y}px`,
        }}
      />
    </AbsoluteFill>
  );
};

const OpeningMark: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 10, 35, 46], [0, 1, 1, 0], clamp);
  return (
    <div
      style={{
        position: 'absolute',
        left: 54,
        top: 78,
        color: 'white',
        opacity,
        fontFamily: 'Arial Black, PingFang SC, sans-serif',
        textShadow: '0 10px 34px rgba(0,0,0,.75)',
      }}
    >
      <div style={{fontSize: 44, letterSpacing: 2}}>ODD CUT</div>
      <div style={{fontSize: 24, marginTop: 8, opacity: 0.72}}>NIGHT / SWEET / PUSH</div>
    </div>
  );
};

export const OddBeatCut: React.FC = () => {
  return (
    <AbsoluteFill style={{background: '#050505'}}>
      {shots.map((shot, index) => (
        <ShotLayer key={`${shot.src}-${shot.from}`} shot={shot} index={index} />
      ))}
      <FrozenFrameGrid />
      <OddGrade />
      <CutImpact />
      <OpeningMark />
      {words.map((word) => (
        <OddWord key={`${word.main}-${word.at}`} {...word} />
      ))}
      <FrozenBurst
        at={258}
        label="DO"
        assets={[
          {src: '09-dessert.mp4', freezeAtFrame: 24, position: 'center 82%', scale: 1.56},
          {src: '11-close.mp4', freezeAtFrame: 42, position: 'center 84%', scale: 1.7},
          {src: '04-queue.mp4', freezeAtFrame: 18, position: 'center 62%', scale: 1.16},
        ]}
      />
      <FrozenBurst
        at={500}
        label="CRAZY"
        assets={[
          {src: '13-chocolate-reveal.mp4', freezeAtFrame: 30, position: 'center 82%', scale: 1.62},
          {src: '15-chocolate-ending.mp4', freezeAtFrame: 22, position: 'center 84%', scale: 1.7},
          {src: '03-store.mp4', freezeAtFrame: 14, scale: 1.12},
        ]}
      />
      <Audio
        src={staticFile('reference-audio.m4a')}
        volume={(frame) => interpolate(frame, [0, 18, ODD_BEAT_FRAMES - 24, ODD_BEAT_FRAMES], [0, 1, 1, 0], clamp)}
      />
    </AbsoluteFill>
  );
};
