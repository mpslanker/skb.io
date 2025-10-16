+++
title = "Pre-Deployment Checklist"
date = "2025-10-15"
draft = false
description = "Ensure everything is configured before deployment"
tags = ["checklist", "deployment"]
weight = 30
authors = ['mslanker']
categories = ['Documentation']
+++


# Pre-Deployment Checklist

Use this checklist to ensure everything is configured before your first deployment.

## Configuration

### Basic Settings

- [ ] Update `baseURL` in `config/_default/hugo.toml`
  - Replace `https://example.org/` with your actual URL
  - Format: `https://yourusername.github.io/` or `https://yourdomain.com/`

- [ ] Update site title in `config/_default/hugo.toml`
  - Change `title = "SKB.io"` to your preferred title

- [ ] Configure author information in `config/_default/params.toml`
  ```toml
  [author]
    name = "Your Name"
    image = "/img/profile.jpg"
    headline = "Your Headline"
    bio = "Your bio"
    links = [
      { email = "mailto:your-email@example.com" },
      { github = "https://github.com/yourusername" },
      # Add your social links
    ]
  ```

### Content Updates

- [ ] Update `content/about/index.md` with your information
- [ ] Update `content/about/index.ja.md` with Japanese version
- [ ] Update `content/contact/index.md` with real contact info
- [ ] Update `content/contact/index.ja.md` with Japanese version
- [ ] Update `content/_index.md` homepage content
- [ ] Update `content/_index.ja.md` Japanese homepage
- [ ] Update `content/license/index.md` with your name and year
- [ ] Update `content/license/index.ja.md` accordingly

### Assets

- [ ] Add profile photo to `static/img/profile.jpg`
- [ ] Update `homepageImage` path in `config/_default/params.toml`
- [ ] (Optional) Replace favicons in `static/` directory

## GitHub Setup

### Repository Creation

- [ ] Initialize git repository: `git init`
- [ ] Create `.gitignore` (already created ✅)
- [ ] Make initial commit
  ```bash
  git add .
  git commit -m "Initial commit: Hugo site with Blowfish theme"
  ```

- [ ] Create GitHub repository
  - Name: `yourusername.github.io` (for user site)
  - Or: Any name (for project site)
  - Visibility: Public

- [ ] Add remote and push
  ```bash
  git remote add origin https://github.com/yourusername/repo-name.git
  git branch -M main
  git push -u origin main
  ```

### GitHub Pages Configuration

- [ ] Go to repository Settings → Pages
- [ ] Under "Source", select **GitHub Actions**
- [ ] Wait for Actions workflow to complete (check Actions tab)
- [ ] Verify site is live at `https://yourusername.github.io/`

## Post-Deployment Configuration

### Comments (Giscus)

- [ ] Enable Discussions in repository Settings
- [ ] Visit https://giscus.app/
- [ ] Enter repository name
- [ ] Choose settings:
  - Mapping: pathname
  - Category: Announcements (or custom)
  - Enable reactions
- [ ] Copy generated configuration
- [ ] Update `layouts/partials/comments.html` with values
- [ ] Test on a blog post with `showComments: true`

### Analytics (Optional)

Choose one option:

#### Option A: Umami (Recommended)
- [ ] Sign up at https://umami.is/ or self-host
- [ ] Create website in dashboard
- [ ] Get Website ID
- [ ] Add to `config/_default/params.toml`:
  ```toml
  [umami]
    site = "YOUR_WEBSITE_ID"
    domain = "yourdomain.com"
  ```

#### Option B: Fathom Analytics
- [ ] Sign up at https://usefathom.com/
- [ ] Add site, get Site ID
- [ ] Add to `config/_default/params.toml`:
  ```toml
  [fathom]
    site = "YOUR_SITE_ID"
  ```

#### Option C: Google Analytics
- [ ] Create GA4 property
- [ ] Get Measurement ID (G-XXXXXXXXXX)
- [ ] Add to `config/_default/hugo.toml`:
  ```toml
  [services]
    [services.googleAnalytics]
      ID = "G-XXXXXXXXXX"
  ```

### Image Hosting (For Gallery)

Choose one CDN provider:

