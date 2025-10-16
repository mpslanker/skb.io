+++
title = "Content Creation Commands"
date = "2025-10-15"
draft = false
description = "Quick reference for creating different types of content with proper front matter"
tags = ["content", "commands", "reference"]
weight = 20
authors = ['mslanker']
categories = ['Documentation']
+++


# Content Creation Commands

This guide provides quick commands and templates for creating different types of content on the site.

## Content Type Overview

| **Type** | **Command** | **Purpose** | **Front Matter** |
|----------|-------------|-------------|------------------|
| **Blog** | `hugo new content/blog/name/index.md` | Tutorials, guides, learning | Standard + categories/tags |
| **Project** | `hugo new content/projects/name/index.md` | Project showcases | Project-specific fields |
| **Gallery** | `hugo new content/gallery/name/index.md` | Visual content | Gallery-specific fields |
| **Note** | `hugo new content/notes/name/index.md` | Quick thoughts | Note-specific fields |
| **Docs** | `hugo new content/docs/name/index.md` | Site documentation | Standard |

## Quick Creation Commands

### Blog Posts (Tutorials & Guides)

```bash
# Create a new tutorial
hugo new content/blog/learning-kubernetes/index.md

# Create with featured image
hugo new content/blog/docker-basics/index.md
# Then add featuredImage: 'featured.png' to front matter
```

**Template Front Matter:**
```yaml
---
title: "Learning Kubernetes"
date: 2025-10-15
authors: ['mslanker']
description: "Step-by-step guide to getting started with Kubernetes"
draft: false

categories: ['DevOps']
tags: ['kubernetes', 'tutorial', 'containers', 'learning']
featuredImage: 'featured.png'
---
```

### Projects (Showcases)

```bash
# Create a new project
hugo new content/projects/homelab-setup/index.md

# Create with docs subdirectory
hugo new content/projects/web-app/index.md
mkdir content/projects/web-app/docs
```

**Template Front Matter:**
```yaml
---
title: "Homelab Setup"
date: 2025-10-15
authors: ['mslanker']
description: "Complete homelab infrastructure setup with Proxmox and Docker"
draft: false

# Project-specific fields
projectType: 'infrastructure'
status: 'completed'  # completed, in-progress, planning, archived
technologies: ['proxmox', 'docker', 'nginx', 'ssl']
github: 'https://github.com/username/homelab'
demo: 'https://homelab.example.com'

categories: ['Projects']
tags: ['homelab', 'infrastructure', 'docker', 'proxmox', 'devops']
---
```

### Gallery (Visual Content)

```bash
# Create a new gallery item
hugo new content/gallery/blender-renders/index.md

# Create with multiple images
hugo new content/gallery/creative-coding/index.md
# Add multiple images to the same directory
```

**Template Front Matter:**
```yaml
---
title: "Blender Renders"
date: 2025-10-15
authors: ['mslanker']
description: "Collection of 3D renders created in Blender"
draft: false

# Gallery-specific fields
galleryType: '3d-art'
medium: 'digital'  # digital, traditional, mixed-media, photography
techniques: ['blender', '3d-modeling', 'rendering', 'texturing']
featuredImage: 'featured.png'

categories: ['Gallery']
tags: ['blender', '3d-art', 'rendering', 'digital-art', 'creative']
---
```

### Notes (Digital Garden)

```bash
# Create a quick note
hugo new content/notes/random-thought/index.md

# Create an idea
hugo new content/notes/project-idea/index.md
```

**Template Front Matter:**
```yaml
---
title: "Random Thought"
date: 2025-10-15
authors: ['mslanker']
description: "Quick observation about technology"
draft: false

# Note-specific fields
noteType: 'thought'  # thought, idea, observation, tip, quote
mood: 'curious'  # optional: hopeful, excited, frustrated, curious, etc.

categories: ['Notes']
tags: ['meta', 'thoughts', 'technology']
---
```

### Documentation

