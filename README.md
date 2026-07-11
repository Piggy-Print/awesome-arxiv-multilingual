# awesome-arxiv-multilingual

A catalog website for multilingual translated arXiv lecture notes and books.

## 📖 About

This site showcases multilingual translations of academic resources from [PiggyPrint](https://piggyprint.gumroad.com/), covering cutting-edge fields such as quantum machine learning and tensor networks.

## 🚀 Deployment

This site is hosted on GitHub Pages with a data-driven static site architecture.

### Tech Stack

- **Pure HTML + CSS** — no build toolchain required
- **data.json driven** — add a book by editing JSON only, no HTML changes
- **GitHub Pages** — free hosting with automatic HTTPS

### Adding a New Book

Edit [`data.json`](data.json) and append to the array:

```json
{
  "id": "new-book",
  "title": "Book Title",
  "languages": [
    { "name": "中文", "gumroad": "xxxxxx" },
    { "name": "English", "gumroad": "yyyyyy" }
  ]
}
```

Commit and push — the site updates automatically.

## 🌐 Visit

[https://piggy-print.github.io/awesome-arxiv-multilingual/](https://piggy-print.github.io/awesome-arxiv-multilingual/)

## 📄 License

This repository serves as a catalog only. The rights to all books belong to their respective authors.
