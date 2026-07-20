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

### 1. 📊 Mermaid 动态图表渲染支持
- 引入并在 CSS 与 Markdown 渲染管线中完美支持 Mermaid 架构图、流程图、时序图与状态机渲染。

### 2. 🐛 编译与样式问题修复 (CSS & Build Fixes)
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
