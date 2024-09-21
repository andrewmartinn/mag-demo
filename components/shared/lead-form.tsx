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

export default function LeadForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof leadFormSchema>>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      consent: false,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof leadFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
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
                  <Input {...field} />
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
                  <Input type="email" {...field} />
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
                    <div className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
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
            <Button className="bg-primary-400 hover:bg-primary-400 h-[48px] w-[170px] rounded-full font-semibold text-white shadow-none">
              Book your demo
            </Button>
            <Button
              className="border-primary-400 h-[48px] w-[170px] rounded-full border-2 bg-white font-semibold shadow-none hover:bg-white"
              variant="outline"
            >
              Free trial
            </Button>
          </div>
          <p className="text-[14px] font-semibold text-[#CBCED4]">
            Free 14-day trial. Cancel anytime.
          </p>
        </form>
      </Form>
    </div>
  );
}
