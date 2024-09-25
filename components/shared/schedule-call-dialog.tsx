"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import BookingsForm from "./bookings-form";
import { useState } from "react";

type ScheduleCallDialogProps = {
  isFooter?: boolean;
};

export default function ScheduleCallDialog({
  isFooter = false,
}: ScheduleCallDialogProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleOpenChange = (open: boolean) => setIsDialogOpen(open);

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          className={`${
            isFooter
              ? "-ml-2 mt-4 h-[43px] w-[179px]"
              : "h-[48px] w-full sm:w-[170px]"
          } rounded-full bg-primary-400 font-semibold text-white shadow-none hover:bg-primary-400`}
        >
          Schedule a call
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[calc(100dvh-4rem)] w-full max-w-[1152px] overflow-y-auto bg-white p-6 dark:bg-neutral-800 md:p-8">
        <DialogHeader>
          <DialogTitle className="mt-10 text-3xl font-semibold text-neutral-800 dark:text-neutral-300 sm:mt-0">
            Schedule a call at a time that suits you
          </DialogTitle>
          <div>
            <BookingsForm handleOpenChange={() => handleOpenChange(false)} />
          </div>
          <DialogDescription className="sr-only">
            Bookings Form
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
