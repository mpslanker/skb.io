+++
title = "Content Organization Guide"
date = "2025-10-15"
draft = false
description = "How to organize and create content using page bundles"
tags = ["content", "page-bundles", "guide"]
weight = 10
authors = ['mslanker']
categories = ['Documentation']
+++


# Content Organization Guide

This site uses Hugo **page bundles** for all content. This keeps markdown files and their associated images together.

## Page Bundle Structure

### For Blog Posts, Projects, and Notes

```
content/blog/
├── _index.md                    # Section page (list of all blog posts)
├── my-first-post/              # Page bundle (folder = post)
│   ├── index.md                # Main content (English)
│   ├── index.ja.md             # Japanese translation
│   ├── hero.jpg                # Hero/featured image
│   ├── diagram.png             # Article images
│   └── screenshot.jpg          # More images
└── another-post/
    ├── index.md
    └── photo.jpg
```

### For Static Pages (About, Contact, etc.)

```
content/about/
├── index.md                    # English version
└── index.ja.md                 # Japanese version
```

## Creating New Content

### Method 1: Hugo Command (Creates Bundle Automatically)

```bash
# Create new blog post
hugo new content/blog/my-new-post/index.md

# Create new project
hugo new content/projects/my-project/index.md

# Create new note
hugo new content/notes/quick-thought/index.md
```

### Method 2: Manual Creation

```bash
# Create the directory
mkdir -p content/blog/my-new-post

# Create the markdown file
touch content/blog/my-new-post/index.md

# Add front matter and content
```

## Front Matter Templates

### Blog Post (Tutorials & Guides)

```yaml
---
title: "Learning Blender in 2024"
date: 2024-01-20T20:50:10-07:00
authors: ['mslanker']
description: "A structured approach to learning Blender 3D modeling, from absolute beginner to creating your first bedroom scene."
draft: false

categories: ['3D Modeling']
tags: ['blender', '3d-modeling', 'tutorial', 'learning', 'creative']
featuredImage: 'featured.png'
---

Your tutorial content here...
```

### Project (Showcases)

```yaml
---
title: "Talos + Kubernetes Home Lab"
date: 2025-06-08T23:38:28Z
authors: ['mslanker']
description: "Setting up a 2-node Kubernetes cluster using Talos Linux in a home lab environment for learning and experimentation."
draft: false

# Project-specific front matter
projectType: 'infrastructure'
status: 'in-progress'  # completed, in-progress, planning, archived
technologies: ['kubernetes', 'talos', 'proxmox', 'containers']
github: 'https://github.com/username/repo'
demo: 'https://demo.example.com'

categories: ['Projects']
tags: ['kubernetes', 'talos', 'homelab', 'devops', 'containers', 'proxmox', 'infrastructure']
---

## Overview

Project details...
```

### Gallery (Visual Content)

```yaml
---
title: "Generative Art Gallery"
date: 2023-12-26T22:05:12Z
authors: ['mslanker']
description: "A collection of generative art pieces created using Processing, strange attractors, and creative coding techniques."
draft: false

# Gallery-specific front matter
galleryType: 'generative-art'
medium: 'digital'  # digital, traditional, mixed-media, photography
techniques: ['processing', 'strange-attractors', 'p5js', 'ronin']
featuredImage: 'featured.png'

categories: ['Gallery']
tags: ['generative-art', 'processing', 'creative-coding', 'strange-attractors', 'ronin', 'p5js', 'digital-art']
---

Your gallery content here...
```

### Note (Digital Garden)

```yaml
---
title: "A place for various projects"
date: 2021-03-03T12:39:28-07:00
authors: ['mslanker']
description: "Initial thoughts on starting this site to track projects and learning."
draft: false

# Note-specific front matter
noteType: 'thought'  # thought, idea, observation, tip, quote
mood: 'hopeful'  # optional: hopeful, excited, frustrated, curious, etc.

categories: ['Notes']
tags: ['meta', 'site-launch', 'projects', 'learning']
---

Short note content...
```

## Adding Images

### Local Images (in same folder as index.md)

```markdown
# Simple reference
![Alt text](image.jpg)

# With Hugo figure shortcode (more options)
{{< figure src="image.jpg" alt="Description" caption="Caption text" >}}

# Responsive with Hugo
![Alt text](image.jpg)
```

### External Images (CDN/hosted elsewhere)

```markdown
{{< external-img
    src="https://cdn.example.com/photo.jpg"
    alt="Description"
    caption="Optional caption"
>}}
```

### Hero/Featured Images

Add to front matter:

```yaml
---
title: "My Post"
# Hero image (from same folder)
heroImage: "hero.jpg"

# Or featured image
featuredImage: "featured.jpg"

# Control hero style
heroStyle: "background"  # Options: basic, big, background, thumbAndBackground
---
```

## Image Best Practices

### For Local Images (in page bundle)

1. **Size**: Aim for < 500KB per image
2. **Dimensions**: Max 2000px wide for retina displays
3. **Format**:
   - JPEG for photos
   - PNG for graphics/screenshots with transparency
   - WebP for best compression (if supported)
   - SVG for logos/icons

### For Photography/Large Images

Use external CDN (see `IMAGE_HOSTING.md`) and the `external-img` shortcode.

## Migrating Old Content

### If you have a folder structure like:

```
old-blog/
├── post-1.md
├── post-1/
│   └── images/...
└── post-2.md
```

### Use the migration script:

