import prisma from "@/lib/db";
import { leadFormSchema } from "@/lib/validator";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const result = leadFormSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid data",
          issues: result.error.flatten(),
        },
        { status: 400 },
      );
    }

    const newLead = await prisma.leads.create({
      data: {
        fullName: result.data.fullName,
        emailAddress: result.data.email,
        checkbox: result.data.consent,
      },
    });

    revalidatePath("/");
    return NextResponse.json({
      success: true,
      message: "Submitted successfully",
      newLead,
    });
  } catch (error) {
    console.log("Error creating lead", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
      status: 500,
    });
  }
}
