# 🍥 Fuwari (Comet Custom Edition)

![Node.js >= 20](https://img.shields.io/badge/node.js-%3E%3D20-brightgreen) 
![pnpm >= 9](https://img.shields.io/badge/pnpm-%3E%3D9-blue) 
[![Astro](https://img.shields.io/badge/Astro-5.0-orange.svg)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8.svg)](https://tailwindcss.com)

A static blog template built with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com).

---

## ✨ Features

- [x] Built with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com)
- [x] Smooth animations and page transitions with Swup
- [x] Light / Dark mode
- [x] Customizable theme colors & banner
- [x] Responsive design
- [x] Full-text search functionality with [Pagefind](https://pagefind.app/)
- [x] Table of Contents (TOC) with active scroll tracking
- [x] Markdown extended syntax & Mermaid diagram support
- [x] RSS feed & Sitemap generation

---

## 🛠️ 框架定制与代码优化 (Customizations & Optimizations)

本项目在原 [Fuwari](https://github.com/saicaca/fuwari) 框架基础上进行了多项核心组件优化与功能扩展：

### 1. 🎯 目录组件与高亮追踪重构 (`TOC.astro`)
- **冗余标题智能过滤**：自动过滤文章 H1 标题以及 `## 目录` 节点本身，使侧边栏目录直接精准展示正文结构。
- **断点与深度扩展**：
  - 侧边栏目录显示响应断点优化至 `xl`（1280px+），让标准桌面与笔记本皆可展示。
  - 目录查看深度配置提升至 3 级（支持 H2 与 H3 级标题）。
- **实时定位高亮与平滑跟随**：结合 `IntersectionObserver` 实现滚动时右侧目录实时高亮当前章节并顺滑跟随。

### 2. 📑 文首限高可折叠目录卡片 (`in-post-toc-card`)
- **限高内滑与一键折叠**：为全站长文文首目录提供限定高度 (`max-h-72` ~ 280px) 盒，内置平滑内部滚动条，首屏直达正文。
- 支持点击 `📑 本文目录` 标题栏随时一键收起/展开。

### 3. 📊 Mermaid 动态图表渲染支持
- 引入并在 CSS 与 Markdown 渲染管线中完美支持 Mermaid 架构图、流程图、时序图与状态机渲染。

### 4. 🐛 编译与样式问题修复 (CSS & Build Fixes)
- **Vite/PostCSS 构建修复**：在 `markdown.css` 中直接内联 `.btn-regular-dark` 类定义，解决生产环境 `pnpm build` 时提示类缺失导致的 Vite CSS 构建错误。
- **外部链接增强**：标准化 PDF 下载与 SOP 指南表格外链的 `target="_blank"` 属性。

### 5. 🎨 个人配置与标语定制 (`src/config.ts`)
- 个人简介标语更新为 `花鳥風月`。
- 配置站点名称、Avatar 头像、Banner 渐变背景及社交链接。

---

## 🚀 Getting Started

1. Install dependencies:
   ```sh
   pnpm install
   ```
2. Edit `src/config.ts` to customize site parameters.
3. Run local development server:
   ```sh
   pnpm dev
   ```
4. Create a new post:
   ```sh
   pnpm new-post <filename>
   ```

---

## ⚡ Commands

| Command | Action |
|:---|:---|
| `pnpm install` | Installs dependencies |
| `pnpm dev` | Starts local dev server at `localhost:4321` |
| `pnpm build` | Build production site and Pagefind search indexes to `./dist/` |
| `pnpm preview` | Preview production build locally |
| `pnpm check` | Run checks for errors in code |
| `pnpm new-post <filename>` | Create a new post in `src/content/posts/` |

---

## 📄 License

This project is open-sourced under the MIT License.
