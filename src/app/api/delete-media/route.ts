import { deleteFile } from "@/lib/cloudinary";
import { resolveResourceType } from "@/utils/get-resource-type";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    const { publicId, format } = await req.json();

    if (!publicId || !format) {
      return NextResponse.json(
        { message: "Please Provide Public Id and Format" },
        { status: 400 }
      );
    }

    const resourceType = resolveResourceType(format); // 🧠 smart logic
    console.log("format", resourceType);

    const res = await deleteFile(publicId, resourceType);

    if (!res.success) {
      return NextResponse.json(
        { success: false, message: "Failed To Delete Media" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Media Deleted Successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error In Deleting Media" },
      { status: 500 }
    );
  }
}