#### Option A: ImageKit (Easiest)
- [ ] Sign up at https://imagekit.io/
- [ ] Upload test image
- [ ] Get URL endpoint
- [ ] Test with external-img shortcode

#### Option B: Cloudflare R2 (Cheapest)
- [ ] Create Cloudflare account
- [ ] Create R2 bucket
- [ ] Enable public access
- [ ] Upload test image
- [ ] Get public URL
- [ ] Test with external-img shortcode

#### Option C: Cloudinary
- [ ] Sign up at https://cloudinary.com/
- [ ] Upload test image
- [ ] Get cloud name and URL
- [ ] Test with external-img shortcode

## Content Creation

### First Real Content

- [ ] Delete or update example content:
  - `content/blog/welcome-post.md`
  - `content/projects/example-project.md`
  - `content/notes/example-note.md`

- [ ] Create first real blog post
  ```bash
  hugo new content/blog/your-first-post.md
  ```

- [ ] Add a project to showcase
  ```bash
  hugo new content/projects/your-project.md
  ```

- [ ] Add profile/bio information

## Testing

### Local Testing

- [ ] Run local server: `hugo server -D`
- [ ] Test all pages load correctly
- [ ] Test language switcher (EN ↔ JA)
- [ ] Test navigation menu
- [ ] Test search functionality
- [ ] Test external image shortcode
- [ ] Check mobile responsiveness

### Production Testing

After deployment:

- [ ] Verify site loads at production URL
- [ ] Test all navigation links
- [ ] Test language switching
- [ ] Test search
- [ ] Test comments (if configured)
- [ ] Test analytics (if configured)
- [ ] Check page load speed
- [ ] Verify RSS feed: `/index.xml`
- [ ] Test on mobile device

## Optional Enhancements

### Custom Domain

- [ ] Purchase domain
- [ ] Add `CNAME` file to `static/` with your domain
- [ ] Configure DNS:
  - CNAME record: www → yourusername.github.io
  - A records for apex domain (if needed)
- [ ] Update `baseURL` in config
- [ ] Enable "Enforce HTTPS" in GitHub Pages settings
- [ ] Wait for DNS propagation (up to 24 hours)

### SEO

- [ ] Add site description to homepage
- [ ] Verify meta tags are present
- [ ] Submit sitemap to Google Search Console
- [ ] Add robots.txt (Hugo generates automatically)

### Social

- [ ] Add social media links to author config
- [ ] Configure social sharing buttons (already enabled)
- [ ] Test Open Graph tags for sharing

## Maintenance Tasks

### Regular

- [ ] Update theme: `hugo mod get -u`
- [ ] Check for Hugo updates
- [ ] Review and respond to comments
- [ ] Check analytics for insights

### As Needed

- [ ] Add new content sections
- [ ] Update About page
- [ ] Refresh project portfolio
- [ ] Clean up old content

## Verification Commands

Run these locally to verify setup:

```bash
# Check Hugo version
hugo version

# Check module dependencies
hugo mod graph

# Build site
hugo --gc --minify

# Check for errors
hugo --buildDrafts --verbose

# Start local server
hugo server -D
```

## Success Criteria

You're ready to go live when:

- ✅ All configuration files updated with real values
- ✅ Content pages reviewed and personalized
- ✅ GitHub repository created and code pushed
- ✅ GitHub Actions workflow runs successfully
- ✅ Site accessible at production URL
- ✅ All navigation and features working
- ✅ Mobile responsive
- ✅ Search functional
- ✅ At least one real blog post published

## Getting Help

If you encounter issues:

1. Check [Hugo Documentation](https://gohugo.io/documentation/)
2. Check [Blowfish Docs](https://blowfish.page/docs/)
3. Review GitHub Actions logs
4. Check browser console for errors
5. Verify all file paths are correct

## Next Steps After Launch

- [ ] Share your site on social media
- [ ] Set up regular content schedule
- [ ] Monitor analytics
- [ ] Engage with commenters
- [ ] Consider newsletter integration
- [ ] Plan next projects/posts

---

**Note**: Keep this checklist and refer back as you make updates. Not everything needs to be done before first deployment - you can iterate!
