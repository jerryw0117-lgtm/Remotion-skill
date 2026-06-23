---
name: remotion-odd-beat-cut
description: Create ODD-style beat-cut videos in Remotion using dark cinematic grading, fast music-synced cuts, spring impact text, code-driven frozen video frames, multi-layer grid/collage walls, white flash transitions, background dark-blur impact, and social short-video pacing. Use when the user asks for ODD卡点, 抽帧拼接, 多图层快闪, 冻结帧卡点, or high-impact Douyin-style beat videos.
---

# Remotion ODD Beat Cut

Use this skill for ODD卡点 / 抽帧拼接 / 多图层快闪 videos. The style is full-screen finished video, not a recording of the editing software interface.

## Core Workflow

1. Use the reference audio as the beat source when provided.
2. Create a short high-density timeline:
   - fast scenes: 8-15 frames
   - medium scenes: 16-30 frames
   - ending hold: 40-80 frames
3. Use full-screen source footage as the base layer.
4. Add code-driven frozen frame grids or collage bursts on strong beats.
5. Add big center words as rhythm elements, not explanatory subtitles.
6. Render stills at key beats before the final export.

## Signature Effects

- Dark cinematic grade: lower brightness, higher contrast, lower saturation.
- Center impact text:
  - font: Impact / Arial Black
  - use `spring()` scale
  - heavy drop shadow
  - short English words: `SO`, `WHAT`, `DO`, `CRAZY`, `THIS`
- Background impact:
  - first 3 frames of a scene use `brightness(0.5) blur(4px)`
  - restore quickly with `interpolate()`
- Frozen frame grid:
  - mix dynamic video cells and frozen cells
  - white borders and shadows
  - slight spring scale from 0.9 to 1
- Flash transitions:
  - 2-4 frames only
  - avoid long bright flashes that make the edit dizzy

## Frozen Frame Pattern

Prefer this robust pattern:

```tsx
const video = (
  <Video
    src={staticFile(src)}
    muted
    trimBefore={freezeAtFrame}
    playbackRate={1}
    style={{width: '100%', height: '100%', objectFit: 'cover'}}
  />
);

return <Freeze frame={0}>{video}</Freeze>;
```

`playbackRate={0}` may fail in some Remotion versions. `trimBefore + Freeze` gives the same code-driven frame capture effect without pre-exporting images.

## Delivery

Deliver:

- Final MP4.
- Preview/contact image.
- Project path.
- Notes on which beats use frozen grids, spring text, and background impact.
