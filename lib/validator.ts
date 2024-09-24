import { z } from "zod";

export const leadFormSchema = z.object({
  fullName: z.string().min(3, "Full name must be atleast 3 characters"),
  email: z
    .string()
    .email("Invalid email address")
    .min(5, "Email must be at least 5 characters"),
  consent: z.boolean(),
});

export const bookingsFormSchema = z.object({
  fullName: z
    .string()
    .min(3, "Name must be atleast 3 characters")
    .max(150, "Name must be less than 200 characters"),
  email: z.string().email("Invalid email address"),
  date: z.date({
    required_error: "Date is required",
    invalid_type_error: "Invalid date",
  }),
  time: z.string().min(1, "Time is required"),
  countryCode: z.string().min(1, "Country code is required"),
  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\d+$/, "Phone number must contain only digits"),
  callNotes: z
    .string()
    .max(500, "Call notes must be less than 500 characters")
    .optional(),
  consent: z
    .boolean()
    .refine((val) => val === true, "You must agree to the privacy policy"),
});
