# 原型同步到线上

本项目是 Vite 原型页面，推荐通过 Git 平台自动部署实现多人在线查看。

## 线上自动部署流程

```text
本地修改代码 → git push → Git 平台自动构建 → 线上页面更新
```

适用平台：Vercel、Netlify、GitHub Pages、公司内部前端流水线等。

## Git 平台构建配置

在部署平台中配置：

| 配置项 | 值 |
|---|---|
| Install Command | `npm install` |
| Build Command | `npm run build` |
| Output Directory | `dist` |

## 本地开发预览

```bash
npm install
npm run dev
```

默认本地地址：

```text
http://localhost:5175/
```

## 手动一键同步

改完后执行：

```bash
npm run sync
```

该命令会依次执行：

1. `npm run build`：构建原型；
2. `git add .`：暂存本地修改；
3. 如果有变更，自动提交：`chore: sync prototype`；
4. `git push`：推送到远端，触发线上自动部署。

## 监听文件变化并自动同步

如果希望本地文件一修改就自动同步，执行：

```bash
npm run watch:sync
```

该命令会监听：

- `UI2Code/**/*`
- `index.html`
- `package.json`

忽略：

- `dist/**`
- `node_modules/**`

检测到修改后，会自动执行：

```bash
npm run sync
```

## 注意事项

- 使用 `sync` 或 `watch:sync` 前，需要先把当前目录初始化为 Git 仓库，并绑定远端仓库。
- 当前目录如果还没有 Git 仓库，可执行：

```bash
git init
git add .
git commit -m "init prototype"
git branch -M main
git remote add origin <你的远端仓库地址>
git push -u origin main
```

- 如果线上部署平台已连接该仓库，后续每次 `git push` 都会自动更新线上页面。
- `watch:sync` 会频繁提交和推送，适合原型快速协同时临时使用；如果需要更可控，建议使用 `npm run sync` 手动同步。
