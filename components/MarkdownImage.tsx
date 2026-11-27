import Image from "next/image";
import path from "path";
import fs from "fs";
import sharp from "sharp";

async function getLocalImageDimensions(src: string) {
  const filePath = path.join(process.cwd(), "public", src);

  if (!fs.existsSync(filePath)) return null;

  const metadata = await sharp(filePath).metadata();

  if (!metadata.width || !metadata.height) return null;

  return { width: metadata.width, height: metadata.height };
}

type MarkdownImageProps = {
  src?: string;
  alt?: string;
  // The text in quotes after the image path. It's shown as the caption.
  title?: string;
};

export default async function MarkdownImage({ src, alt, title }: MarkdownImageProps) {
  if (!src) return null;

  const isLocal = src.startsWith("/");
  const dimensions = isLocal ? await getLocalImageDimensions(src) : null;

  const image = dimensions ? (
    <Image
      src={src}
      alt={alt ?? ""}
      width={dimensions.width}
      height={dimensions.height}
      sizes="(min-width: 900px) 900px, 100vw"
      className="w-full h-auto"
    />
  ) : (
    <img src={src} alt={alt ?? ""} loading="lazy" className="w-full h-auto" />
  );

  const caption = title?.trim();

  // No caption: the image stays exactly as before
  if (!caption) return image;

  // Spans, not <figure>, because Markdown puts images inside a <p>,
  // and a <figure> isn't allowed in there.
  return (
    <span className="post-figure">
      {image}
      <span className="post-caption">{caption}</span>
    </span>
  );
}