import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const asyncHandler = (handler: (req: Request) => Promise<Response>) => {
  return async (req: Request): Promise<Response> => {
    try {
      return await handler(req);
    } catch (error: any) {
      console.error("[API_ERROR]", error);

      const message = error?.message || "Something went wrong";
      return NextResponse.json(
        { success: false, message },
        {
          status: error?.statusCode || 500,
        }
      );
    }
  };
};

export const verifiedUserAsyncHandler = (
  handler: (req: Request) => Promise<Response>
) => {
  return async (req: Request): Promise<Response> => {
    try {
      // If user is not verified
      const client = await createClient();
      const { data } = await client.auth.getUser();
      if (!data.user)
        return NextResponse.json(
          { success: false, message: "Unauthorized" },
          {
            status: 401,
          }
        );

      // Return Handler
      return await handler(req);
    } catch (error: any) {
      console.error("[API_ERROR]", error);

      const message = error?.message || "Something went wrong";
      return NextResponse.json(
        { success: false, message },
        {
          status: error?.statusCode || 500,
        }
      );
    }
  };
};
