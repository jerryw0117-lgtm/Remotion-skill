import React from 'react';
import {Audio, Video} from '@remotion/media';
import {
  AbsoluteFill,
  Easing,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
} from 'remotion';

export const EDITOR_RECREATION_FRAMES = 602;

type Shot = {
  src: string;
  from: number;
  duration: number;
  position?: string;
  scale?: number;
};

const shots: Shot[] = [
  {src: '02-street.mp4', from: 0, duration: 42},
  {src: '02-approach.mp4', from: 42, duration: 34},
  {src: '03-store.mp4', from: 76, duration: 34},
  {src: '04-queue.mp4', from: 110, duration: 38},
  {src: '05-inside.mp4', from: 148, duration: 34},
  {src: '03-store.mp4', from: 182, duration: 32},
  {src: '09-dessert.mp4', from: 214, duration: 44, position: 'center 82%', scale: 1.48},
  {src: '11-close.mp4', from: 258, duration: 34, position: 'center 84%', scale: 1.56},
  {src: '13-chocolate-reveal.mp4', from: 292, duration: 46, position: 'center 82%', scale: 1.52},
  {src: '02-street.mp4', from: 338, duration: 36},
  {src: '03-store.mp4', from: 374, duration: 34},
  {src: '09-dessert.mp4', from: 408, duration: 40, position: 'center 82%', scale: 1.52},
  {src: '11-close.mp4', from: 448, duration: 34, position: 'center 84%', scale: 1.62},
  {src: '13-chocolate-reveal.mp4', from: 482, duration: 42, position: 'center 82%', scale: 1.58},
  {src: '15-chocolate-ending.mp4', from: 524, duration: 78, position: 'center 84%', scale: 1.62},
];

const wordHits = [
  {from: 42, text: 'SO', sub: 'TELL ME', color: '#ff8a2a'},
  {from: 86, text: 'BABE', sub: "WHAT'S", color: '#ffffff'},
  {from: 130, text: 'I NOW', sub: '', color: '#ff3b5c'},
  {from: 168, text: 'WHAT', sub: 'YOU', color: '#ffffff'},
  {from: 210, text: 'MEAN', sub: '', color: '#ffffff'},
  {from: 264, text: 'DO', sub: '', color: '#ff8a2a'},
  {from: 330, text: 'YOU', sub: '', color: '#ffffff'},
  {from: 382, text: 'EVEN', sub: '', color: '#ffffff'},
  {from: 432, text: "I'M", sub: 'WITH', color: '#ffffff'},
  {from: 506, text: 'CRAZY', sub: 'OVER YOU', color: '#ffffff'},
  {from: 558, text: 'THIS', sub: '', color: '#ffffff'},
];

const clamp = {
  extrapolateLeft: 'clamp' as const,
  extrapolateRight: 'clamp' as const,
};

const activeShot = (frame: number) =>
  shots.find((shot) => frame >= shot.from && frame < shot.from + shot.duration) ?? shots[0];

const PreviewShot: React.FC<{shot: Shot; index: number}> = ({shot, index}) => {
  const frame = useCurrentFrame();
  const local = frame - shot.from;
  const enter = interpolate(local, [0, 8], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });
  const exit = interpolate(local, [shot.duration - 7, shot.duration], [1, 0.96], clamp);
  const beat = Math.max(0, 1 - (frame % 18) / 6);
  const push = interpolate(beat, [0, 1], [0, 0.018], clamp);
  const drift = (index % 2 === 0 ? 1 : -1) * interpolate(local, [0, shot.duration], [-10, 10], clamp);

  return (
    <Sequence from={shot.from} durationInFrames={shot.duration + 8} premountFor={15}>
      <AbsoluteFill style={{overflow: 'hidden', background: '#0e0e0e'}}>
        <Video
          src={staticFile(`clips/${shot.src}`)}
          muted
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: shot.position ?? 'center center',
            opacity: enter * exit,
            transform: `translateX(${drift}px) scale(${(shot.scale ?? 1.08) + push})`,
            transformOrigin: shot.position ? 'center 82%' : 'center center',
            filter: `contrast(1.08) saturate(${1.03 + beat * 0.08}) blur(${(1 - enter) * 1.3}px)`,
          }}
        />
      </AbsoluteFill>
    </Sequence>
  );
};

