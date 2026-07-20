# 🍥 Comet Blog (Fuwari Custom Edition)

![Node.js >= 20](https://img.shields.io/badge/node.js-%3E%3D20-brightgreen) 
![pnpm >= 9](https://img.shields.io/badge/pnpm-%3E%3D9-blue) 
[![Astro](https://img.shields.io/badge/Astro-5.0-orange.svg)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8.svg)](https://tailwindcss.com)

基于 [Astro](https://astro.build) 和 [Fuwari](https://github.com/saicaca/fuwari) 框架构建的个人技术博客与工控/软硬件架构知识库。

---

## 🛠️ 框架定制与全站深度优化记录

### 1. 🎯 目录 (TOC) 架构与 100% 零断链跳转
- **Astro rehypeSlug 算法精准对齐**：使用自动化脚本重构了全站 30+ 篇已发布博客的 `## 目录` 结构，消除旧 HTML 硬编码锚点，达成 **2,500+ 个标题与目录跳转 100% 精确对应**。
- **冗余标题过滤**：自动过滤了文章 H1 大标题以及 `## 目录` 本身，使目录直接从正文第一章开始呈现。
- **右侧悬浮目录体验优化**：
  - 将侧边栏目录显示断点调整至 `xl`（1280px+），适配标准台式机与笔记本电脑。
  - 将目录层级深度从 2 级提升至 3 级（支持 H2 与 H3 级标题）。
  - 支持滚动实时定位高亮与平滑跟随。

### 2. 📑 文首限高可折叠目录卡片 (In-Post TOC Card)
- **解决长文挤占首屏问题**：针对内容较长、目录项繁多的长文，将文首 `## 目录` 封装进 `<details open class="in-post-toc-card">` 独立卡片中。
- **280px 限高与内滑**：默认限高 280px 并支持内部平滑滑动，使正文第一章在首屏即可展露。
- **一键折叠**：支持读者点击标题栏一键收起/展开文首目录，大幅提升长文阅读体验。

### 3. 📊 前期技术博客 Mermaid 动态可视化架构图
针对《数据结构》、《Docker》、《C# 基础/进阶》、《WPF》、《Modbus 串口通信》、《S7.Net 工业控制》、《ASP.NET Core》、《MySQL 救急》等 10+ 篇纯文字技术长文，全量补全了高颜值的 **Mermaid 架构图 / 时序图 / 状态机 / 内存模型图**。

### 4. 📚 工业自动化硬件指南合并与图文脱敏对齐
- **整合 13 章硬件大全**：将原本分散的工控与电气硬件博客深度融合，整理为 13 章涵盖工控机、总线、伺服/步进/直线电机、传感器、配线/配盘元件、点胶阀/UV控制器/螺丝机/飞达等全套知识库，并补充了线缆选型 BOM 清单。
- **品牌脱敏**：规范化隐藏小厂商品牌，保留国际与行业头部品牌（如 松下 Panasonic、SMC、汇川 INOVANCE、德力西 DELIXI、固高 Googol、IDEC 和泉等）。
- **图文精准对齐**：重新核对文章插图与文本描绘，确保每一张硬件实物配图与文字描述 100% 一致。

### 5. ✍️ 文章风格重构与隐私隐藏
- **白描散文重构**：将首篇博客《向往波特尔 1 级的夜空》改写为平实客观的白描散文。
- **节点文章隐藏**：将《VPN 节点搭建》Frontmatter 设为 `draft: true` 隐退展示。
- **PDF 下载新标签页打开**：为框架手册中的 SOP PDF 下载表格增加了 `target="_blank"` 属性。

---

## ⚡ 常用命令

| 命令 | 说明 |
|:---|:---|
| `pnpm install` | 安装项目依赖 |
| `pnpm dev` | 启动本地开发服务器 (`http://localhost:4321`) |
| `pnpm build` | 编译生产环境静态站点及 Pagefind 搜索索引到 `./dist/` |
| `pnpm preview` | 在本地预览生产构建 |
| `pnpm new-post <filename>` | 创建一篇新博客文章 |

---

## 📄 License

This project is open-sourced under the MIT License.
