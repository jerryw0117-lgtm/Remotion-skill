# Remotion Share Clean Package

This package intentionally excludes the creator's original media assets and rendered previews.

Included:

- Remotion project source code
- package/tsconfig/remotion config files
- reusable Codex skills
- asset placeholder notes

Excluded:

- `public/` source footage, music, and photos
- `renders/` generated videos and preview frames
- `node_modules/`

Recipients should add their own media files following each project's `PUBLIC_ASSETS_REQUIRED.md`, then run:

```bash
npm install
npm run dev
```
