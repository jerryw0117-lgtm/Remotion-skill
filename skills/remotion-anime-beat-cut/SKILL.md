---
name: remotion-anime-beat-cut
description: Create Douyin-style anime remix videos in Remotion from anime clips and music, using fast beat cuts, impact subtitles, zoom punches, freeze frames, flashes, motion blur, and short emotional or action-led captions. Use when the user asks for anime二创, 动漫卡点, AMV-style edits, or music-synced anime shorts.
---

# Remotion Anime Beat Cut

Use this skill for anime二创 / AMV / 抖音动漫卡点 videos. The output should feel like a short social edit, not a linear recap.

## Core Workflow

1. Inspect the source clip and audio before editing.
2. Pick 8-20 short moments: eyes, face turns, attack motions, emotional pauses, scene reveals, high-motion frames.
3. Build the rhythm first:
   - Dense beats: 8-15 frames.
   - Normal cuts: 12-24 frames.
   - Breath shots: 30-54 frames.
4. Use Remotion for deterministic timing:
   - `Series` for sequential beat shots.
   - `Sequence` for overlays, flashes, frozen frames, and impact text.
   - `Video` with `muted` unless the source audio is intentionally used.
5. Render 3-5 stills before final export: opening, first impact word, middle cut, climax, ending.

## Visual Style

- Big center text is allowed, but keep it short: 1-3 words.
- Use `spring()` for impact text scale, not static opacity only.
- Use quick white flash only on strong beats, usually 2-4 frames.
- Use zoom punch, motion blur, shake, and speed-ramp simulation around action peaks.
- Freeze-frame cutouts work well for anime: pause a dramatic frame, scale it, add outline or shadow, then cut back to motion.
- Keep captions emotional and viewer-facing. Avoid explaining the editing mechanics on screen.

## Remotion Patterns

- Prefer `trimBefore` to choose the source range.
- For code-driven freeze frames, use `trimBefore` to seek and wrap the video in `<Freeze frame={0}>`.
- Normalize final audio around social-video loudness; avoid clipping.
- Default output: 1080x1920, 30fps, H.264/AAC.

## Delivery

Deliver:

- Rendered MP4.
- Preview still/contact sheet.
- Project path.
- Short note listing music source, source clip, and key effects.
