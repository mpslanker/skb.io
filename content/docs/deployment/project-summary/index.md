+++
title = "Project Architecture"
date = "2025-10-15"
draft = false
description = "Technical overview of the site architecture and setup"
tags = ["architecture", "overview"]
weight = 10
authors = ['mslanker']
categories = ['Documentation']
+++


# Project Summary: SKB.io Hugo Site

## Overview

A modern, self-upgrading, multilingual personal website built with Hugo and the Blowfish theme, designed for automatic deployment to GitHub Pages.

## What's Been Implemented

### ✅ Core Infrastructure

- **Hugo Extended v0.151.0** - Latest Hugo version with extended features
- **Blowfish v2 Theme** - Installed via Hugo Modules (modern, maintainable approach)
- **Go Modules** - For theme dependency management and easy updates
- **Modern Config Structure** - Using `config/_default/` directory pattern

### ✅ Multilingual Support

- **English (Primary)** - Default language
- **Japanese** - Full translation support
- Language-specific menus and navigation
- Blowfish theme has native Japanese translation support

### ✅ Content Sections (All Bilingual)

1. **Blog** (`/blog`) - Long-form articles and tutorials
2. **Projects** (`/projects`) - Portfolio and project showcases
3. **Docs** (`/docs`) - Technical documentation and guides
4. **Resources** (`/resources`) - Curated links and references
5. **Notes** (`/notes`) - Digital garden for short-form thoughts
6. **Gallery** (`/gallery`) - Photography and visual content
7. **About** (`/about`) - About page
8. **Contact** (`/contact`) - Contact information
9. **Privacy** (`/privacy`) - Privacy policy
10. **License** (`/license`) - Content licensing

### ✅ Features Configured

#### Search
- **Built-in Fuse.js search** - Client-side, no external service needed
- Enabled in theme configuration
- Automatic indexing of all content

#### Comments
- **Giscus integration** - GitHub Discussions-based
- Template created in `layouts/partials/comments.html`
- Per-article control via `showComments: true` front matter
- Zero spam, GitHub authentication required

#### Analytics (Ready to Configure)
- Support for:
  - Umami (recommended - privacy-focused)
  - Fathom Analytics
  - Google Analytics
  - Firebase
  - Seline Analytics
- Configuration placeholders in `params.toml`

#### External Images
- **Custom shortcode** created: `external-img.html`
- Supports CDN-hosted images
- Parameters: src, alt, caption, class, loading
- Perfect for photography gallery without bloating repo

### ✅ GitHub Actions CI/CD

- **Automatic deployment** on push to `main` branch
- Hugo v0.151.0 specified in workflow
- Optimized build with `--gc --minify`
- Direct deployment to GitHub Pages
- No manual deployment needed

### ✅ Documentation

1. **README.md** - Main project documentation
2. **SETUP.md** - Step-by-step setup guide
3. **IMAGE_HOSTING.md** - Comprehensive guide for CDN options
4. **PROJECT_SUMMARY.md** - This file

### ✅ Example Content

- Welcome blog post (EN + JA)
- Example project
- Example note
- All section index pages with descriptions

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     GitHub Repository                    │
│                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │   Content    │  │   Config     │  │   Layouts    │ │
│  │  (Markdown)  │  │    (TOML)    │  │   (HTML)     │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
│         │                   │                  │        │
│         └───────────────────┴──────────────────┘        │
│                             │                            │
└─────────────────────────────┼────────────────────────────┘
                              │
                    ┌─────────▼─────────┐
                    │  GitHub Actions   │
                    │  (hugo.yml)       │
                    └─────────┬─────────┘
                              │
                    ┌─────────▼─────────┐
                    │   Hugo Build      │
                    │   + Blowfish      │
                    └─────────┬─────────┘
                              │
                    ┌─────────▼─────────┐
                    │  Static HTML/CSS  │
                    │  /public/         │
                    └─────────┬─────────┘
                              │
                    ┌─────────▼─────────┐
                    │   GitHub Pages    │
                    │   (Deployment)    │
                    └─────────┬─────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
