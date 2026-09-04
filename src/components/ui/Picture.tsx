import { fallbackSrc, srcSet, type ResponsiveImage } from '../../content/site';

interface PictureProps {
  image: ResponsiveImage;
  /** Empty string marks the image as decorative; pair it with `aria-hidden`. */
  alt: string;
  /**
   * How wide the image renders at each breakpoint. Getting this right is what
   * lets the browser pick a small derivative — without it every visitor is
   * served the widest entry in the `srcset`.
   */
  sizes: string;
  className?: string;
  /** Set on the one image that is likely to be the LCP; everything else lazies. */
  priority?: boolean;
}

/**
 * AVIF -> WebP -> JPEG in descending order of savings, each with the full
 * responsive `srcset`. The `<picture>` is `display: contents` so it never adds
 * a box of its own — the `<img>` keeps whatever positioning the caller gives it.
 */
export function Picture({
  image,
  alt,
  sizes,
  className,
  priority = false,
}: PictureProps) {
  return (
    <picture className="contents">
      <source type="image/avif" srcSet={srcSet(image, 'avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet(image, 'webp')} sizes={sizes} />
      <img
        src={fallbackSrc(image)}
        alt={alt}
        aria-hidden={alt === '' ? true : undefined}
        width={image.width}
        height={image.height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding={priority ? 'sync' : 'async'}
        className={className}
      />
    </picture>
  );
}
