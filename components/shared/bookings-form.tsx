"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import { bookingsFormSchema } from "@/lib/validator";
import {
  bookingsFormDefaultValues,
  bookingsFormTimeSlots,
  countryCodes,
} from "@/constants";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

const bookedSlots = ["10:00 AM", "3:00 PM"];

export default function BookingsForm() {
  const bookingsFormInitialValues = bookingsFormDefaultValues;

  // 1. Define your form.
  const form = useForm<z.infer<typeof bookingsFormSchema>>({
    resolver: zodResolver(bookingsFormSchema),
    defaultValues: bookingsFormInitialValues,
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof bookingsFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className="">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-16"
        >
          {/* date and time picker */}
          <div className="mx-auto mt-10 flex w-full flex-col gap-16 sm:max-w-4xl sm:flex-row">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[14px] text-neutral-600">
                    Select a date
                  </FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "flex w-full items-center justify-between text-left font-normal sm:w-[280px]",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "dd/MM/yyyy")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                          className="calendar-selected"
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[14px] text-neutral-600">
                    Select a time
                  </FormLabel>
                  <FormControl>
                    <ToggleGroup
                      type="single"
                      className="toggle-group grid grid-cols-3 gap-4 md:grid-cols-4"
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      {bookingsFormTimeSlots.map((time) => (
                        <ToggleGroupItem
                          value={time}
                          key={time}
                          className={cn(
                            "h-[43px] w-[100px] rounded-full border transition-colors",
                            field.value === time
                              ? "bg-green-500 text-white"
                              : bookedSlots.includes(time)
                                ? "cursor-not-allowed bg-gray-300 text-gray-500"
                                : "bg-white text-black hover:bg-gray-100",
                          )}
                          disabled={bookedSlots.includes(time)}
                        >
                          {time}
                        </ToggleGroupItem>
                      ))}
                    </ToggleGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* name, email, phone, call notes, consent, submit */}
          <div className="flex flex-col gap-8 sm:flex-row">
            <div className="flex flex-1 flex-col gap-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[14px] text-neutral-600">
                      Full name
                    </FormLabel>
                    <FormControl>
                      <Input className="h-[48px] border-[#4D5973]" {...field} />
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
                    <FormLabel className="text-[14px] text-neutral-600">
                      Email address
                    </FormLabel>
                    <FormControl>
                      <Input className="h-[48px] border-[#4D5973]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[14px] text-neutral-600">
                      Phone number
                    </FormLabel>
                    <FormControl>
                      <div className="flex h-[48px] border-neutral-600">
                        <FormField
                          control={form.control}
                          name="countryCode"
                          render={({ field: countryField }) => (
                            <FormItem className="flex items-center">
                              <Select
                                value={countryField.value}
                                onValueChange={countryField.onChange}
                              >
                                <SelectTrigger className="h-full w-[120px] rounded-bl-md rounded-br-none rounded-tl-md rounded-tr-none border-r border-neutral-600">
                                  <SelectValue placeholder="Code" />
                                </SelectTrigger>
                                <SelectContent>
                                  {countryCodes.map((country) => (
                                    <SelectItem
                                      value={country.code}
                                      key={country.code}
                                    >
                                      {country.label} {country.code}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormItem>
                          )}
                        />
                        <Input
                          type="tel"
                          className="h-[48px] rounded-bl-none rounded-tl-none border-neutral-600"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-1 flex-col gap-4">
              <FormField
                control={form.control}
                name="callNotes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[14px] text-neutral-600">
                      Call notes
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="h-[106px] resize-none border-[#4D5973]"
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
                      <div className="flex items-center gap-x-4">
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          id="terms"
                          className="h-[20px] w-[20px] appearance-none rounded-sm border-2 border-primary-400 checked:border-transparent checked:bg-primary-400"
                        />
                        <Label className="line-clamp-2 max-w-md text-[14px] text-neutral-600">
                          I consent to my details being processed in line with
                          the <span className="underline">privacy policy.</span>
                        </Label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                className="ml-auto h-[48px] w-[183px] rounded-full bg-primary-400 text-white"
                type="submit"
              >
                Schedule my call
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
