#!/usr/bin/env node
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { writeFileSync, mkdirSync, existsSync } from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

function toSlug(input) {
  return input
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-\u4e00-\u9fa5]/g, '')
}

function today() {
  const d = new Date()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${mm}-${dd}`
}

const args = process.argv.slice(2)
if (args.length === 0) {
  console.error('用法: pnpm new:post "文章标题" [目录名]')
  process.exit(1)
}

const title = args[0]
const folder = args[1] ? toSlug(args[1]) : ''
const fileSlug = toSlug(title) || 'untitled'

const baseDir = join(process.cwd(), 'data', 'blog')
const dir = folder ? join(baseDir, folder) : baseDir
if (!existsSync(dir)) mkdirSync(dir, { recursive: true })

const filePath = join(dir, `${fileSlug}.mdx`)

if (existsSync(filePath)) {
  console.error(`文件已存在: ${filePath}`)
  process.exit(1)
}

const frontmatter =
  `---\n` +
  `title: '${title.replace(/'/g, "''")}'\n` +
  `date: '${today()}'\n` +
  `tags: []\n` +
  `draft: true\n` +
  `summary: ''\n` +
  `images: []\n` +
  `authors: ['default']\n` +
  `layout: PostLayout\n` +
  `---\n\n` +
  `在这里开始写作。支持 **MDX**，可以直接使用组件。\n\n` +
  `## 小贴士\n` +
  `- 完成后把 draft 改为 false\n` +
  `- 可设置 tags、summary、images 等\n`

writeFileSync(filePath, frontmatter, 'utf8')
console.log(`已创建: ${filePath}`)