const WordHit: React.FC<(typeof wordHits)[number]> = ({from, text, sub, color}) => {
  const frame = useCurrentFrame();
  const local = frame - from;
  const pop = interpolate(local, [0, 7], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
  });
  const opacity = interpolate(local, [0, 5, 28, 38], [0, 1, 1, 0], clamp);
  const shake = local > 0 && local < 9 ? Math.sin(local * 2.7) * 5 : 0;
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: sub ? 335 : 405,
        textAlign: 'center',
        opacity,
        transform: `translateX(${shake}px) scale(${0.72 + pop * 0.28}) rotate(${interpolate(pop, [0, 1], [-4, 0])}deg)`,
        fontFamily: 'Arial Black, Impact, PingFang SC, sans-serif',
        color,
        textShadow: '0 10px 34px rgba(0,0,0,0.72)',
      }}
    >
      <div style={{fontSize: text.length > 5 ? 92 : 126, lineHeight: 0.82}}>{text}</div>
      {sub ? <div style={{fontSize: 48, color: '#fff', marginTop: 10}}>{sub}</div> : null}
    </div>
  );
};

const EditorChrome: React.FC = () => {
  const frame = useCurrentFrame();
  const current = activeShot(frame);
  return (
    <AbsoluteFill style={{background: '#151515', color: '#d7d7d7', fontFamily: 'Arial, PingFang SC, sans-serif'}}>
      <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg,#191919 0%,#101010 100%)'}} />
      <div style={{position: 'absolute', left: 0, top: 0, right: 0, height: 78, background: '#202020', borderBottom: '1px solid #303030'}} />
      <div style={{position: 'absolute', left: 22, top: 22, fontSize: 24, fontWeight: 700}}>复刻工程 09:53</div>
      <div style={{position: 'absolute', right: 34, top: 22, fontSize: 22, opacity: 0.72}}>AUTO CUT · 60FPS SOURCE · AUDIO LOCKED</div>

      <div style={{position: 'absolute', left: 22, top: 96, width: 168, bottom: 744, background: '#1e1e1e', borderRight: '1px solid #2c2c2c'}}>
        {shots.slice(0, 7).map((shot, i) => (
          <div
            key={`${shot.src}-${i}`}
            style={{
              margin: '14px auto',
              width: 116,
              height: 154,
              border: shot.src === current.src ? '3px solid #00e5d4' : '2px solid #393939',
              background: '#2a2a2a',
              overflow: 'hidden',
            }}
          >
            <Video
              src={staticFile(`clips/${shot.src}`)}
              muted
              style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: shot.position ?? 'center center'}}
            />
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

const PreviewWindow: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        position: 'absolute',
        left: 230,
        top: 118,
        width: 790,
        height: 960,
        background: '#050505',
        border: '1px solid #353535',
        boxShadow: '0 28px 70px rgba(0,0,0,0.55)',
        overflow: 'hidden',
      }}
    >
      {shots.map((shot, index) => (
        <PreviewShot key={`${shot.src}-${shot.from}`} shot={shot} index={index} />
      ))}
      <div style={{position: 'absolute', inset: 0, boxShadow: 'inset 0 0 0 2px rgba(255,255,255,0.08), inset 0 0 80px rgba(0,0,0,0.36)'}} />
      {wordHits.map((hit) => (
        <WordHit key={`${hit.text}-${hit.from}`} {...hit} />
      ))}
      <div
        style={{
          position: 'absolute',
          right: 22,
          bottom: 22,
          padding: '8px 12px',
          background: 'rgba(0,0,0,0.52)',
          color: 'rgba(255,255,255,0.82)',
          fontSize: 22,
          letterSpacing: 1,
        }}
      >
        CUT {String(shots.findIndex((shot) => frame >= shot.from && frame < shot.from + shot.duration) + 1).padStart(2, '0')}
      </div>
    </div>
  );
};

