# Remotion 剪辑工程与 Codex Skill 分享包

这个仓库用于分享 3 套 Remotion 视频工程和对应的 Codex 剪辑 skill。

为保护原始素材隐私，仓库里没有包含我的视频、音频、图片原素材，也没有包含已经导出的成片预览。别人拿到后，需要放入自己的素材再运行工程。

## 包含内容

```text
projects/
  douyin-anime-remotion/        动漫卡点剪辑工程
  daily-vlog-remotion/          日常 Vlog / 探店剪辑工程
  citywalk-collage-remotion/    ODD 卡点 / 抽帧拼接工程

skills/
  remotion-anime-beat-cut/      动漫卡点 skill
  remotion-daily-vlog/          日常 Vlog skill
  remotion-odd-beat-cut/        ODD 卡点 skill

zips/
  三个不含原素材的 clean 压缩包
```

## 不包含内容

仓库刻意排除了这些内容：

- `public/` 原始视频、音频、照片素材
- `renders/` 导出的成片和预览图
- `node_modules/`
- 任何 `.mp4`、`.mp3`、`.m4a`、`.jpg`、`.png` 等媒体文件

每个工程里都有 `PUBLIC_ASSETS_REQUIRED.md`，里面写了需要自己补哪些素材文件名。

## 三套工程怎么选

### 1. 动漫卡点

路径：

```text
projects/douyin-anime-remotion
```

适合：

- 动漫二创
- AMV 风格
- 音乐卡点
- 大字冲击字幕
- 快切、闪白、缩放、冻结帧

对应 skill：

```text
skills/remotion-anime-beat-cut
```

### 2. 日常 Vlog / 探店

路径：

```text
projects/daily-vlog-remotion
```

适合：

- 日常记录
- citywalk
- 探店
- 食物记录
- 温和节奏、生活感字幕、自然转场

对应 skill：

```text
skills/remotion-daily-vlog
```

### 3. ODD 卡点 / 抽帧拼接

路径：

```text
projects/citywalk-collage-remotion
```

适合：

- ODD 卡点
- 多图层快闪
- 抽帧拼接
- 冻结帧卡片爆点
- 暗调电影感
- 英文大字 spring 弹出

对应 skill：

```text
skills/remotion-odd-beat-cut
```

## 如何运行工程

进入任意一个工程目录：

```bash
cd projects/citywalk-collage-remotion
npm install
npm run dev
```

然后按该工程的 `PUBLIC_ASSETS_REQUIRED.md` 放入自己的素材。

导出视频：

```bash
npm run render
```

不同工程的素材文件名不同，先看对应工程的 `PUBLIC_ASSETS_REQUIRED.md`。

## 如何安装 skill

把 `skills/` 里的某个 skill 文件夹复制到自己的 Codex skill 目录：

```text
~/.codex/skills/
```

例如：

```text
~/.codex/skills/remotion-odd-beat-cut
```

之后就可以在 Codex 里这样调用：

```text
使用 $remotion-odd-beat-cut 帮我剪一个 ODD 卡点视频
```

## 分享说明

如果只想分享某一种风格，可以直接发 `zips/` 里的 clean 包：

```text
anime-remotion-skill-project-clean.zip
daily-vlog-remotion-skill-project-clean.zip
odd-beat-cut-remotion-skill-project-clean.zip
```

这些压缩包同样不包含原素材，适合发给别人学习工程结构和 skill 写法。
