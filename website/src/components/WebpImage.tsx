import type { ImgHTMLAttributes } from "react";

/** WebP sibling for a local raster (/blog/a.png -> /blog/a.webp); other sources pass through. */
function webpSource(src: string): string | undefined {
  return /^\/blog\/[^/]+\.(png|jpe?g)$/i.test(src) ? src.replace(/\.(png|jpe?g)$/i, ".webp") : undefined;
}

type WebpImageProps = ImgHTMLAttributes<HTMLImageElement> & { src: string };

/**
 * Serves the WebP sibling (scripts/check-blog-images.mjs keeps it present) and keeps the original
 * file as fallback and as the share/structured-data image. `display: contents` leaves the img's
 * own layout classes working exactly as before.
 */
export default function WebpImage({ src, alt, ...props }: WebpImageProps) {
  const webp = webpSource(src);
  if (!webp) return <img src={src} alt={alt} {...props} />;
  return (
    <picture style={{ display: "contents" }}>
      <source srcSet={webp} type="image/webp" />
      <img src={src} alt={alt} {...props} />
    </picture>
  );
}
