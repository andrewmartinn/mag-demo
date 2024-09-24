import prisma from "@/lib/db";
import { bookingsFormSchema } from "@/lib/validator";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsedDate = new Date(body.date);

    const dataToValidate = {
      ...body,
      date: parsedDate,
    };

    const result = bookingsFormSchema.safeParse(dataToValidate);
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

    const newBooking = await prisma.bookings.create({
      data: {
        fullName: result.data.fullName,
        emailAddress: result.data.email,
        phoneNumber: result.data.phoneNumber,
        date: result.data.date,
        timeSlot: result.data.time,
        callNotes: result.data.callNotes || null,
        checkbox: result.data.consent,
      },
    });

    revalidatePath("/");
    return NextResponse.json({
      success: true,
      message: "Booking created successfully",
      newBooking,
    });
  } catch (error) {
    console.log("Error creating booking", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
      status: 500,
    });
  }
}

export async function GET() {
  try {
    const bookingsData = await prisma.bookings.findMany({
      select: {
        date: true,
        timeSlot: true,
      },
    });

    return NextResponse.json({ success: true, bookingsData });
  } catch (error) {
    console.log("Error fetching bookings", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
      status: 500,
    });
  }
}
