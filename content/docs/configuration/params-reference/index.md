+++
title = "Params.toml Reference"
date = "2025-10-15"
draft = false
description = "Complete reference for all Blowfish theme parameters"
tags = ["configuration", "reference", "blowfish"]
weight = 10
authors = ['mslanker']
categories = ['Documentation']
+++


# Blowfish params.toml Complete Reference

This document lists all available configuration options for the Blowfish theme.

**Official Documentation**: https://blowfish.page/docs/configuration/#theme-parameters

## Quick Reference

### Directory Structure for Logos/Images

- **`assets/img/`** - For logos referenced in config (goes through Hugo pipeline)
- **`static/img/`** - For direct file serving (no processing)
- **Logo path**: Use `img/logo.png` (no leading slash) when in `assets/`

---

## Global Theme Options

```toml
# Color scheme - built-in options or custom
colorScheme = "blowfish"  # Options: blowfish, avocado, fire, ocean, forest, princess, neon, bloody, terminal, marvel, noir, garden, contrast, congo, slate, winter

# Default appearance
defaultAppearance = "dark"  # Options: light, dark
autoSwitchAppearance = true  # Auto-switch based on system preference

# Accessibility
enableA11y = false  # Enable accessibility features

# Search and features
enableSearch = true  # Enable site search (Fuse.js)
enableCodeCopy = true  # Show copy button on code blocks

# Email replies
replyByEmail = false  # Enable "reply by email" feature

# Main sections for "Recent" content
mainSections = ["blog", "docs"]  # Which sections to show in recent

# SEO
# robots = ""  # Custom robots.txt content

# Image optimization
disableImageOptimization = false  # Disable automatic image optimization
disableImageOptimizationMD = false  # Disable for markdown images
disableTextInHeader = false  # Hide text in header when scrolling
# backgroundImageWidth = 1200  # Max width for background images

# Default images (from static/ directory - use leading slash)
defaultBackgroundImage = "/img/background.svg"
defaultFeaturedImage = "/img/featured.svg"
defaultSocialImage = "/img/social-card.png"  # For social media sharing
hotlinkFeatureImage = false  # Use external URLs for featured images
# imagePosition = "50% 50%"  # Background image position

# Navigation
highlightCurrentMenuArea = true  # Highlight active menu section

# Table of Contents
smartTOC = true  # Smart table of contents
smartTOCHideUnfocusedChildren = false  # Hide non-focused TOC items

# Git integrations (for code/repo links)
# giteaDefaultServer = "https://git.fsfe.org"
# forgejoDefaultServer = "https://v11.next.forgejo.org"

# Security
fingerprintAlgorithm = "sha512"  # Options: sha512, sha384, sha256
```

## Header Configuration

```toml
[header]
  layout = "fixed"  # Options: basic, fixed, fixed-fill, fixed-gradient, fixed-fill-blur
  logo = "skb.io"  # Text logo (overridden by image logo in languages file)
  showTitle = true  # Show site title
  showAppearanceSwitcher = true  # Show light/dark mode toggle
  showLanguageSwitcher = true  # Show language selector
```

## Footer Configuration

```toml
[footer]
  showMenu = true  # Show footer menu
  showCopyright = true  # Show copyright notice
  showThemeAttribution = true  # Show "Powered by Blowfish"
  showAppearanceSwitcher = true  # Show light/dark toggle in footer
  showScrollToTop = true  # Show scroll to top button
```

## Homepage Configuration

```toml
[homepage]
  layout = "profile"  # Options: page, profile, hero, card, background, custom
  homepageImage = "/img/profile.jpg"  # Used in: hero, card, and profile layouts
  showRecent = true  # Show recent articles
  showRecentItems = 5  # Number of recent items
  showMoreLink = true  # Show "see all" link
  showMoreLinkDest = "/blog"  # Where "see all" links to
  cardView = false  # Use card view for recent items
  cardViewScreenWidth = false  # Full-width cards
  layoutBackgroundBlur = true  # Blur background (for background layout)
  disableHeroImageFilter = false  # Disable hero image overlay (for hero layout)
```

## Article Configuration

```toml
[article]
  # Date and metadata
  showDate = true  # Show publish date
  showDateOnlyInArticle = false  # Only show date in article, not in lists
  showDateUpdated = false  # Show last updated date
  showReadingTime = true  # Show estimated reading time
  showWordCount = true  # Show word count

  # Author
  showAuthor = true  # Show author name
  # showAuthorBottom = false  # Show author at bottom instead of top
  showAuthorsBadges = true  # Show author badges/avatars

  # Views and likes (requires Firebase)
  showViews = false  # Show view count
  showLikes = false  # Show like button

  # Hero image
  showHero = true  # Show hero image
  heroStyle = "background"  # Options: basic, big, background, thumbAndBackground
  layoutBackgroundBlur = true  # Blur hero background
  layoutBackgroundHeaderSpace = true  # Add space for header

  # Navigation
  showBreadcrumbs = true  # Show breadcrumb navigation
  showPagination = true  # Show next/prev article links
  invertPagination = false  # Swap next/prev order

  # Content features
  showTableOfContents = true  # Show table of contents
  showHeadingAnchors = true  # Show anchor links on headings
  showSummary = true  # Show article summary/description
  showTaxonomies = true  # Show tags/categories

  # Series
  seriesOpened = false  # Expand series by default

  # Related content
  showRelatedContent = true  # Show related articles
  relatedContentLimit = 9  # Number of related articles

  # Draft and edit
  showDraftLabel = true  # Show "draft" badge on drafts
  showEdit = false  # Show "edit this page" link
  editURL = "https://github.com/user/repo/tree/main/content"
  editAppendPath = true  # Append file path to edit URL

  # Sharing
  sharingLinks = ["linkedin", "twitter", "reddit", "pinterest", "facebook", "email"]
  # Available: linkedin, twitter, bluesky, reddit, whatsapp, telegram,
  #            pinterest, facebook, email, line, threads, mastodon, x-twitter

  # Zen mode
  showZenMode = true  # Show zen reading mode button
```

