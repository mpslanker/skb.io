+++
title = 'Quick Start'
date = '2025-10-15T00:00:00Z'
authors = ['mslanker']
description = 'Get your Hugo site up and running in 5 minutes'
draft = false

categories = ['Documentation']
tags = ['setup', 'guide']
weight = 10
+++

# Quick Start Guide

Get your Hugo site up and running in 5 minutes!

## Prerequisites Installed ✅

- Hugo Extended v0.151.0
- Go 1.20+
- Git

## Step 1: Update Basic Configuration (2 minutes)

### Edit `config/_default/hugo.toml`

```toml
baseURL = "https://yourusername.github.io/"  # ← Update this
title = "Your Site Title"                     # ← Update this
```

### Edit `config/_default/params.toml`

Scroll to the author section and update:

```toml
[author]
  name = "Your Name"           # ← Your name
  headline = "Your Headline"   # ← What you do
  bio = "Your bio"            # ← Short bio
  links = [
    { email = "mailto:your-email@example.com" },  # ← Your email
  ]
```

## Step 2: Test Locally (1 minute)

```bash
# Start the development server
hugo server -D

# Open in browser: http://localhost:1313
# Press Ctrl+C to stop when done
```

## Step 3: Deploy to GitHub (2 minutes)

### Initialize and Push

```bash
# Initialize git
git init

# Make first commit
git add .
git commit -m "Initial commit"

# Create repository on GitHub, then:
git branch -M main
git remote add origin https://github.com/yourusername/yourusername.github.io.git
git push -u origin main
```

### Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. Wait 2-3 minutes

Your site will be live at: `https://yourusername.github.io/`

## That's It! 🎉

Your site is now live and will auto-deploy whenever you push changes.

## Next Steps

See the full guides for more details:

- **[CHECKLIST.md](CHECKLIST.md)** - Complete setup checklist
- **[SETUP.md](SETUP.md)** - Detailed configuration guide
- **[README.md](README.md)** - Full project documentation
- **[IMAGE_HOSTING.md](IMAGE_HOSTING.md)** - CDN setup for photos

## Common Commands

```bash
# Create new blog post
hugo new content/blog/my-post.md

# Create new project
hugo new content/projects/my-project.md

# Start dev server
hugo server -D

# Build for production
hugo --gc --minify

# Update theme
hugo mod get -u
hugo mod tidy
```

## Adding Your First Real Content

1. **Edit About page**: `content/about/index.md`
2. **Create blog post**: `hugo new content/blog/first-post.md`
3. **Add project**: `hugo new content/projects/my-project.md`
4. **Update contact**: `content/contact/index.md`

Then commit and push:

```bash
git add .
git commit -m "Add content"
git push
```

Your site will automatically rebuild and deploy!

## Troubleshooting

### Build fails locally

```bash
# Clear Hugo cache
hugo mod clean

# Rebuild modules
hugo mod get -u
hugo mod tidy
```

### GitHub Actions fails

- Check Actions tab for error logs
- Verify you selected "GitHub Actions" in Pages settings
- Ensure repository is public

### Site shows old content

- Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
- Clear browser cache
- Wait a few minutes for CDN to update

## Need Help?

- Check [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) for architecture overview
- Review [Hugo Docs](https://gohugo.io/documentation/)
- Check [Blowfish Docs](https://blowfish.page/docs/)

---

**Remember**: You can iterate! Deploy first, refine later. The hard part is done! 🚀
