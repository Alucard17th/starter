# Images Guide

## Directory Structure
```
public/images/
├── hero/
│   ├── plumber-working-1.jpg      # Hero background
│   └── plumber-hero-2.jpg         # Alternative hero
├── about/
│   ├── plumbing-work-1.jpg        # About section grid (4 images)
│   ├── plumbing-work-2.jpg
│   ├── plumbing-work-3.jpg
│   └── plumbing-work-4.jpg
├── portfolio/
│   ├── bathroom-renovation.jpg     # Portfolio item 1
│   ├── kitchen-installation.jpg    # Portfolio item 2
│   ├── emergency-repair.jpg        # Portfolio item 3
│   └── drain-cleaning.jpg          # Portfolio item 4
├── testimonials/
│   ├── client-1.jpg               # Testimonial avatar 1
│   ├── client-2.jpg               # Testimonial avatar 2
│   ├── client-3.jpg               # Testimonial avatar 3
│   └── client-4.jpg               # Testimonial avatar 4
└── misc/
    ├── logo.png                   # Business logo (if any)
    └── favicon.ico                # Favicon
```

## Image Naming Convention

### Hero Section Images
- `hero/plumber-working-1.jpg` - Main hero background
- `hero/plumber-hero-2.jpg` - Alternative hero

### About Section Images (4 total)
- `about/plumbing-work-1.jpg`
- `about/plumbing-work-2.jpg`
- `about/plumbing-work-3.jpg`
- `about/plumbing-work-4.jpg`

### Portfolio Section Images (4 total)
- `portfolio/bathroom-renovation.jpg`
- `portfolio/kitchen-installation.jpg`
- `portfolio/emergency-repair.jpg`
- `portfolio/drain-cleaning.jpg`

### Testimonial Avatars (4 total)
- `testimonials/client-1.jpg`
- `testimonials/client-2.jpg`
- `testimonials/client-3.jpg`
- `testimonials/client-4.jpg`

## How to Use Images

Images in the `public/` directory are served from the root URL. Use them like this:

```jsx
<img src="/images/hero/plumber-working-1.jpg" alt="Plumber working" />
```

## Recommended Image Specs

### Hero Images
- **Size**: 1920x1080px (16:9 ratio)
- **Format**: JPG (for photos)
- **Quality**: 80-90% optimized
- **Subject**: Professional plumber at work

### About Section Images
- **Size**: 400x400px (1:1 ratio)
- **Format**: JPG
- **Quality**: 80-90% optimized
- **Subject**: Different plumbing work scenarios

### Portfolio Images
- **Size**: 600x400px (3:2 ratio)
- **Format**: JPG
- **Quality**: 80-90% optimized
- **Subject**: Completed projects

### Testimonial Avatars
- **Size**: 150x150px (1:1 ratio)
- **Format**: JPG or PNG
- **Quality**: 90% optimized
- **Subject**: Professional headshots or stock photos

## Image Optimization Tips

1. **Compress images** before uploading (use TinyPNG or similar)
2. **Use appropriate dimensions** - don't use huge images for small spaces
3. **Choose the right format** - JPG for photos, PNG for graphics
4. **Maintain consistent style** across all images
5. **Consider lazy loading** for better performance

## Current Unsplash URLs to Replace

Once you add your images, replace these URLs in the code:

### Hero Background
```jsx
// Replace this:
src="https://images.unsplash.com/photo-1621905252507-b35404cc3fff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"

// With this:
src="/images/hero/plumber-working-1.jpg"
```

### About Section Images
```jsx
// Replace these URLs:
'https://images.unsplash.com/photo-1584464491033-06628a3e3aa8?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80'
'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80'
'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80'
'https://images.unsplash.com/photo-1603796846097-bee99e4a7e30?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80'

// With these:
"/images/about/plumbing-work-1.jpg"
"/images/about/plumbing-work-2.jpg"
"/images/about/plumbing-work-3.jpg"
"/images/about/plumbing-work-4.jpg"
```

### Portfolio Images
```jsx
// Replace these URLs:
`https://images.unsplash.com/photo-${1581094794329 + index * 1000}?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80`

// With these:
"/images/portfolio/bathroom-renovation.jpg"
"/images/portfolio/kitchen-installation.jpg"
"/images/portfolio/emergency-repair.jpg"
"/images/portfolio/drain-cleaning.jpg"
```

### Testimonial Avatars
```jsx
// Replace these URLs:
`https://images.unsplash.com/photo-${1472099645785 + index * 1000}?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80`

// With these:
"/images/testimonials/client-1.jpg"
"/images/testimonials/client-2.jpg"
"/images/testimonials/client-3.jpg"
"/images/testimonials/client-4.jpg"
```

## Quick Setup

1. Create the directories in `public/images/`
2. Add your images following the naming convention
3. Replace the Unsplash URLs in the code
4. Test the pages to ensure images load correctly
