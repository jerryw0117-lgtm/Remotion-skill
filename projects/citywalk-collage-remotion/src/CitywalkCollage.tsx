import React from 'react';
import {Audio, Video} from '@remotion/media';
import {
  AbsoluteFill,
  Easing,
  Img,
  Series,
  random,
  interpolate,
  staticFile,
  useCurrentFrame,
} from 'remotion';

type Edit = {
  src: string;
  frames: number;
  position?: string;
  cropScale?: number;
};

const edits: Edit[] = [
  {src: '02-street.mp4', frames: 60},
  {src: '02-approach.mp4', frames: 60},
  {src: '03-store.mp4', frames: 40},
  {src: '04-queue.mp4', frames: 40},
  {src: '05-inside.mp4', frames: 50},
  {src: '03-store.mp4', frames: 40},
  {src: '04-queue.mp4', frames: 40},
  {src: '09-dessert.mp4', frames: 60, position: 'center 82%', cropScale: 1.65},
  {src: '11-close.mp4', frames: 50, position: 'center 84%', cropScale: 1.65},
  {src: '09-dessert.mp4', frames: 40, position: 'center 82%', cropScale: 1.65},
  {src: '13-chocolate-reveal.mp4', frames: 70, position: 'center 82%', cropScale: 1.65},
  {src: '11-close.mp4', frames: 40, position: 'center 84%', cropScale: 1.65},
  {src: '13-chocolate-reveal.mp4', frames: 50, position: 'center 82%', cropScale: 1.65},
  {src: '02-street.mp4', frames: 60},
  {src: '15-chocolate-ending.mp4', frames: 80, position: 'center 84%', cropScale: 1.65},
];

export const TOTAL_FRAMES = edits.reduce((sum, edit) => sum + edit.frames, 0);

const photoFiles = [
  'photos/photo-01.jpg',
  'photos/photo-02.jpg',
  'photos/photo-03.jpg',
  'photos/crop-dessert.jpg',
  'photos/crop-dessert-close.jpg',
  'photos/crop-chocolate.jpg',
  'photos/crop-chocolate-close.jpg',
  'photos/photo-14.jpg',
];

const clamp = {
  extrapolateLeft: 'clamp' as const,
  extrapolateRight: 'clamp' as const,
};

const Footage: React.FC<{edit: Edit; index: number}> = ({edit, index}) => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, edit.frames], [1.005, 1.045], clamp);
  const enter = interpolate(frame, [0, 9], [1, 0], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });
  const exit = interpolate(frame, [edit.frames - 8, edit.frames], [0, 1], {
    ...clamp,
    easing: Easing.in(Easing.cubic),
  });
  const transition = Math.max(enter, exit);
  const direction = index % 2 === 0 ? -1 : 1;
  const drift = direction * (enter * -10 + exit * 8);
  const beat = Math.max(0, 1 - (frame % 20) / 6);
  const beatPush = interpolate(beat, [0, 1], [0, 0.008], clamp);
  const rotate = direction * transition * 0.18;
  return (
    <AbsoluteFill style={{backgroundColor: '#101010', overflow: 'hidden'}}>
      <Video
        src={staticFile(`clips/${edit.src}`)}
        objectFit="cover"
        muted
        style={{
          width: '100%',
          height: '100%',
          objectPosition: edit.position ?? 'center center',
          transform: `translateX(${drift}px) rotate(${rotate}deg) scale(${(zoom + beatPush + transition * 0.012) * (edit.cropScale ?? 1)})`,
          transformOrigin: edit.cropScale ? 'center 82%' : 'center center',
          opacity: interpolate(frame, [0, 5, edit.frames - 5, edit.frames], [0.97, 1, 1, 0.98], clamp),
          filter: `blur(${transition * 1.2}px) saturate(${1.02 + beat * 0.05}) contrast(1.08) brightness(1.02)`,
        }}
      />
    </AbsoluteFill>
  );
};

