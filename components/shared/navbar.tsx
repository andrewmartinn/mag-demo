import { navLinks } from "@/constants";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import ScheduleCallDiaglog from "./schedule-call-dialog";
import MobileNav from "./mobile-nav";

export default function Navbar() {
  return (
    <nav className="container mx-auto w-full px-2">
      <div className="flex items-center justify-between rounded-full bg-[#F1FCFB] px-4 py-3 dark:bg-neutral-600 sm:py-5">
        {/* logo & links */}
        <div className="flex items-center gap-6">
          <Image
            src="/images/logo-flow-spark.svg"
            alt="logo"
            width={170}
            height={31}
            className="h-[31px] w-[170px]"
          />
          <ul className="hidden items-center gap-10 sm:flex">
            {navLinks.map((item) => (
              <Link href={item.url} key={item.id}>
                <li className="text-[16px] font-semibold text-primary-600 dark:text-neutral-200">
                  {item.name}
                </li>
              </Link>
            ))}
          </ul>
        </div>
        {/* buttons */}
        <div className="hidden gap-5 sm:flex">
          <ScheduleCallDiaglog />
          <Button
            className="h-[48px] w-[170px] rounded-full border-2 border-primary-400 bg-white font-semibold shadow-none hover:bg-white dark:bg-neutral-600"
            variant="outline"
          >
            Free trial
          </Button>
        </div>
        <div className="flex sm:hidden">
          <MobileNav />
        </div>
      </div>
    </nav>
  );
}
