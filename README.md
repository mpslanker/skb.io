# SKB.io

A modern, multilingual personal website built with Hugo and the Blowfish theme, automatically deployed to GitHub Pages.

## Features

- 🌍 **Multilingual Support** - Full English and Japanese language support
- 🔍 **Built-in Search** - Client-side search powered by Fuse.js
- 💬 **Comments** - Giscus integration (GitHub Discussions-based)
- 📱 **Responsive Design** - Mobile-first, modern UI
- 🚀 **Auto-Deploy** - GitHub Actions CI/CD pipeline
- 📊 **Analytics Ready** - Easy integration with Umami, Fathom, or Google Analytics
- 🎨 **Multiple Content Types** - Blog, Projects, Docs, Notes, Gallery, and more
- 🖼️ **External Image Support** - Custom shortcode for CDN-hosted images

## Content Sections

- **Blog** (`/blog`) - Long-form articles and tutorials
- **Projects** (`/projects`) - Portfolio and project showcases
- **Docs** (`/docs`) - Technical documentation and guides
- **Resources** (`/resources`) - Curated links and references
- **Notes** (`/notes`) - Digital garden for quick thoughts
- **Gallery** (`/gallery`) - Photography and visual content
- **About** (`/about`) - About page
- **Contact** (`/contact`) - Contact information

## Quick Start

### Prerequisites

- Hugo Extended v0.151.0 or later
- Go 1.20+ (for Hugo Modules)

### Local Development

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd skb.io
   ```

2. Start the development server:
   ```bash
   hugo server -D
   ```

3. Open http://localhost:1313 in your browser

### Building for Production

```bash
hugo --gc --minify
```

The site will be generated in the `public/` directory.

## Configuration

### Multilingual Setup

Language configuration is in `config/_default/languages.toml`. Currently configured for:
- English (default)
- Japanese

### Menus

Menu configuration is in:
- `config/_default/menus.en.toml` (English)
- `config/_default/menus.ja.toml` (Japanese)

### Theme Settings

Theme parameters are in `config/_default/params.toml`. Key settings:
- Search: `enableSearch = true`
- Color scheme: `colorScheme = "blowfish"`
- Comments: Configure per-article with `showComments: true`

## Content Management

### Creating New Content

Blog post:
```bash
hugo new content/blog/my-post.md
hugo new content/blog/my-post.ja.md  # Japanese version
```

Project:
```bash
hugo new content/projects/my-project.md
```

Note:
```bash
hugo new content/notes/my-note.md
```

### Using External Images

Use the custom shortcode for CDN-hosted images:

```markdown
{{< external-img src="https://cdn.example.com/image.jpg" alt="Description" caption="Optional caption" >}}
```

## Comments Setup

1. Visit https://giscus.app/
2. Enable GitHub Discussions on your repository
3. Install the Giscus app
4. Generate configuration and update `layouts/partials/comments.html`
5. Add `showComments: true` to article front matter

## Analytics Setup

Uncomment and configure in `config/_default/params.toml`:

```toml
[fathom]
  site = "YOUR_SITE_ID"

# OR

[umami]
  site = "YOUR_SITE_ID"
  domain = "yourdomain.com"
```

## GitHub Pages Deployment

### Setup

1. Push code to GitHub
2. Go to Settings → Pages
3. Source: Select "GitHub Actions"
4. The site will auto-deploy on every push to `main`

### Custom Domain (Optional)

1. Add a `CNAME` file to `static/` directory:
   ```
   yourdomain.com
   ```

2. Configure DNS with your domain provider:
   ```
   Type: CNAME
   Name: www (or @)
   Value: yourusername.github.io
   ```

3. Enable "Enforce HTTPS" in GitHub Pages settings

## Updating the Theme

The Blowfish theme is managed via Hugo Modules. To update:

```bash
hugo mod get -u github.com/nunocoracao/blowfish/v2
hugo mod tidy
```

## Project Structure

```
.
├── .github/
│   └── workflows/
│       └── hugo.yml          # GitHub Actions workflow
├── config/
│   └── _default/
│       ├── hugo.toml         # Main configuration
│       ├── languages.toml    # Language settings
│       ├── menus.en.toml     # English menu
│       ├── menus.ja.toml     # Japanese menu
│       └── params.toml       # Theme parameters
├── content/
│   ├── blog/                 # Blog posts
│   ├── projects/             # Project showcases
│   ├── docs/                 # Documentation
│   ├── resources/            # Resource links
│   ├── notes/                # Digital garden notes
│   ├── gallery/              # Photo gallery
│   ├── about/                # About page
│   └── contact/              # Contact page
├── layouts/
│   ├── partials/
│   │   └── comments.html     # Comments integration
│   └── shortcodes/
│       └── external-img.html # External image shortcode
├── static/                   # Static files (images, etc.)
└── go.mod                    # Hugo module dependencies
```

## Documentation

All documentation is now available on the site at `/docs`:

- **Getting Started**: Quick start, setup guide, and deployment checklist
- **Configuration**: Complete params.toml reference
- **Content Management**: Page bundles, images, and organization
- **Deployment**: Architecture and technical details

When viewing locally: http://localhost:1313/docs
When deployed: https://yourusername.github.io/docs

Alternatively, see `PROJECT_COMPLETE.md` for a quick overview.

## Resources

- [Hugo Documentation](https://gohugo.io/documentation/)
- [Blowfish Theme Docs](https://blowfish.page/docs/)
- [Giscus](https://giscus.app/)
- [GitHub Pages](https://pages.github.com/)

## License

See [LICENSE](/license) page for details.
