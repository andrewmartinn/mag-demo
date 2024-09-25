"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { leadFormSchema } from "@/lib/validator";
import toast from "react-hot-toast";

export default function LeadForm() {
  const form = useForm<z.infer<typeof leadFormSchema>>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      consent: false,
    },
  });

  async function onSubmit(values: z.infer<typeof leadFormSchema>) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/leads`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        },
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        console.log("Server error response: ", errorResponse);

        if (errorResponse.issues?.fieldErrors) {
          Object.keys(errorResponse.issues.fieldErrors).forEach((field) => {
            errorResponse.issues.fieldErrors[field].forEach(
              (message: string) => {
                toast.error(`${field}: ${message}`);
              },
            );
          });
        } else {
          toast.error("An unexpected error occoured");
        }

        if (errorResponse.issues?.formErrors.length > 0) {
          errorResponse.issues.formErrors.forEach((message: string) => {
            toast.error(message);
          });
        }
      }

      const result = await response.json();

      if (result.success) {
        toast.success("Submitted successfully");
        form.reset();
      }
    } catch (error) {
      console.error(error);
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }

  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input
                    className="h-[48px] dark:bg-neutral-600 dark:text-neutral-300"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    className="h-[48px] dark:bg-neutral-600 dark:text-neutral-300"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="consent"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <div className="text-[12px] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sm:text-sm">
                      I consent to my details being processed in line with the{" "}
                      <span className="underline">privacy policy</span>.
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-5">
            <Button
              disabled={form.formState.isSubmitting}
              className="h-[48px] w-full rounded-full bg-primary-400 font-semibold text-white shadow-none hover:bg-primary-400 sm:w-[170px]"
            >
              {form.formState.isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div
                    className="text-surface inline-block size-6 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                    role="status"
                  />
                  <span>Submitting...</span>
                </div>
              ) : (
                `Book your demo`
              )}
            </Button>
            <Button
              className="hidden h-[48px] w-[170px] rounded-full border-2 border-primary-400 bg-white font-semibold shadow-none hover:bg-white dark:bg-neutral-800 sm:flex"
              variant="outline"
            >
              Free trial
            </Button>
          </div>
          <p className="text-center text-[14px] font-semibold text-[#CBCED4] sm:text-left">
            Free 14-day trial. Cancel anytime.
          </p>
        </form>
      </Form>
    </div>
  );
}
