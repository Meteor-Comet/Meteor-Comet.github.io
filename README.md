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

### 1. 🎯 3列排版与右侧目录组件重构 (`MainGridLayout.astro` / `TOC.astro`)
- **3列统一居中大容器**：构建【左侧边栏 (280px)】 + 【中间文章 (840px)】 + 【右侧目录卡片 (264px)】的 1408px 整体居中布局，解决原主题右侧目录外挂挤压问题。
- **全平台常驻断点**：侧边栏目录显示响应断点优化至 `lg`（1024px+），让所有标准桌面与笔记本设备皆可稳定展示右侧目录卡片。
- **冗余标题智能过滤**：自动过滤文章 H1 标题以及 `## 目录` 节点本身，使目录直接精准展示正文结构。
- **目录深度与高亮追踪**：查看深度提升至 3 级（支持 H2 与 H3 级标题），结合 `IntersectionObserver` 实现滚动时右侧目录实时高亮当前章节并顺滑跟随。

### 2. 📊 Mermaid 动态图表渲染支持
- 引入并在 CSS 与 Markdown 渲染管线中完美支持 Mermaid 架构图、流程图、时序图与状态机渲染。

### 3. 🐛 编译与样式问题修复 (CSS & Build Fixes)
- **Vite/PostCSS 构建修复**：在 `markdown.css` 中直接内联 `.btn-regular-dark` 类定义，解决生产环境 `pnpm build` 时提示类缺失导致的 Vite CSS 构建错误。
- **外部链接增强**：标准化 PDF 下载与 SOP 指南表格外链的 `target="_blank"` 属性。

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
