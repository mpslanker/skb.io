+++
title = 'Setup Guide'
date = '2025-10-15T00:00:00Z'
authors = ['mslanker']
description = 'Complete setup instructions for your site'
draft = false

categories = ['Documentation']
tags = ['setup', 'configuration']
weight = 20
+++

# Setup Guide

This guide will help you complete the setup of your Hugo + Blowfish site.

## Initial Configuration

### 1. Update Site Information

Edit `config/_default/hugo.toml`:

```toml
baseURL = "https://yourusername.github.io/"  # or your custom domain
title = "Your Site Title"
```

### 2. Configure Author Information

Edit `config/_default/params.toml` and add your author details:

```toml
[author]
  name = "Your Name"
  image = "/img/profile.jpg"  # Place your profile image in static/img/
  headline = "Your Headline"
  bio = "A brief bio about yourself"
  links = [
    { email = "mailto:your-email@example.com" },
    { github = "https://github.com/yourusername" },
    { linkedin = "https://www.linkedin.com/in/yourprofile" },
    { twitter = "https://twitter.com/yourusername" },
  ]
```

### 3. Update Contact Page

Edit both:
- `content/contact/index.md`
- `content/contact/index.ja.md`

Replace placeholder email and social links with your actual information.

## GitHub Pages Deployment

### 1. Create GitHub Repository

```bash
git init
git add .
git commit -m "Initial commit: Hugo site with Blowfish theme"
git branch -M main
git remote add origin https://github.com/yourusername/yourusername.github.io.git
git push -u origin main
```

### 2. Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. The site will automatically build and deploy

### 3. Wait for Deployment

- Go to the **Actions** tab to monitor the deployment
- First deployment typically takes 2-3 minutes
- Once complete, your site will be live at `https://yourusername.github.io/`

## Comments Setup (Giscus)

### 1. Enable GitHub Discussions

1. Go to your repository **Settings**
2. Scroll to **Features** section
3. Check **Discussions**

### 2. Install Giscus

1. Visit https://giscus.app/
2. Enter your repository: `yourusername/yourusername.github.io`
3. Choose:
   - **Page ↔️ Discussions Mapping**: "pathname"
   - **Discussion Category**: "Announcements" or create a custom category
   - **Features**: Enable reactions and metadata as desired
4. Copy the generated configuration values

### 3. Update Comments Partial

Edit `layouts/partials/comments.html` and replace the placeholder values:

```html
<script src="https://giscus.app/client.js"
        data-repo="yourusername/yourusername.github.io"
        data-repo-id="YOUR_REPO_ID"
        data-category="Announcements"
        data-category-id="YOUR_CATEGORY_ID"
        ...
</script>
```

### 4. Enable Comments

Add `showComments: true` to any blog post front matter where you want comments enabled.

## Analytics Setup (Optional)

### Option 1: Umami (Recommended - Privacy-focused)

1. Sign up at https://umami.is/ or self-host
2. Create a website in Umami dashboard
3. Copy your Website ID
4. Edit `config/_default/params.toml`:

```toml
[umami]
  site = "YOUR_WEBSITE_ID"
  domain = "yourdomain.com"  # or yourusername.github.io
```

### Option 2: Fathom Analytics

1. Sign up at https://usefathom.com/
2. Add your site and get Site ID
3. Edit `config/_default/params.toml`:

```toml
[fathom]
  site = "YOUR_SITE_ID"
  domain = "yourdomain.com"  # optional
```

### Option 3: Google Analytics

Edit `config/_default/hugo.toml`:

```toml
[services]
  [services.googleAnalytics]
    ID = "G-XXXXXXXXXX"
```

## External Image Hosting (For Gallery)

### Option 1: Cloudflare R2 (Recommended - Cost Effective)

1. Sign up for Cloudflare
2. Go to R2 Object Storage
3. Create a bucket for your images
4. Enable public access
5. Get the public URL

### Option 2: ImageKit

