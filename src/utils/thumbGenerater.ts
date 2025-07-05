export function getThumbnailUrl(url: string, format: string) {
  if (!url.includes("/upload/")) return url;

  const imageFormats = ["jpg", "jpeg", "png", "webp", "gif", "svg"];
  const videoFormats = ["mp4", "webm", "mov"];
  const audioFormats = ["mp3", "wav", "ogg"];
  const pdfFormats = ["pdf"];

  if (imageFormats.includes(format)) {
    return url.replace("/upload/", "/upload/w_200,h_200,c_fill/");
  }

  if (videoFormats.includes(format)) {
    return url
      .replace("/upload/", "/upload/so_1,du_1,w_300,h_200,c_fill/")
      .replace(/\.(mp4|webm|mov)/, ".jpg"); // Show thumbnail for first frame
  }

  if (pdfFormats.includes(format)) {
  return url
    .replace("/upload/", "/upload/w_300,h_400,c_fill,pg_1/")
    .replace(".pdf", ".jpg");
}


  if (audioFormats.includes(format)) {
    return "/placeholders/audio-icon.png"; // fallback image for audio
  }

  // fallback for unknown types
  return "/placeholders/file-icon.png";
}
