import { Button } from "../ui/button";
import ScheduleCallDiaglog from "./schedule-call-dialog";

export default function CtaSection() {
  return (
    <section className="container mx-auto mb-24 flex flex-col items-center justify-center gap-4 p-10 text-center">
      <h3 className="mb text-[36px] font-semibold">
        Want to see how we can help?
      </h3>
      <p
        className="max-w-[440px] text-justify"
        style={{ lineHeight: "22.4px" }}
      >
        Ready to transform your marketing? Book a demo or start your free trial
        today and see firsthand how we can make your marketing efforts more
        effective and enjoyable!
      </p>
      <div className="flex gap-8">
        <ScheduleCallDiaglog />
        <Button
          className="h-[48px] w-[170px] rounded-full border-2 border-primary-400 bg-white font-semibold shadow-none hover:bg-white"
          variant="outline"
        >
          Free trial
        </Button>
      </div>
      <p className="text-[14px] font-semibold text-[#CBCED4]">
        Free 14-day trial. Cancel anytime.
      </p>
    </section>
  );
}
