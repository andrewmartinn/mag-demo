import { navLinks } from "@/constants";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="container mx-auto w-full px-2">
      <div className="flex justify-between rounded-full bg-[#F1FCFB] px-4 py-5">
        {/* logo & links */}
        <div className="flex items-center gap-6">
          <Image
            src="/images/logo-flow-spark.svg"
            alt="logo"
            width={170}
            height={31}
            className="h-[31px] w-[170px]"
          />
          <ul className="flex items-center gap-10">
            {navLinks.map((item) => (
              <Link href={item.url}>
                <li className="text-[16px] font-semibold text-[#16504B]">
                  {item.name}
                </li>
              </Link>
            ))}
          </ul>
        </div>
        {/* buttons */}
        <div className="flex gap-5">
          <Button className="bg-primary-400 hover:bg-primary-400 h-[48px] w-[170px] rounded-full font-semibold text-white shadow-none">
            Schedule a call
          </Button>
          <Button
            className="border-primary-400 h-[48px] w-[170px] rounded-full border-2 bg-white font-semibold shadow-none hover:bg-white"
            variant="outline"
          >
            Free trial
          </Button>
        </div>
      </div>
    </nav>
  );
}