┌───────▼────────┐   ┌────────▼────────┐   ┌──────▼──────┐
│    Visitors    │   │    Comments     │   │   Images    │
│  (Your Site)   │   │    (Giscus)     │   │   (CDN)     │
└────────────────┘   └─────────────────┘   └─────────────┘
```

## Technology Stack

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Static Site Generator** | Hugo v0.151.0 Extended | Fast, powerful site building |
| **Theme** | Blowfish v2 | Modern, feature-rich theme |
| **Dependency Mgmt** | Hugo Modules | Theme updates and management |
| **Hosting** | GitHub Pages | Free, reliable hosting |
| **CI/CD** | GitHub Actions | Automatic deployment |
| **Search** | Fuse.js | Client-side search |
| **Comments** | Giscus | GitHub Discussions integration |
| **Image Hosting** | External CDN | Scalable image delivery |

## File Structure

```
skb.io/
├── .github/
│   └── workflows/
│       └── hugo.yml              # Auto-deployment workflow
├── config/
│   └── _default/
│       ├── hugo.toml             # Main Hugo config
│       ├── languages.toml        # EN/JA language config
│       ├── menus.en.toml         # English navigation
│       ├── menus.ja.toml         # Japanese navigation
│       └── params.toml           # Blowfish theme settings
├── content/
│   ├── blog/                     # Blog posts
│   ├── projects/                 # Portfolio projects
│   ├── docs/                     # Documentation
│   ├── resources/                # Curated resources
│   ├── notes/                    # Digital garden
│   ├── gallery/                  # Photo gallery
│   ├── about/                    # About page
│   └── contact/                  # Contact page
├── layouts/
│   ├── partials/
│   │   └── comments.html         # Giscus comments
│   └── shortcodes/
│       └── external-img.html     # External image helper
├── static/                       # Static assets (images, etc.)
├── go.mod                        # Hugo module dependencies
├── README.md                     # Project documentation
├── SETUP.md                      # Setup instructions
└── IMAGE_HOSTING.md              # CDN guide
```

## Next Steps

### Immediate (Before First Deploy)

1. **Update Configuration**
   - [ ] Set your `baseURL` in `config/_default/hugo.toml`
   - [ ] Update site title
   - [ ] Add author information to `params.toml`
   - [ ] Update contact information

2. **Create Repository**
   - [ ] Initialize git: `git init`
   - [ ] Create GitHub repo (public)
   - [ ] Push code to GitHub

3. **Enable GitHub Pages**
   - [ ] Go to Settings → Pages
   - [ ] Select "GitHub Actions" as source
   - [ ] Wait for first deployment

### After Deploy

4. **Setup Comments**
   - [ ] Enable GitHub Discussions
   - [ ] Configure Giscus at https://giscus.app/
   - [ ] Update `layouts/partials/comments.html`

5. **Configure Analytics** (Optional)
   - [ ] Choose analytics provider
   - [ ] Add credentials to `params.toml`

6. **Setup Image Hosting**
   - [ ] Choose CDN (ImageKit, Cloudflare R2, etc.)
   - [ ] Create account and bucket
   - [ ] Test with sample images

7. **Personalize Content**
   - [ ] Add profile photo to `static/img/`
   - [ ] Write About page
   - [ ] Create first real blog post
   - [ ] Add projects to portfolio

### Optional Enhancements

8. **Custom Domain** (If desired)
   - [ ] Add `CNAME` file to `static/`
   - [ ] Configure DNS
   - [ ] Enable HTTPS

9. **Additional Features**
   - [ ] Add social media links
   - [ ] Create custom favicon
   - [ ] Set up RSS feed subscribers
   - [ ] Add newsletter integration

## Maintenance

### Regular Updates

```bash
# Update Hugo theme
hugo mod get -u github.com/nunocoracao/blowfish/v2
hugo mod tidy

# Check for Hugo updates
brew upgrade hugo  # macOS
```

### Content Workflow

```bash
# Create new blog post
hugo new content/blog/my-post.md

# Preview locally
hugo server -D

# Build for production
hugo --gc --minify

# Deploy (automatic on git push)
git add .
git commit -m "New post: My Post"
git push
```

## Key Advantages of This Setup

1. **Self-Updating**
   - Push to GitHub → Auto-deploy
   - Hugo Modules for easy theme updates
   - GitHub Actions handles everything

2. **Scalable**
   - External CDN for large images
   - Static site = fast loading
   - Can handle high traffic for free

3. **Multilingual-First**
   - Full EN/JP support from day one
   - Easy to add more languages later
   - Proper i18n structure

4. **Modern Best Practices**
   - Hugo Modules (not submodules)
   - Config directory structure
   - Proper front matter templates
   - SEO-friendly URLs

5. **Low Maintenance**
   - No database to manage
   - No server to maintain
   - Automatic HTTPS
   - Free hosting

## Build Stats

Current build (fresh install):
```
Pages: 44 EN, 36 JA (80 total)
Build Time: 188ms
Static Files: 7
Output Size: ~200KB (before content)
```

## Support Resources

- **Hugo Docs**: https://gohugo.io/documentation/
- **Blowfish Docs**: https://blowfish.page/docs/
- **GitHub Pages**: https://docs.github.com/en/pages
- **Giscus**: https://giscus.app/

## Conclusion

This setup provides a solid foundation for a multi-purpose personal website with:
- ✅ Modern tooling and best practices
- ✅ Full multilingual support
- ✅ Automatic deployment
- ✅ Built-in search and comments
- ✅ Scalable image hosting strategy
- ✅ Zero ongoing costs (with free tiers)

You can now focus on creating content while the infrastructure handles itself!