```bash
# Create new documentation
hugo new content/docs/new-feature/index.md

# Create with subsections
hugo new content/docs/advanced-setup/index.md
mkdir content/docs/advanced-setup/subsections
```

**Template Front Matter:**
```yaml
---
title: "New Feature Guide"
date: 2025-10-15
authors: ['mslanker']
description: "How to use the new feature"
draft: false

categories: ['Documentation']
tags: ['guide', 'feature', 'how-to']
---
```

## Batch Creation Scripts

### Create Multiple Content Types

```bash
#!/bin/bash
# create-content.sh

# Create a blog post
hugo new content/blog/$1/index.md

# Create a project
hugo new content/projects/$1/index.md

# Create a note
hugo new content/notes/$1/index.md

echo "Created content for: $1"
echo "Edit the front matter in each file to match the content type"
```

Usage:
```bash
chmod +x create-content.sh
./create-content.sh my-topic
```

### Create Series of Related Content

```bash
#!/bin/bash
# create-series.sh

SERIES_NAME=$1
POSTS=("part-1" "part-2" "part-3")

for post in "${POSTS[@]}"; do
    hugo new content/blog/$SERIES_NAME-$post/index.md
    echo "Created: $SERIES_NAME-$post"
done

echo "Created series: $SERIES_NAME"
```

Usage:
```bash
chmod +x create-series.sh
./create-series.sh kubernetes-tutorial
```

## Content Validation

### Check Front Matter

```bash
# Validate all content has required fields
grep -r "draft: false" content/ | wc -l  # Count published content
grep -r "description:" content/ | wc -l  # Count with descriptions
grep -r "categories:" content/ | wc -l   # Count with categories
grep -r "tags:" content/ | wc -l         # Count with tags
```

### Find Missing Fields

```bash
# Find content without descriptions
grep -L "description:" content/*/index.md

# Find content without categories
grep -L "categories:" content/*/index.md

# Find content without tags
grep -L "tags:" content/*/index.md
```

## Content Organization

### Move Content Between Sections

```bash
# Move blog post to projects
mv content/blog/old-tutorial content/projects/old-tutorial

# Move project to gallery
mv content/projects/art-project content/gallery/art-project

# Update front matter after moving
# Change categories from ['Blog'] to ['Projects'] or ['Gallery']
```

### Bulk Updates

```bash
# Update all blog posts to have a specific tag
find content/blog -name "index.md" -exec sed -i 's/tags: \[/tags: ["tutorial", /' {} \;

# Update all projects to have a specific category
find content/projects -name "index.md" -exec sed -i 's/categories: \[/categories: ["Projects", /' {} \;
```

## Best Practices

### Naming Conventions

- **Folders**: Use kebab-case (`my-project`, `learning-docker`)
- **Images**: Use descriptive names (`hero-image.jpg`, `screenshot-1.png`)
- **Tags**: Use lowercase, hyphenated (`web-development`, `machine-learning`)

### Content Structure

- **Blog**: Focus on tutorials and learning experiences
- **Projects**: Detailed showcases with technical details
- **Gallery**: Visual content with technique descriptions
- **Notes**: Quick thoughts and observations
- **Docs**: Site-specific documentation

### Front Matter Consistency

- Always include `description` for SEO
- Use consistent `categories` and `tags`
- Include `featuredImage` for visual content
- Use appropriate content-type-specific fields

## Troubleshooting

### Common Issues

1. **Missing featured image**: Add `featuredImage: 'image.png'` to front matter
2. **Wrong category**: Update `categories: ['CorrectCategory']`
3. **Missing tags**: Add `tags: ['tag1', 'tag2']`
4. **Draft not showing**: Use `hugo server -D` to see drafts

### Validation Commands

```bash
# Check for build errors
hugo --minify

# Validate content structure
hugo list all

# Check for missing images
find content -name "*.md" -exec grep -l "!\[.*\](" {} \; | xargs -I {} sh -c 'echo "Checking {}"; grep -o "!\[.*\]([^)]*)" {}'
```
