import Image from "next/image";

export function MediaPreview({
  url,
  small,
}: {
  url: string;
  small?: boolean;
}) {
  const size = small ? 60 : 250;

  if (url.endsWith(".mp3")) {
    return (
      <audio controls className="w-full h-8 mt-1">
        <source src={url} type="audio/mp3" />
      </audio>
    );
  }

  if (url.endsWith(".mp4")) {
    return (
      <video
        controls
        width={size}
        height={size}
        className="rounded border max-w-full"
      >
        <source src={url} type="video/mp4" />
      </video>
    );
  }

  if (url.match(/\.(jpg|jpeg|png|webp)$/)) {
    return (
      <Image
        src={url}
        alt="Media"
        width={size}
        height={size}
        className="object-cover rounded"
      />
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-500 underline text-xs"
    >
      Open Media
    </a>
  );
}
