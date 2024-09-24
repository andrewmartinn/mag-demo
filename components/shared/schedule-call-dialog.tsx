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

type ScheduleCallDialogProps = {
  isFooter?: boolean;
};

export default function ScheduleCallDialog({
  isFooter = false,
}: ScheduleCallDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={`${
            isFooter ? "-ml-2 mt-4 h-[43px] w-[179px]" : "h-[48px] w-[170px]"
          } rounded-full bg-primary-400 font-semibold text-white shadow-none hover:bg-primary-400`}
        >
          Schedule a call
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[calc(100dvh-4rem)] w-full max-w-[1152px] overflow-y-auto bg-white p-6 md:p-8">
        <DialogHeader>
          <DialogTitle className="text-4xl font-semibold text-neutral-800">
            Schedule a call at a time that suits you
          </DialogTitle>
          <DialogDescription className="sr-only">
            Bookings Table
          </DialogDescription>
        </DialogHeader>
        <BookingsForm />
      </DialogContent>
    </Dialog>
  );
}
