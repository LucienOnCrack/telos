# Image Content Directory

This directory is for storing all image content used on the website.

## How to Use

1. **Upload Images**: Simply drag and drop or copy your images into this folder
2. **Access in Code**: Reference images using `/images/your-image-name.jpg`

## Example Usage

In your Next.js components:

```tsx
import Image from 'next/image'

<Image 
  src="/images/your-image.jpg" 
  alt="Description"
  width={800}
  height={600}
/>
```

Or with regular img tags:

```tsx
<img src="/images/your-image.jpg" alt="Description" />
```

## Supported Formats

- JPG/JPEG
- PNG
- GIF
- SVG
- WebP
- AVIF

## Organization

You can create subdirectories to organize your images:
- `/public/images/logos/`
- `/public/images/products/`
- `/public/images/blog/`
- etc.

