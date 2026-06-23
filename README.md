# Remotion 剪辑工程与 Codex Skill 分享包

这个仓库整理了 3 套 Remotion 视频工程和 3 个对应的 Codex 剪辑 skill。  
使用方如果也是用 Codex，可以直接把工程和 skill 交给 Codex 学习，然后用对应 skill 发起剪辑任务。

## 目录结构

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
  三个按风格拆好的工程 + skill 压缩包
```

## 推荐使用方式

### 1. 克隆仓库

```bash
git clone https://github.com/jerryw0117-lgtm/Remotion-skill.git
cd Remotion-skill
```

### 2. 让 Codex 学习对应工程和 skill

把你要使用的工程目录和 skill 目录告诉 Codex，例如：

```text
请学习这个 Remotion 工程：
projects/citywalk-collage-remotion

并学习这个 skill：
skills/remotion-odd-beat-cut

后续我会给你素材，请按这个 ODD 卡点风格帮我剪。
```

也可以直接给 Codex 说：

```text
请使用 projects/citywalk-collage-remotion 作为参考工程，
并使用 skills/remotion-odd-beat-cut 这个 skill，
帮我制作一个 ODD 卡点视频。
```

### 3. 安装 skill 到 Codex

如果想长期复用，把 skill 文件夹复制到本机 Codex skill 目录：

```bash
mkdir -p ~/.codex/skills
cp -R skills/remotion-odd-beat-cut ~/.codex/skills/
cp -R skills/remotion-daily-vlog ~/.codex/skills/
cp -R skills/remotion-anime-beat-cut ~/.codex/skills/
```

之后就可以在 Codex 里直接这样调用：

```text
使用 $remotion-odd-beat-cut 帮我剪一个 ODD 卡点视频。
```

```text
使用 $remotion-daily-vlog 帮我剪一个日常探店 vlog。
```

```text
使用 $remotion-anime-beat-cut 帮我剪一个动漫二创卡点视频。
```

## 三套风格怎么选

### 动漫卡点

工程：

```text
projects/douyin-anime-remotion
```

skill：

```text
skills/remotion-anime-beat-cut
```

适合：

- 动漫二创
- AMV 风格
- 音乐卡点
- 快切、闪白、缩放、冻结帧
- 大字冲击字幕

### 日常 Vlog / 探店

工程：

```text
projects/daily-vlog-remotion
```

skill：

```text
skills/remotion-daily-vlog
```

适合：

- 日常记录
- citywalk
- 探店
- 食物记录
- 温和节奏
- 生活感字幕

### ODD 卡点 / 抽帧拼接

工程：

```text
projects/citywalk-collage-remotion
```

skill：

```text
skills/remotion-odd-beat-cut
```

适合：

- ODD 卡点
- 多图层快闪
- 抽帧拼接
- 冻结帧卡片爆点
- 暗调电影感
- 英文大字 spring 弹出

## 运行 Remotion 工程

进入任意工程目录：

```bash
cd projects/citywalk-collage-remotion
npm install
npm run dev
```

工程中有 `PUBLIC_ASSETS_REQUIRED.md`，里面列出了需要放入的素材文件名。  
你可以把自己的视频、音频素材交给 Codex，让 Codex 按工程需要放入对应位置并修改代码。

导出视频：

```bash
npm run render
```

## 给 Codex 的调用示例

```text
使用 $remotion-odd-beat-cut。
我会提供几段城市夜景和甜品视频，请参考 projects/citywalk-collage-remotion 的工程结构，
帮我剪一个 20 秒左右的 ODD 卡点短视频。
```

```text
使用 $remotion-daily-vlog。
我会给你一组日常拍摄素材，请参考 projects/daily-vlog-remotion，
帮我剪成适合抖音发布的日常 vlog。
```

```text
使用 $remotion-anime-beat-cut。
我会给你动漫片段和音乐，请参考 projects/douyin-anime-remotion，
帮我做一个高频卡点二创视频。
```

## 单独分享某一种风格

如果只想分享其中一种，可以直接使用 `zips/` 里的压缩包：

```text
anime-remotion-skill-project-clean.zip
daily-vlog-remotion-skill-project-clean.zip
odd-beat-cut-remotion-skill-project-clean.zip
```

每个压缩包都包含对应工程和对应 skill，适合直接发给另一个 Codex 用户使用。