const Timeline: React.FC = () => {
  const frame = useCurrentFrame();
  const left = 72;
  const top = 1164;
  const width = 958;
  const progress = frame / EDITOR_RECREATION_FRAMES;
  const playhead = left + width * progress;
  const trackColors = ['#29c9e8', '#fb4e69', '#fb4e69', '#12d18e', '#5a7cff'];

  return (
    <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 720, background: '#1b1b1b', borderTop: '1px solid #303030'}}>
      <div style={{position: 'absolute', left: 30, top: 24, fontSize: 22, opacity: 0.76}}>时间线 01</div>
      <div style={{position: 'absolute', left, top: 62, width, height: 32}}>
        {Array.from({length: 12}).map((_, i) => (
          <div key={i} style={{position: 'absolute', left: (i / 11) * width, top: 0, height: 28, borderLeft: '1px solid #555', color: '#777', fontSize: 17, paddingLeft: 7}}>
            {i % 3 === 0 ? `00:${String(i * 2).padStart(2, '0')}` : ''}
          </div>
        ))}
      </div>

      {shots.map((shot, i) => {
        const x = left + (shot.from / EDITOR_RECREATION_FRAMES) * width;
        const w = Math.max(30, (shot.duration / EDITOR_RECREATION_FRAMES) * width);
        return (
          <div
            key={`${shot.src}-timeline-${i}`}
            style={{
              position: 'absolute',
              left: x,
              top: top - 1038,
              width: w,
              height: 76,
              background: '#1ca8c9',
              border: '1px solid #65e8ff',
              overflow: 'hidden',
            }}
          >
            <div style={{fontSize: 13, padding: '7px 8px', color: 'white', whiteSpace: 'nowrap'}}>{shot.src.replace('.mp4', '')}</div>
            <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 22, background: 'repeating-linear-gradient(90deg, rgba(255,255,255,.28) 0 5px, transparent 5px 11px)'}} />
          </div>
        );
      })}

      {trackColors.map((color, row) =>
        Array.from({length: row === 0 ? 14 : 10}).map((_, i) => {
          const seed = (i * 47 + row * 29) % 100;
          const x = left + ((seed / 100) * 0.92) * width;
          const w = 34 + ((seed * 7) % 78);
          return (
            <div
              key={`${row}-${i}`}
              style={{
                position: 'absolute',
                left: x,
                top: 236 + row * 82,
                width: w,
                height: row === 0 ? 42 : 30,
                background: color,
                borderRadius: 4,
                opacity: row === 0 ? 0.72 : 0.95,
              }}
            />
          );
        }),
      )}

      <div style={{position: 'absolute', left, right: 50, top: 582, height: 84, background: '#083a45', border: '1px solid #1dc8e9'}}>
        {Array.from({length: 95}).map((_, i) => {
          const h = 8 + ((i * 37) % 58);
          return <div key={i} style={{position: 'absolute', left: i * 10, bottom: 8, width: 5, height: h, background: '#1ee8ff', opacity: 0.75}} />;
        })}
      </div>

      <div style={{position: 'absolute', left: playhead, top: 82, bottom: 32, width: 3, background: '#f4f4f4', boxShadow: '0 0 18px rgba(255,255,255,0.9)'}} />
      <div style={{position: 'absolute', left: playhead - 13, top: 72, width: 29, height: 29, background: '#f4f4f4', clipPath: 'polygon(50% 100%,0 0,100% 0)'}} />
    </div>
  );
};

const TopComments: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [470, 492, 578, 602], [0, 1, 1, 0], clamp);
  return (
    <div
      style={{
        position: 'absolute',
        left: 64,
        right: 64,
        top: 86,
        opacity,
        color: 'white',
        fontFamily: 'Arial Black, PingFang SC, sans-serif',
        textShadow: '0 12px 40px rgba(0,0,0,.7)',
      }}
    >
      <div style={{fontSize: 70, lineHeight: 0.94}}>一条视频</div>
      <div style={{fontSize: 70, lineHeight: 0.94}}>拆成了满屏轨道</div>
    </div>
  );
};

export const EditorRecreation: React.FC = () => {
  return (
    <AbsoluteFill style={{background: '#101010'}}>
      <EditorChrome />
      <PreviewWindow />
      <Timeline />
      <TopComments />
      <Audio
        src={staticFile('reference-audio.m4a')}
        volume={(frame) => interpolate(frame, [0, 20, EDITOR_RECREATION_FRAMES - 24, EDITOR_RECREATION_FRAMES], [0, 1, 1, 0], clamp)}
      />
    </AbsoluteFill>
  );
};