## List Page Configuration

```toml
[list]
  showHero = true  # Show hero on list pages
  heroStyle = "background"  # Options: basic, big, background, thumbAndBackground
  layoutBackgroundBlur = true
  layoutBackgroundHeaderSpace = false

  showBreadcrumbs = false
  showSummary = true  # Show article summaries
  showTableOfContents = false

  # Views and likes
  showViews = false
  showLikes = false

  # Card view
  showCards = true  # Use card layout
  cardView = true
  cardViewScreenWidth = false
  constrainItemsWidth = false

  # Sorting and grouping
  orderByWeight = false  # Order by weight instead of date
  groupByYear = true  # Group posts by year
```

## Taxonomy Configuration

```toml
[taxonomy]  # For taxonomy list pages (e.g., /tags/)
  showTermCount = true  # Show number of articles per term
  showHero = true
  heroStyle = "background"
  showBreadcrumbs = false
  showViews = false
  showLikes = false
  showTableOfContents = true
  cardView = false

[term]  # For individual term pages (e.g., /tags/hugo/)
  showHero = true
  heroStyle = "background"
  showBreadcrumbs = false
  showViews = false
  showLikes = false
  showTableOfContents = true
  groupByYear = false
  cardView = true
  cardViewScreenWidth = false
```

## Sitemap Configuration

```toml
[sitemap]
  excludedKinds = []  # Exclude certain content types from sitemap
  # Example: ["taxonomy", "term"]
```

## Analytics Integrations

### Firebase (for views/likes)

```toml
[firebase]
  apiKey = "YOUR_API_KEY"
  authDomain = "your-app.firebaseapp.com"
  projectId = "your-project-id"
  storageBucket = "your-app.appspot.com"
  messagingSenderId = "123456789"
  appId = "1:123456789:web:abcdef"
  measurementId = "G-XXXXXXXXXX"
```

### Fathom Analytics

```toml
[fathomAnalytics]
  site = "ABC12345"  # Your Fathom site ID
  domain = "llama.yoursite.com"  # Optional custom domain
```

### Umami Analytics

```toml
[umamiAnalytics]
  websiteid = "ABC12345"  # Your Umami website ID
  domain = "llama.yoursite.com"  # Your Umami instance domain
  dataDomains = "yoursite.com,yoursite2.com"  # Comma-separated domains
  scriptName = ""  # Custom script name
  enableTrackEvent = false  # Enable event tracking
```

### Seline Analytics

```toml
[selineAnalytics]
  token = "XXXXXX"
  enableTrackEvent = false
```

## Widgets

### Buy Me a Coffee

```toml
[buymeacoffee]
  identifier = "yourusername"  # Your Buy Me a Coffee username
  globalWidget = true  # Show floating widget
  globalWidgetMessage = "Support my work!"
  globalWidgetColor = "#FFDD00"
  globalWidgetPosition = "right"  # Options: left, right
```

## Search Engine Verification

```toml
[verification]
  google = ""  # Google Search Console verification code
  bing = ""  # Bing Webmaster verification code
  pinterest = ""  # Pinterest verification code
  yandex = ""  # Yandex verification code
```

## RSS Integration

```toml
[rssnext]
  feedId = ""  # RSS Next feed ID
  userId = ""  # RSS Next user ID
```

## Advertisement

```toml
[advertisement]
  adsense = ""  # Google AdSense code
```

---

## Common Configurations

### Minimal Blog

```toml
[homepage]
  layout = "page"
  showRecent = true
  showRecentItems = 10

[article]
  showDate = true
  showReadingTime = true
  showTableOfContents = true
  showAuthor = false
```

### Portfolio Site

```toml
[homepage]
  layout = "profile"
  homepageImage = "/img/profile.jpg"
  showRecent = true
  showMoreLinkDest = "/projects"

[list]
  showCards = true
  cardView = true
```

### Documentation Site

```toml
[homepage]
  layout = "page"
  showRecent = false

[article]
  showDate = false
  showAuthor = false
  showBreadcrumbs = true
  showTableOfContents = true
  showEdit = true
  editURL = "https://github.com/user/repo/tree/main/content"
```

---

## Tips

1. **Logo**: Place in `assets/img/` and reference as `logo = "img/logo.png"` in language files
2. **Hero images**: Use `/img/...` (with slash) for static images
3. **Color schemes**: See https://blowfish.page/docs/getting-started/#colour-schemes
4. **Custom CSS**: Create `assets/css/custom.css` for overrides
5. **Testing**: Use `hugo server -D` to preview changes live

## More Information

- **Full documentation**: https://blowfish.page/docs/
- **Configuration guide**: https://blowfish.page/docs/configuration/
- **Example site**: https://github.com/nunocoracao/blowfish/tree/main/exampleSite