const PhotoFan: React.FC = () => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [3, 30], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const fade = interpolate(frame, [34, 48], [1, 0], clamp);

  return (
    <AbsoluteFill style={{opacity: fade}}>
      {photoFiles.map((src, i) => {
        const angle = -150 + (300 * i) / (photoFiles.length - 1);
        const radius = interpolate(p, [0, 1], [0, 380]);
        return (
          <Img
            key={src}
            src={staticFile(src)}
            style={{
              position: 'absolute',
              left: '50%',
              top: '47%',
              width: 112,
              height: 154,
              objectFit: 'cover',
              border: '5px solid rgba(255,255,255,0.95)',
              boxShadow: '0 12px 28px rgba(0,0,0,0.4)',
              transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(${-radius}px) rotate(${-angle}deg) scale(${0.3 + p * 0.7})`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

const MusicCard: React.FC = () => {
  const frame = useCurrentFrame();
  const enter = interpolate(frame, [18, 32], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const leave = interpolate(frame, [62, 82], [1, 0], clamp);
  const progress = interpolate(frame, [22, 82], [0.05, 0.55], clamp);
  return (
    <div
      style={{
        position: 'absolute',
        left: 120,
        right: 120,
        bottom: 230,
        padding: '30px 34px',
        backgroundColor: 'rgba(16,16,16,0.82)',
        backdropFilter: 'blur(18px)',
        border: '1px solid rgba(255,255,255,0.35)',
        color: 'white',
        fontFamily: 'Arial, PingFang SC, sans-serif',
        opacity: enter * leave,
        transform: `translateY(${interpolate(enter, [0, 1], [80, 0])}px) rotate(-2deg)`,
      }}
    >
      <div style={{fontSize: 22, opacity: 0.65, marginBottom: 10}}>NOW PLAYING</div>
      <div style={{fontSize: 42, fontWeight: 700}}>BUILDING CONFIDENCE</div>
      <div style={{fontSize: 24, opacity: 0.72, marginTop: 8}}>90.7 BPM · NIGHT WALK</div>
      <div style={{height: 5, background: 'rgba(255,255,255,0.22)', marginTop: 24}}>
        <div style={{height: '100%', width: `${progress * 100}%`, background: '#ffcf52'}} />
      </div>
    </div>
  );
};

const BoldTitle: React.FC<{from: number; to: number; children: React.ReactNode}> = ({
  from,
  to,
  children,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [from, from + 5, to - 6, to], [0, 1, 1, 0], clamp);
  return (
    <div
      style={{
        position: 'absolute',
        left: 42,
        right: 42,
        top: 130,
        fontFamily: 'Arial Black, Arial, sans-serif',
        fontSize: 116,
        lineHeight: 0.88,
        color: 'transparent',
        WebkitTextStroke: '3px rgba(255,255,255,0.9)',
        opacity,
      }}
    >
      {children}
    </div>
  );
};

const KineticTag: React.FC<{
  from: number;
  to: number;
  text: string;
  sub?: string;
  align?: 'left' | 'right';
  bottom?: number;
}> = ({from, to, text, sub, align = 'left', bottom = 260}) => {
  const frame = useCurrentFrame();
  const enter = interpolate(frame, [from, from + 9], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const leave = interpolate(frame, [to - 8, to], [1, 0], clamp);
  const opacity = enter * leave;
  const x = interpolate(enter, [0, 1], [align === 'left' ? -90 : 90, 0]);
  const side = align === 'left' ? {left: 58} : {right: 58};
  return (
    <div
      style={{
        position: 'absolute',
        ...side,
        bottom,
        maxWidth: 760,
        color: 'white',
        fontFamily: 'Arial Black, PingFang SC, sans-serif',
        opacity,
        textAlign: align,
        transform: `translateX(${x}px) rotate(${align === 'left' ? -2 : 2}deg)`,
        textShadow: '0 12px 38px rgba(0,0,0,0.75)',
      }}
    >
      <div
        style={{
          display: 'inline-block',
          padding: '8px 18px',
          marginBottom: 12,
          color: '#101010',
          background: '#ffcf52',
          fontSize: 28,
          letterSpacing: 1,
        }}
      >
        {sub ?? 'CITYWALK'}
      </div>
      <div style={{fontSize: 76, lineHeight: 0.96}}>{text}</div>
    </div>
  );
};

const BeatPulse: React.FC = () => {
  const frame = useCurrentFrame();
  const beat = Math.max(0, 1 - (frame % 20) / 7);
  const opacity = interpolate(beat, [0, 1], [0, 0.28], clamp);
  const scale = interpolate(beat, [0, 1], [1.04, 1], clamp);
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <div
        style={{
          position: 'absolute',
          inset: 34,
          border: '2px solid rgba(255,207,82,0.72)',
          opacity,
          transform: `scale(${scale})`,
          boxShadow: 'inset 0 0 45px rgba(255,207,82,0.12)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: opacity * 0.5,
          background:
            'radial-gradient(circle at 50% 50%, transparent 48%, rgba(0,0,0,0.45) 100%)',
        }}
      />
    </AbsoluteFill>
  );
};

const SnapGrid: React.FC<{from: number; to: number; photos: string[]}> = ({from, to, photos}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [from, from + 6, to - 8, to], [0, 1, 1, 0], clamp);
  const p = interpolate(frame, [from, from + 14], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
  });
  return (
    <AbsoluteFill style={{opacity, pointerEvents: 'none'}}>
      {photos.map((src, i) => {
        const left = [76, 505, 254][i];
        const top = [230, 335, 610][i];
        const rot = [-7, 5, -2][i];
        const delay = i * 3;
        const local = interpolate(frame, [from + delay, from + 16 + delay], [0, 1], {
          ...clamp,
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        });
        return (
          <Img
            key={src}
            src={staticFile(src)}
            style={{
              position: 'absolute',
              left,
              top,
              width: i === 2 ? 560 : 440,
              height: i === 2 ? 430 : 560,
              objectFit: 'cover',
              objectPosition: 'center 78%',
              border: '8px solid white',
              boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
              transform: `translateY(${interpolate(local, [0, 1], [110, 0])}px) rotate(${rot}deg) scale(${0.82 + p * 0.18})`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

const CutTicker: React.FC = () => {
  const frame = useCurrentFrame();
  const cuts = [60, 120, 160, 200, 250, 290, 330, 390, 440, 480, 550, 590, 640, 700];
  const nearest = cuts.reduce((best, cut) => Math.min(best, Math.abs(frame - cut)), 999);
  const hit = Math.max(0, 1 - nearest / 5);
  return (
    <AbsoluteFill style={{pointerEvents: 'none', opacity: interpolate(hit, [0, 1], [0, 0.55], clamp)}}>
      <div
        style={{
          position: 'absolute',
          left: 44,
          right: 44,
          top: 86,
          height: 4,
          background: '#ffcf52',
          transform: `scaleX(${interpolate(hit, [0, 1], [0.15, 1])})`,
          transformOrigin: 'left center',
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: 44,
          top: 70,
          color: 'white',
          fontFamily: 'Arial Black, PingFang SC, sans-serif',
          fontSize: 26,
          letterSpacing: 2,
        }}
      >
        CUT {String(cuts.findIndex((cut) => Math.abs(frame - cut) === nearest) + 1).padStart(2, '0')}
      </div>
    </AbsoluteFill>
  );
};

const Grain: React.FC = () => {
  const frame = useCurrentFrame();
  const x = random(`grain-x-${frame}`) * 100;
  const y = random(`grain-y-${frame}`) * 100;
  return (
    <AbsoluteFill
      style={{
        pointerEvents: 'none',
        opacity: 0.09,
        mixBlendMode: 'overlay',
        backgroundImage:
          'repeating-linear-gradient(0deg, rgba(255,255,255,0.16) 0px, rgba(255,255,255,0.16) 1px, transparent 1px, transparent 4px)',
        backgroundPosition: `${x}px ${y}px`,
      }}
    />
  );
};

const QueueCard: React.FC = () => {
  const frame = useCurrentFrame();
  const local = frame - 150;
  const p = interpolate(local, [0, 10], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.34, 1.3, 0.64, 1),
  });
  return (
    <div
      style={{
        position: 'absolute',
        right: 70,
        top: 310,
        width: 430,
        padding: 15,
        background: 'white',
        boxShadow: '14px 18px 0 rgba(255,207,82,0.9)',
        transform: `translateX(${interpolate(p, [0, 1], [520, 0])}px) rotate(4deg)`,
        opacity: interpolate(frame, [150, 158, 190, 200], [0, 1, 1, 0], clamp),
      }}
    >
      <Img src={staticFile('photos/photo-03.jpg')} style={{width: '100%', display: 'block'}} />
      <div style={{fontFamily: 'Arial, PingFang SC, sans-serif', color: '#111', padding: '16px 8px 8px'}}>
        <div style={{fontSize: 22, letterSpacing: 2}}>ORDER 00212</div>
        <div style={{fontSize: 34, fontWeight: 700, marginTop: 5}}>今晚的快乐，已下单</div>
      </div>
    </div>
  );
};

const SoftMatchCut: React.FC<{at: number; direction?: 1 | -1}> = ({at, direction = 1}) => {
  const frame = useCurrentFrame();
  if (frame < at || frame >= at + 10) return null;
  const delta = frame - at;
  const progress = delta / 9;
  const opacity = interpolate(progress, [0, 0.5, 1], [0, 0.32, 0], clamp);
  const x = interpolate(progress, [0, 1], [-22 * direction, 22 * direction]);
  return (
    <AbsoluteFill style={{overflow: 'hidden', pointerEvents: 'none'}}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: opacity * 0.85,
          background: 'radial-gradient(circle at 50% 48%, transparent 40%, rgba(0,0,0,0.75) 100%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: '46%',
          width: '18%',
          opacity,
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,207,82,0.45) 50%, transparent 100%)',
          filter: 'blur(18px)',
          transform: `translateX(${x}vw) skewX(-8deg)`,
        }}
      />
    </AbsoluteFill>
  );
};

const DessertSticker: React.FC = () => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [570, 586], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.34, 1.5, 0.64, 1),
  });
  const opacity = interpolate(frame, [570, 578, 618, 635], [0, 1, 1, 0], clamp);
  return (
    <div
      style={{
        position: 'absolute',
        left: 90,
        top: 250,
        width: 640,
        height: 640,
        borderRadius: '50%',
        overflow: 'hidden',
        border: '12px solid white',
        boxShadow: '18px 22px 0 #ffcf52',
        opacity,
        transform: `rotate(-7deg) scale(${0.25 + p * 0.75})`,
      }}
    >
      <Img
        src={staticFile('photos/photo-11.jpg')}
        style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 74%'}}
      />
    </div>
  );
};

const EndTitle: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [718, 732, 755, 779], [0, 1, 1, 0], clamp);
  return (
    <div
      style={{
        position: 'absolute',
        left: 64,
        right: 64,
        bottom: 150,
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Arial Black, PingFang SC, sans-serif',
        textShadow: '0 4px 20px rgba(0,0,0,0.8)',
        opacity,
      }}
    >
      <div style={{fontSize: 72}}>今晚，甜一点</div>
      <div style={{fontSize: 23, marginTop: 12, letterSpacing: 5}}>06.19 · NIGHT WALK</div>
    </div>
  );
};

export const CitywalkCollage: React.FC = () => {
  return (
    <AbsoluteFill style={{backgroundColor: '#101010'}}>
      <Series>
        {edits.map((edit, i) => (
          <Series.Sequence key={`${edit.src}-${i}`} durationInFrames={edit.frames} premountFor={30}>
            <Footage edit={edit} index={i} />
          </Series.Sequence>
        ))}
      </Series>

      <Audio
        src={staticFile('music.mp3')}
        volume={(frame) => interpolate(frame, [0, 18, TOTAL_FRAMES - 36, TOTAL_FRAMES], [0, 0.38, 0.38, 0], clamp)}
      />
      <PhotoFan />
      <MusicCard />
      <BeatPulse />
      <CutTicker />
      <BoldTitle from={88} to={146}>NIGHT<br />WALK</BoldTitle>
      <KineticTag from={34} to={74} text="先把夜色推近" sub="HOOK" bottom={520} />
      <QueueCard />
      <KineticTag from={246} to={294} text="拐进甜品店" sub="FOUND" align="right" />
      <SoftMatchCut at={286} direction={1} />
      <SoftMatchCut at={386} direction={-1} />
      <SnapGrid from={474} to={536} photos={['photos/crop-dessert.jpg', 'photos/crop-dessert-close.jpg', 'photos/crop-chocolate.jpg']} />
      <SoftMatchCut at={546} direction={1} />
      <KineticTag from={554} to={620} text="生巧冰上桌" sub="SWEET HIT" />
      <DessertSticker />
      <EndTitle />
      <Grain />
    </AbsoluteFill>
  );
};
