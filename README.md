# awesome-arxiv-multilingual

多语言翻译版 arXiv 讲义与书籍的展示目录。

## 📖 简介

本网站汇集了 [PiggyPrint](https://piggyprint.gumroad.com/) 提供的多语言翻译版学术资源，涵盖量子机器学习、张量网络等前沿领域的讲义与书籍。

## 📚 当前书目

| 书名 | 翻译语言 |
|------|---------|
| **Les Houches Lecture Notes on Tensor Networks** | Deutsch, Español, Français, Indonesia, 日本語, 한국어, Português, 中文 |
| **Quantum machine learning — lecture notes** | العربية, Português, Français, Español, Indonesia, 中文 |
| **The Hitchhiker's Guide to Agentic AI** | 中文 |

## 🚀 部署

本站使用 GitHub Pages 托管，数据驱动的静态页面架构。

### 技术栈

- **纯 HTML + CSS** — 无需构建工具链
- **data.json 数据驱动** — 加书只需修改 JSON，不碰 HTML
- **GitHub Pages** — 免费托管，自动 HTTPS

### 添加新书

编辑 [`data.json`](data.json)，在数组中追加：

```json
{
  "id": "new-book",
  "title": "书名",
  "languages": [
    { "name": "中文", "gumroad": "xxxxxx" },
    { "name": "English", "gumroad": "yyyyyy" }
  ]
}
```

提交推送后网站自动更新。

## 🌐 访问

[https://piggyprint2025.github.io/awesome-arxiv-multilingual/](https://piggyprint2025.github.io/awesome-arxiv-multilingual/)

## 📄 许可

本项目仅作为展示目录，书籍版权归各自作者所有。
