### 全局概览（怎么跑起来/部署/调试）

- **框架与关键库**
  - **Next.js 15（App Router + RSC）**：入口在 `app/`，页面与布局以文件夹路由组织
  - **React 19**
  - **Tailwind CSS v4**：样式主入口在 `css/tailwind.css`
  - **Contentlayer2**：把 `data/blog/*.mdx` 等内容转成可 typed 的数据，配置在 `contentlayer.config.ts`
  - **Pliny**：评论、统计、Newsletter、搜索集成

- **安装与运行**
  - 安装：`pnpm install`
  - 开发：`pnpm dev`（默认 `http://localhost:3000`）
  - 构建：`pnpm build`（静态导出需 `EXPORT=1 UNOPTIMIZED=1 [BASE_PATH=/blog] pnpm build`）
  - 本地预览：`pnpm serve`

- **部署（GitHub Pages 已配置）**
  - 工作流文件：`.github/workflows/pages.yml`
  - 核心步骤：checkout → setup-node+pnpm → 恢复 `.next/cache` → `pnpm install` → `pnpm build`（可带 `EXPORT/UNOPTIMIZED/BASE_PATH`）→ 上传 `./out` → 部署
  - 子路径部署：设置 `BASE_PATH`，代码中通过 `process.env.BASE_PATH` 拼接链接

- **构建/运行配置**
  - Next 配置：`next.config.js`（含 CSP 安全头、`images.remotePatterns`、`output/export/basePath` 等）
  - SEO/Sitemap/Robots：`app/seo.tsx`、`app/sitemap.ts`、`app/robots.ts`
  - 环境变量：构建期可传 `EXPORT`、`UNOPTIMIZED`、`BASE_PATH`；第三方服务（Umami/评论/Newsletter）见 `data/siteMetadata.js`

- **代码质量与钩子**
  - Lint：`pnpm lint`（规则见 `eslint.config.mjs`）
  - 格式化：`prettier.config.js`
  - Husky：`.husky/pre-commit` 调 `npx --no-install lint-staged`，规则在 `package.json` 的 `lint-staged`

---

### 内容与数据（写文章/配置站点）

- **文章与作者**
  - 文章：`/data/blog/**/*.mdx`
  - 作者：`/data/authors/*.mdx`
  - Contentlayer：`contentlayer.config.ts` 定义文档类型、MDX 插件、字段

- **站点级元信息**
  - `data/siteMetadata.js`：站点标题、描述、社交、Analytics、Comments、Newsletter 等开关与配置
  - 导航与项目数据：`data/headerNavLinks.ts`、`data/projectsData.ts`

---

### UI 结构与可定制点（布局/主题/字体）

- **页面与布局结构**
  - 根布局：`app/layout.tsx`（全局 `<html>`/`<body>`、主题提供器、字体等）
  - 主入口包装：`app/Main.tsx`
  - 页面目录：`app/` 下各路由页面（如 `app/page.tsx` 首页、`app/about/page.tsx`、`app/projects/page.tsx`）
  - 博客页：
    - 列表与分页：`app/blog/page.tsx`、`app/blog/page/[page]/page.tsx`
    - 详情：`app/blog/[...slug]/page.tsx`
    - 标签页：`app/tags/page.tsx`、`app/tags/[tag]/page.tsx`、`app/tags/[tag]/page/[page]/page.tsx`

- **布局模板（文章/列表）**
  - `layouts/PostLayout.tsx`、`PostSimple.tsx`、`PostBanner.tsx`（文章页）
  - `layouts/ListLayout.tsx`、`ListLayoutWithTags.tsx`（列表页）

- **组件**
  - 头部/底部：`components/Header.tsx`、`components/Footer.tsx`
  - 页面容器：`components/LayoutWrapper.tsx`、`components/SectionContainer.tsx`
  - 主题切换：`components/ThemeSwitch.tsx`、主题提供器 `app/theme-providers.tsx`
  - 文章渲染：`components/MDXComponents.tsx`（自定义 MDX 渲染组件，如代码块、图片、表格等）
  - 其他：`components/Card.tsx`、`components/Tag.tsx`、`components/SearchButton.tsx`

- **样式与主题**
  - Tailwind 入口：`css/tailwind.css`（可放全局样式/变量）
  - 代码高亮：`css/prism.css`
  - 主题切换：`next-themes` 配合 `ThemeSwitch`；颜色/变量可在 CSS 与 Tailwind 中调整

- **字体**
  - 一般在 `app/layout.tsx` 通过 `next/font` 加载（如 Space Grotesk）；更换字体需替换导入与 className

---

### SEO / 评论 / 统计 / Newsletter

- **SEO**：`app/seo.tsx`（元数据、OG、Twitter Card 等）
- **评论**：Pliny 集成（Giscus/Utterances/Disqus），在 `data/siteMetadata.js` 配置 provider 与参数
- **统计**：Umami/Plausible/Google Analytics/Posthog，同样在 `data/siteMetadata.js`
- **Newsletter**：API 路由 `app/api/newsletter/route.ts`，前端在 MDX 组件或页面中使用

---

### 常用命令速查

- 安装依赖：`pnpm install`
- 开发调试：`pnpm dev`
- 构建生产：`pnpm build`
- 静态导出：`EXPORT=1 UNOPTIMIZED=1 [BASE_PATH=/blog] pnpm build`
- 本地预览：`pnpm serve`
- 代码检查：`pnpm lint`
- 提交前校验：自动触发 `.husky/pre-commit` → `npx --no-install lint-staged`

---

### 定制修改建议（从哪里下手）

- **改文章页/列表页布局**：修改 `layouts/PostLayout.tsx`、`PostSimple.tsx`、`PostBanner.tsx`、`ListLayout*.tsx` 的结构与样式
- **全局布局/导航/页脚**：`app/layout.tsx`、`components/Header.tsx`、`components/Footer.tsx`、`components/LayoutWrapper.tsx`；导航在 `data/headerNavLinks.ts`
- **主题与配色**：在 `css/tailwind.css` 添加/覆盖变量与样式，结合 Tailwind 类名；暗色联动看 `ThemeSwitch.tsx`、`theme-providers.tsx`
- **字体**：在 `app/layout.tsx` 调整 `next/font` 配置（字体源、字重、subset），替换全局 className
- **MDX 渲染**：在 `components/MDXComponents.tsx` 注册/替换你的组件；`css/prism.css` 自定义代码高亮主题
- **内容模型**：需要更多 Frontmatter 字段或新文档类型时，修改 `contentlayer.config.ts`

---

如需我配合某个具体页面或主题风格的定制，请告知目标，我可以直接给出最短修改路径与对应文件的改动点。
