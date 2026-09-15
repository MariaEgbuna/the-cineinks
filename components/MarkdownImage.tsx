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
};

export default async function MarkdownImage({ src, alt }: MarkdownImageProps) {
  if (!src) return null;

  const isLocal = src.startsWith("/");
  const dimensions = isLocal ? await getLocalImageDimensions(src) : null;

  if (!dimensions) {
    return <img src={src} alt={alt ?? ""} loading="lazy" className="w-full h-auto" />;
  }

  return (
    <Image
      src={src}
      alt={alt ?? ""}
      width={dimensions.width}
      height={dimensions.height}
      sizes="(min-width: 900px) 900px, 100vw"
      className="w-full h-auto"
    />
  );
}