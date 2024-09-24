import { z } from "zod";

export const leadFormSchema = z.object({
  fullName: z.string().min(3, "Full name must be atleast 3 characters"),
  email: z
    .string()
    .email("Invalid email address")
    .min(5, "Email must be at least 5 characters"),
  consent: z
    .boolean()
    .refine((val) => val === true, "You must agree to the privacy policy"),
});

export const bookingsFormSchema = z.object({
  fullName: z
    .string()
    .min(3, "Name must be atleast 3 characters")
    .max(150, "Name must be less than 200 characters"),
  email: z.string().email("Invalid email address"),
  date: z.date().refine(
    (val) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return val >= today;
    },
    { message: "Date must be today or in the future" },
  ),
  time: z.string().min(1, "Time is required"),
  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .refine((value) => /^[0-9]{10,15}$/.test(value), {
      message: "Invalid phone number format",
    }),
  callNotes: z
    .string()
    .max(500, "Call notes must be less than 500 characters")
    .optional(),
  consent: z
    .boolean()
    .refine((val) => val === true, "You must agree to the privacy policy"),
});
