"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import toast from "react-hot-toast";

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
import { Input } from "@/components/ui/input";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import { bookingsFormSchema } from "@/lib/validator";
import { bookingsFormDefaultValues, bookingsFormTimeSlots } from "@/constants";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";

import { IBooking } from "@/lib/definitions";
import PhoneInput from "react-phone-input-2";

import "react-phone-input-2/lib/bootstrap.css";

type BookingsFormProps = {
  handleOpenChange: () => void;
};

export default function BookingsForm({ handleOpenChange }: BookingsFormProps) {
  const [bookedSlots, setBookedSlots] = useState<IBooking[]>([]);
  const bookingsFormInitialValues = bookingsFormDefaultValues;

  useEffect(() => {
    const fetchBookings = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/bookings`,
      );
      const data = await response.json();
      console.log(data);

      if (data.success) {
        const bookingsData = data.adjustedBookingsData.map(
          (booking: IBooking) => ({
            ...booking,
            date: new Date(booking.date),
          }),
        );
        setBookedSlots(bookingsData);
      }
    };

    fetchBookings();
  }, []);

  const isSlotBooked = (
    selectedDate: Date,
    time: string,
    bookedSlots: IBooking[],
  ): boolean => {
    const selectedDateMidnight = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
    );

    return bookedSlots.some((slot) => {
      const slotDate = new Date(slot.date);
      const slotDateMidnight = new Date(
        slotDate.getFullYear(),
        slotDate.getMonth(),
        slotDate.getDate(),
      );

      return (
        slotDateMidnight.getTime() === selectedDateMidnight.getTime() &&
        slot.timeSlot === time
      );
    });
  };

  const form = useForm<z.infer<typeof bookingsFormSchema>>({
    resolver: zodResolver(bookingsFormSchema),
    defaultValues: bookingsFormInitialValues,
  });

  async function onSubmit(values: z.infer<typeof bookingsFormSchema>) {
    try {
      const formattedValues = {
        ...values,
        date: new Date(values.date).toISOString(),
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/bookings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formattedValues),
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
        form.reset();
        toast.success("Call booking successful");
        setTimeout(() => handleOpenChange(), 500);
      }
    } catch (error) {
      console.error(error);
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-16"
        >
          {/* date and time picker */}
          <div className="mx-auto mt-10 flex w-full flex-col justify-around gap-16 sm:flex-row">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="text-left">
                  <FormLabel className="text-[14px] text-neutral-600 dark:text-neutral-300">
                    Select a date
                  </FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "flex w-full items-center justify-between text-left font-normal dark:border-primary-400 dark:bg-neutral-800 sm:w-[280px]",
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
                          onSelect={(date: Date | undefined) =>
                            field.onChange(date)
                          }
                          initialFocus
                          className="calendar-selected dark:bg-neutral-600"
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
              render={({ field }) => {
                const selectedDate = form.watch("date");

                return (
                  <FormItem className="text-left">
                    <FormLabel className="text-[14px] text-neutral-600 dark:text-neutral-300">
                      Select a time
                    </FormLabel>
                    <FormControl>
                      <ToggleGroup
                        type="single"
                        className="toggle-group grid grid-cols-3 gap-4 md:grid-cols-4"
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        {bookingsFormTimeSlots.map((time) => {
                          const isBooked = isSlotBooked(
                            selectedDate,
                            time,
                            bookedSlots,
                          );
                          return (
                            <ToggleGroupItem
                              value={time}
                              key={time}
                              className={cn(
                                "h-[43px] w-[100px] rounded-full border transition-colors",
                                field.value === time
                                  ? "bg-green-500 text-white"
                                  : isBooked
                                    ? "cursor-not-allowed bg-gray-300 text-gray-500 disabled:dark:border-neutral-600"
                                    : "border-2 border-primary-400 bg-white text-black hover:bg-gray-100",
                              )}
                              disabled={isBooked}
                            >
                              {time}
                            </ToggleGroupItem>
                          );
                        })}
                      </ToggleGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>
          {/* name, email, phone, call notes, consent, submit */}
          <div className="flex flex-col gap-8 rounded-xl p-4 dark:bg-neutral-600 sm:flex-row sm:p-8">
            <div className="flex flex-1 flex-col gap-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem className="text-left">
                    <FormLabel className="text-[14px] text-neutral-600 dark:text-neutral-300">
                      Full name
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="h-[48px] border-[#4D5973] dark:bg-neutral-300 dark:text-neutral-600"
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
                  <FormItem className="text-left">
                    <FormLabel className="text-[14px] text-neutral-600 dark:text-neutral-300">
                      Email address
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="h-[48px] border-[#4D5973] dark:bg-neutral-300 dark:text-neutral-600"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem className="text-left">
                    <FormLabel className="text-[14px] text-neutral-600 dark:text-neutral-300">
                      Phone number
                    </FormLabel>
                    <FormControl>
                      <PhoneInput
                        country={"us"}
                        onlyCountries={["us", "gb", "ae", "in"]}
                        value={field.value}
                        onChange={(phone) => field.onChange(phone)}
                        inputStyle={{
                          width: "100%",
                          border: "1px solid #4D5973",
                          borderRadius: "4px",
                          height: "48px",
                        }}
                        dropdownStyle={{
                          borderRadius: "4px",
                          border: "1px solid #4D5973",
                          width: "250px",
                        }}
                        isValid={(value) => {
                          if (!value.match(/^[0-9]{10,15}$/)) {
                            return false;
                          }
                          return true;
                        }}
                      />
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
                  <FormItem className="text-left">
                    <FormLabel className="text-[14px] text-neutral-600 dark:text-neutral-300">
                      Call notes
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="h-[106px] resize-none border-[#4D5973] dark:bg-neutral-300 dark:text-neutral-600"
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
                        <Label className="max-w-md text-[12px] text-neutral-600 dark:text-neutral-300 sm:line-clamp-2 sm:text-[14px]">
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
                className="h-[48px] w-full rounded-full bg-primary-400 text-white sm:ml-auto sm:w-[183px]"
                type="submit"
                disabled={form.formState.isSubmitting}
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
                  `Schedule my call`
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
