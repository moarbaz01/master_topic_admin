// Smart resource type resolver
export function resolveResourceType(format: string): "image" | "video" | "raw" {
  const imageFormats = ["jpg", "jpeg", "png", "webp", "gif", "svg", "pdf"];
  const videoFormats = ["mp4", "webm", "mov", "avi"];
  const rawFormats = ["docx", "pptx", "zip", "txt"];

  if (imageFormats.includes(format)) return "image";
  if (videoFormats.includes(format)) return "video";
  if (rawFormats.includes(format)) return "raw";

  return "image"; // fallback
}