1. Sign up at https://imagekit.io/
2. Upload images via dashboard
3. Get the URL endpoint
4. Free tier: 20GB bandwidth/month

### Option 3: Cloudinary

1. Sign up at https://cloudinary.com/
2. Upload images
3. Get the delivery URL
4. Free tier: 25 credits/month

### Usage in Content

Use the custom shortcode:

```markdown
{{< external-img
    src="https://your-cdn.com/image.jpg"
    alt="Description"
    caption="Optional caption"
>}}
```

## Custom Domain (Optional)

### 1. Add CNAME File

Create `static/CNAME` with your domain:

```
yourdomain.com
```

### 2. Configure DNS

Add a CNAME record with your DNS provider:

```
Type: CNAME
Name: www (or @)
Value: yourusername.github.io
```

For apex domain (@), use A records:

```
Type: A
Name: @
Value: 185.199.108.153
Value: 185.199.109.153
Value: 185.199.110.153
Value: 185.199.111.153
```

### 3. Update baseURL

Edit `config/_default/hugo.toml`:

```toml
baseURL = "https://yourdomain.com/"
```

### 4. Enable HTTPS

1. Wait for DNS propagation (up to 24 hours)
2. Go to GitHub repository **Settings** → **Pages**
3. Check **Enforce HTTPS**

## Content Customization

### Profile Image

Place your profile image at:
- `static/img/profile.jpg`

Update reference in `config/_default/params.toml`:

```toml
[homepage]
  homepageImage = "/img/profile.jpg"
```

### Favicon

Replace the default favicons in `static/` with your own:
- `favicon.ico`
- `favicon-16x16.png`
- `favicon-32x32.png`
- `apple-touch-icon.png`
- `android-chrome-192x192.png`
- `android-chrome-512x512.png`

Generate favicons at: https://realfavicongenerator.net/

### About Page

Edit:
- `content/about/index.md` (English)
- `content/about/index.ja.md` (Japanese)

Add your background, experience, and interests.

## Updating Content

### Creating New Posts

```bash
# English
hugo new content/blog/my-new-post.md

# Japanese
hugo new content/blog/my-new-post.ja.md
```

### Front Matter Template

```yaml
---
title: "Post Title"
date: 2025-10-15
draft: false
description: "Brief description"
tags: ["tag1", "tag2"]
categories: ["Category"]
showComments: true  # Enable comments
---

Your content here...
```

## Theme Updates

Keep your theme up to date:

```bash
hugo mod get -u github.com/nunocoracao/blowfish/v2
hugo mod tidy
```

## Testing Locally

```bash
# Start development server
hugo server -D

# Build for production
hugo --gc --minify

# Check for broken links
hugo --minify --gc --cleanDestinationDir
```

## Troubleshooting

### Build Fails

- Check Hugo version: `hugo version` (needs Extended version)
- Verify Go is installed: `go version`
- Clear module cache: `hugo mod clean`

### Images Not Showing

- Ensure images are in `static/` directory
- Check file paths (case-sensitive)
- Verify external URLs are accessible

### Comments Not Working

- Verify Giscus configuration values
- Check that GitHub Discussions is enabled
- Ensure repository is public
- Verify `showComments: true` in front matter

### Search Not Working

- Ensure `enableSearch = true` in `params.toml`
- Check that JSON output is enabled in `hugo.toml`
- Clear browser cache

## Next Steps

1. ✅ Complete initial configuration above
2. ✅ Push to GitHub and verify deployment
3. ✅ Set up comments (Giscus)
4. ✅ Configure analytics (optional)
5. ✅ Set up external image hosting for gallery
6. ✅ Customize About and Contact pages
7. ✅ Add your first real blog post
8. ✅ Share your site!

## Resources

- [Blowfish Documentation](https://blowfish.page/docs/)
- [Hugo Documentation](https://gohugo.io/documentation/)
- [Giscus](https://giscus.app/)
- [GitHub Pages Custom Domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