```bash
# Migrate single post
./migrate-content.sh ~/old-blog/post-1.md blog

# The script will:
# 1. Create content/blog/post-1/
# 2. Copy post-1.md to content/blog/post-1/index.md
# 3. Copy any images from post-1/images/ to content/blog/post-1/
```

### Or manually:

```bash
# 1. Create bundle directory
mkdir -p content/blog/my-old-post

# 2. Move markdown file and rename to index.md
cp ~/old-blog/my-old-post.md content/blog/my-old-post/index.md

# 3. Copy images to same directory
cp ~/old-blog/my-old-post/*.{jpg,png,gif} content/blog/my-old-post/

# 4. Update image references in markdown (remove paths)
# Change: ![](images/photo.jpg)
# To:     ![](photo.jpg)
```

## Content Sections & Organization

### **Content Type Guidelines**

| **Section** | **Purpose** | **When to Use** | **Example Content** |
|-------------|-------------|-----------------|-------------------|
| **`/blog`** | Tutorials, guides, learning journeys | Step-by-step tutorials, how-to guides, learning experiences | "Learning Blender", "Setting up Python Environment" |
| **`/projects`** | Detailed project showcases | Completed projects, ongoing work, technical deep-dives | "Talos K8s Homelab", "Docker + Synology Setup" |
| **`/gallery`** | Visual content, artwork | Art pieces, screenshots, visual projects | "Generative Art Gallery", "Blender Renders" |
| **`/notes`** | Quick thoughts, digital garden | Short observations, ideas, quick tips | "First Post", "Random Thoughts" |
| **`/docs`** | Site documentation | How-to guides for the site itself | This guide, setup instructions |
| **`/about`** | Personal information | About the author, site purpose | Personal bio, site mission |
| **`/contact`** | Contact information | How to reach the author | Contact form, social links |

### **Content Decision Tree**

```
New Content Idea
├── Is it a step-by-step tutorial or guide?
│   └── YES → /blog/
├── Is it a completed project or technical showcase?
│   └── YES → /projects/
├── Is it visual art, screenshots, or media?
│   └── YES → /gallery/
├── Is it a quick thought or observation?
│   └── YES → /notes/
└── Is it site documentation?
    └── YES → /docs/
```

## Multilingual Content

### Creating Japanese Versions

For each `index.md`, create corresponding `index.ja.md`:

```
content/blog/my-post/
├── index.md       # English (required)
└── index.ja.md    # Japanese (optional)
```

Both files can share the same images - just reference them normally.

### Front Matter for Translations

```yaml
# English version (index.md)
---
title: "Hello World"
description: "A greeting"
---

# Japanese version (index.ja.md)
---
title: "こんにちは世界"
description: "挨拶"
---
```

Images work the same:
```markdown
# In both index.md and index.ja.md
![Photo](photo.jpg)
```

## URL Structure

Page bundles create clean URLs:

```
content/blog/my-post/index.md  →  /blog/my-post/
content/blog/my-post/index.ja.md  →  /ja/blog/my-post/
```

## Drafts

Mark posts as drafts to hide them:

```yaml
---
title: "Work in Progress"
draft: true
---
```

View drafts locally:
```bash
hugo server -D
```

They won't appear in production builds.

## Tips

1. **Keep folders organized**: One folder per post/project
2. **Image names**: Use descriptive names (`hero-image.jpg` not `img1.jpg`)
3. **Alt text**: Always add meaningful alt text for accessibility
4. **Optimize before adding**: Compress large images before committing
5. **External for large files**: Use CDN for photography/large media
6. **Consistent naming**: Use kebab-case for folder names (`my-post` not `My Post`)

## Quick Reference Commands

### Creating New Content

```bash
# Blog post (tutorial/guide)
hugo new content/blog/learning-docker/index.md

# Project showcase
hugo new content/projects/my-new-project/index.md

# Gallery item
hugo new content/gallery/blender-artwork/index.md

# Note (digital garden)
hugo new content/notes/quick-thought/index.md

# Documentation
hugo new content/docs/new-guide/index.md
```

## Modern Features & Shortcodes

### Available Shortcodes

#### Tech Stack Display
```markdown
{{< tech-stack technologies="kubernetes,docker,go,react" size="medium" >}}
```

#### Project Status
```markdown
{{< project-status status="in-progress" icon="🚧" >}}
```

#### Reading Time
```markdown
{{< reading-time words="500" speed="200" >}}
```

#### TypeIt Animation
```markdown
{{< typeit speed="100" lifeLike="true" >}}
Your animated text here
{{< /typeit >}}
```

#### SKB TypeIt (Pre-configured)
```markdown
{{< skb-typeit class="text-xl text-neutral-800 dark:text-neutral-300 mb-8" >}}
```

### Development Commands

```bash
# Start dev server (see drafts)
hugo server -D

# Build for production (excludes drafts)
hugo --gc --minify

# Find all drafts
grep -r "draft: true" content/

# List all content
hugo list all

# List content by section
hugo list all --path content/blog
hugo list all --path content/projects
```

### Content Management

```bash
# Move content between sections
mv content/blog/old-post content/projects/old-post

# Create multilingual content
hugo new content/blog/post-name/index.ja.md

# Find content by category
grep -r "categories: \['Projects'\]" content/

# Find content by tag
grep -r "tags: \['kubernetes'\]" content/
```

## More Information

- **Hugo Page Bundles**: https://gohugo.io/content-management/page-bundles/
- **Hugo Image Processing**: https://gohugo.io/content-management/image-processing/
- **Blowfish Content**: https://blowfish.page/docs/content-examples/
