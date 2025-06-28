import {
  v2 as cloudinary,
  UploadApiResponse,
  UploadApiErrorResponse,
} from "cloudinary";

// Type for our simplified response
type CloudinaryResponse = {
  url: string;
  public_id: string;
  resource_type: string;
  format: string;
  bytes: number;
};

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true, // Always use HTTPS
});

// const uploadFile = async (
//   file: File,
//   options: UploadApiOptions = {
//     folder: "uploads",
//     resource_type: "auto",
//   }
// ): Promise<CloudinaryResponse | null> => {
//   try {
//     // Convert file to base64
//     const arrayBuffer = await file.arrayBuffer();
//     const base64String = Buffer.from(arrayBuffer).toString("base64");
//     const dataUri = `data:${file.type};base64,${base64String}`;

//     // Upload with promise wrapper
//     const result = await new Promise<
//       UploadApiResponse | UploadApiErrorResponse
//     >((resolve) => {
//       cloudinary.uploader.upload(dataUri, options, (error, result) => {
//         if (error) resolve(error);
//         resolve(result!);
//       });
//     });

//     if ("error" in result) {
//       throw new Error(`Cloudinary error: ${result.error.message}`);
//     }

//     return {
//       url: result.secure_url,
//       public_id: result.public_id,
//       resource_type: result.resource_type,
//       format: result.format,
//       bytes: result.bytes,
//     };
//   } catch (error) {
//     console.error(
//       "Upload failed:",
//       error instanceof Error ? error.message : error
//     );
//     return null;
//   }
// };

const deleteFile = async (
  publicId: string,
  resourceType: "image" | "video" | "raw" = "image"
): Promise<{ success: boolean; message?: string }> => {
  try {
    const result = await new Promise<
      UploadApiResponse | UploadApiErrorResponse
    >((resolve) => {
      cloudinary.uploader.destroy(
        publicId,
        { resource_type: resourceType },
        (error, result) => {
          if (error) resolve(error);
          resolve(result!);
        }
      );
    });

    if ("error" in result) {
      throw new Error(result.error.message);
    }

    return {
      success: result.result === "ok",
      message: result.result === "ok" ? "File deleted successfully" : undefined,
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Deletion failed:", message);
    return { success: false, message };
  }
};

// const uploadFiles = async (
//   files: File[],
//   options?: UploadApiOptions
// ): Promise<Array<CloudinaryResponse | null>> => {
//   return Promise.all(files.map((file) => uploadFile(file, options)));
// };

export { cloudinary, deleteFile };
export type { CloudinaryResponse };
