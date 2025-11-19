import Image from 'next/image';

/**
 * Example component showing how to use images from /public/images/
 * 
 * To use this component:
 * 1. Upload an image to /public/images/
 * 2. Import this component
 * 3. Pass the image filename as a prop
 */

interface ImageExampleProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export default function ImageExample({ 
  src, 
  alt, 
  width = 800, 
  height = 600,
  className = '' 
}: ImageExampleProps) {
  return (
    <Image
      src={`/images/${src}`}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
}

