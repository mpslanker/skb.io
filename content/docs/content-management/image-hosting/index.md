+++
title = "Image Hosting Options"
date = "2025-10-15"
draft = false
description = "Guide to external image hosting for photography and large media"
tags = ["images", "cdn", "hosting"]
weight = 20
authors = ['mslanker']
categories = ['Documentation']
+++


# Image Hosting Options for Photography Gallery

Since GitHub has file size limits and you don't want to store large photography images in your repository, here are the best options for external image hosting.

## Quick Comparison

| Service | Free Tier | Bandwidth | Processing | Best For | Cost |
|---------|-----------|-----------|------------|----------|------|
| **Cloudflare R2** | 10GB storage | 10GB/month (free) | No | Cost-conscious | $0.015/GB storage after free tier |
| **ImageKit** | 20GB bandwidth | 20GB/month | Yes | Performance | Free tier generous, $49/mo after |
| **Cloudinary** | 25 credits | ~25GB/month | Yes | Full features | Free tier good, $89/mo Pro |
| **imgix** | Connect your storage | Varies | Yes | High volume | $49/mo minimum |
| **Bunny CDN** | No free tier | Pay as you go | Optional | Full control | $0.01/GB (very cheap) |

## Recommended Options

### 1. Cloudflare R2 (Best Value)

**Pros:**
- Extremely cost-effective ($0.015/GB storage, $0.01/GB bandwidth after free tier)
- No egress fees (unlike S3)
- Fast global CDN
- S3-compatible API
- 10GB free storage

**Cons:**
- No built-in image processing
- Manual image optimization needed
- More technical setup

**Setup:**
1. Create Cloudflare account
2. Navigate to R2 Object Storage
3. Create a bucket (e.g., "skb-photos")
4. Enable public access for read
5. Upload images
6. Get public URL: `https://pub-xxxxx.r2.dev/your-image.jpg`

**Usage:**
```markdown
{{< external-img
    src="https://pub-xxxxx.r2.dev/photos/sunset.jpg"
    alt="Beautiful sunset"
>}}
```

### 2. ImageKit (Best for Ease of Use)

**Pros:**
- Automatic image optimization
- Real-time transformations (resize, crop, format conversion)
- URL-based image manipulation
- Generous free tier (20GB bandwidth)
- Easy to use dashboard

**Cons:**
- More expensive at scale
- 20GB storage limit on free tier

**Setup:**
1. Sign up at https://imagekit.io/
2. Go to Media Library
3. Upload images
4. Get URL endpoint: `https://ik.imagekit.io/yourname/`

**Usage with Transformations:**
```markdown
{{< external-img
    src="https://ik.imagekit.io/yourname/sunset.jpg?tr=w-1200,q-80,f-webp"
    alt="Beautiful sunset"
>}}
```

Transformations:
- `w-1200` - width 1200px
- `q-80` - quality 80%
- `f-webp` - convert to WebP format

### 3. Cloudinary (Best Full-Featured)

**Pros:**
- Powerful image processing
- Automatic format selection
- AI-powered features
- Great free tier
- CDN included

**Cons:**
- Credit system can be confusing
- Expensive after free tier

**Setup:**
1. Sign up at https://cloudinary.com/
2. Upload images via Media Library
3. Get cloud name: `https://res.cloudinary.com/yourcloudname/`

**Usage:**
```markdown
{{< external-img
    src="https://res.cloudinary.com/yourcloudname/image/upload/c_scale,w_1200/v1/photos/sunset.jpg"
    alt="Beautiful sunset"
>}}
```

## Recommendations by Use Case

### Just Starting Out
**ImageKit** - Easiest to use, good free tier, automatic optimization

### Cost-Conscious
**Cloudflare R2** - Cheapest at scale, but requires manual optimization

### High-Quality Photography Portfolio
**Cloudinary** or **imgix** - Best image processing, professional features

### High Traffic Site
**Bunny CDN** or **Cloudflare R2** - Most cost-effective bandwidth

## Image Optimization Tips

### Before Upload

1. **Resize images:**
   - Max width: 2000-2400px for high-res displays
   - Use 1200-1600px for regular display

2. **Compress images:**
   - Use tools like:
     - [TinyPNG](https://tinypng.com/)
     - [Squoosh](https://squoosh.app/)
     - [ImageOptim](https://imageoptim.com/) (Mac)

3. **Choose format:**
   - WebP for modern browsers (best compression)
   - JPEG for photos
   - PNG for graphics with transparency

### Using Image Transformations

With ImageKit or Cloudinary, you can serve responsive images:

```markdown
{{< external-img
    src="https://ik.imagekit.io/yourname/photo.jpg?tr=w-400"
    alt="Mobile version"
>}}

{{< external-img
    src="https://ik.imagekit.io/yourname/photo.jpg?tr=w-1200"
    alt="Desktop version"
>}}
```

## Hugo Image Processing Alternative

If you want to store some images in your repo (smaller ones), Hugo has built-in image processing:

```markdown
{{< figure src="local-image.jpg" alt="Description" >}}
```

Hugo will automatically:
- Generate multiple sizes
- Create WebP versions
- Optimize for performance

But this increases build time and repo size, so use sparingly.

## Gallery Structure Recommendation

### Organize by Collection

```
content/
└── gallery/
    ├── _index.md
    ├── japan-2024/
    │   ├── index.md
    │   └── [metadata]
    ├── street-photography/
    │   ├── index.md
    │   └── [metadata]
    └── nature/
        ├── index.md
        └── [metadata]
```

### Example Gallery Post

```markdown
---
title: "Japan 2024"
date: 2025-10-15
description: "Photography from my trip to Japan"
tags: ["travel", "japan", "photography"]
---

## Tokyo Nights

{{< external-img
    src="https://your-cdn.com/japan/tokyo-night-1.jpg"
    alt="Shibuya crossing at night"
    caption="Shibuya Crossing, Tokyo"
>}}

{{< external-img
    src="https://your-cdn.com/japan/tokyo-night-2.jpg"
    alt="Neon lights in Shinjuku"
    caption="Neon streets of Shinjuku"
>}}

## Kyoto Temples

{{< external-img
    src="https://your-cdn.com/japan/kyoto-temple-1.jpg"
    alt="Fushimi Inari Shrine"
    caption="Thousands of torii gates at Fushimi Inari"
>}}
```

## Cost Estimation Examples

### Small Site (< 1000 visitors/month)
- **Free tier:** ImageKit, Cloudinary, Cloudflare R2 (all free)

### Medium Site (10,000 visitors/month, ~50GB bandwidth)
- **Cloudflare R2:** ~$0.50/month
- **ImageKit:** Free tier might suffice, or $49/month
- **Cloudinary:** ~$89/month

### Large Site (100,000 visitors/month, 500GB bandwidth)
- **Cloudflare R2:** ~$5/month
- **Bunny CDN:** ~$5/month
- **ImageKit:** $149/month
- **Cloudinary:** Custom pricing

## My Recommendation

Start with **ImageKit** for ease of use and automatic optimization. If your site grows and bandwidth costs become significant, migrate to **Cloudflare R2** + manual optimization for the best value.

## Migration Between Services

All these services support S3-compatible APIs, so migration is straightforward:

1. Export images from current service
2. Upload to new service
3. Update URLs in your content using search & replace
4. Test thoroughly before deactivating old service

## Questions?

- Check service documentation
- Test with a few images first
- Monitor bandwidth usage
- Set up billing alerts
