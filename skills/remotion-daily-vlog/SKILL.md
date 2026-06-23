---
name: remotion-daily-vlog
description: Create daily vlog, citywalk, food diary, cafe, lifestyle, and travel record videos in Remotion from casual phone or DJI footage, using highlight selection, gentle rhythm, tasteful captions, natural sequencing, music ducking, and clean social-video packaging. Use when the user asks for 日常vlog, 探店, citywalk, food diary, or everyday记录剪辑.
---

# Remotion Daily Vlog

Use this skill for 日常记录 / citywalk / 探店 / 食物 / 生活碎片 videos. The result should feel watchable, warm, and edited, without turning into a loud effects demo.

## Core Workflow

1. Inspect every source clip and reject unusable parts:
   - accidental floor/ceiling shots
   - blocked faces
   - refocus tails
   - repeated takes
   - awkward endings
2. Build a simple story:
   - arrival or establishing shot
   - location/sign/details
   - food/object/action
   - small human gesture without relying on front faces
   - emotional close
3. Choose music based on mood:
   - soft citywalk: 80-100 BPM
   - food/lifestyle: warm groove, light Latin, lo-fi, jazz-pop
   - night vlog: darker, slower, atmospheric
4. Keep text short and natural. One line is best.

## Editing Rules

- Use mostly natural footage with a few designed overlays.
- Mix 0.7-1.4s cuts with 1.8-2.8s breath shots.
- Avoid explaining obvious things. Write captions like a person would post.
- Keep original sound only if it helps: street, spoon, cafe, crowd. Duck it under music.
- Avoid front faces when requested: crop lower, use hands, food, signs, backs, silhouettes.

## Remotion Patterns

- Use `Video` with `objectFit: cover` and careful `objectPosition`.
- Use slow push/pull transforms instead of flashy transitions.
- Use `Series` for the main timeline and `Sequence` for captions/cards.
- Render stills around text and faces to check crop safety.
- Default output: 1080x1920, 30fps, H.264/AAC.

## Delivery

Deliver:

- Final MP4.
- A preview/contact image.
- Project path.
- A short cue sheet with source ranges and caption choices.
