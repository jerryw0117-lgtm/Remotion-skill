# Public Assets Required

Original source media is intentionally not included in this share package.

Create these folders:

```text
public/clips/
public/photos/
```

Then add your own replacement media with the filenames referenced by the compositions, for example:

```text
public/clips/02-approach.mp4
public/clips/02-street.mp4
public/clips/03-store.mp4
public/clips/04-queue.mp4
public/clips/05-inside.mp4
public/clips/06-waiting.mp4
public/clips/07-tease.mp4
public/clips/08-play.mp4
public/clips/09-dessert.mp4
public/clips/10-taste.mp4
public/clips/11-close.mp4
public/clips/13-chocolate-reveal.mp4
public/clips/14-chocolate-taste.mp4
public/clips/15-chocolate-ending.mp4
public/music.mp3
public/reference-audio.m4a
```

Some compositions also reference photo stills:

```text
public/photos/photo-01.jpg
public/photos/photo-02.jpg
...
public/photos/photo-14.jpg
public/photos/crop-dessert.jpg
public/photos/crop-dessert-close.jpg
public/photos/crop-chocolate.jpg
public/photos/crop-chocolate-close.jpg
```

After adding assets:

```bash
npm install
npm run dev
```
