export function getThumbnailUrl(url: string, type: string) {
  if (!url.includes("/upload/")) return url;

  if (type === "image") {
    return url.replace("/upload/", "/upload/w_200,h_200,c_fill/");
  }

  if (type === "video") {
    return url
      .replace("/upload/", "/upload/so_1,du_1,w_300,h_200,c_fill/")
      .replace(/\.(mp4|webm|mov)/, ".jpg");
  }

  if (type === "pdf") {
    return url
      .replace("/upload/", "/upload/w_300,h_400,c_fill,page=1/")
      .replace(".pdf", ".jpg");
  }

  return url;
}


