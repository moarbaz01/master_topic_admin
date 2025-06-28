import axios from "axios";

export const CloudinaryService = {
  async deleteMedia(publicId: string, format: string) {
    try {
      const response = await axios.delete("/api/delete-media", {
        data: {
          publicId,
          format,
        },
      });

      if (response.status !== 200 || !response.data.success) {
        throw new Error(response.data.message || "Failed to delete media");
      }

      return response.data;
    } catch (error: any) {
      throw new Error(error?.response?.data?.message || error.message);
    }
  },
};
