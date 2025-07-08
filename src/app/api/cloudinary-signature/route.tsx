import { cloudinary } from "@/lib/cloudinary";
import { verifiedUserAsyncHandler } from "@/utils/asyncHandler";
import { NextResponse } from "next/server";

export const POST = verifiedUserAsyncHandler(async (req: Request) => {
  try {
    const { paramsToSign } = await req.json();

    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET!
    );

    return NextResponse.json({
      signature,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
});
