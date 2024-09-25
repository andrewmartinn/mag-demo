import Link from "next/link";
import Image from "next/image";
import ScheduleCallDiaglog from "./schedule-call-dialog";
import { footerLinks, footerSocialLinks } from "@/constants";

export default function Footer() {
  return (
    <footer className="w-full rounded-t-[5rem] bg-[#4D5973] text-[#F5F5F7]">
      <div className="container mx-auto p-10">
        <div className="mb-10 grid grid-cols-2 gap-10 pt-4 sm:grid-cols-4 sm:gap-2">
          {footerLinks.map((column, index) => (
            <div key={index} className="mx-auto">
              <h5 className="mb-2 text-[16px] font-semibold">
                {column.heading}
              </h5>
              <ul>
                {column.links.map((item, linkIndex) => {
                  const isScheduleCall = item.name === "Schedule a call";
                  return (
                    <>
                      {isScheduleCall ? (
                        <ScheduleCallDiaglog isFooter />
                      ) : (
                        <li key={linkIndex}>
                          <Link
                            href={item.href}
                            className="text-gray-300 hover:text-white"
                          >
                            {item.name}
                          </Link>
                        </li>
                      )}
                    </>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
        <div className="mx-auto flex max-w-lg flex-col gap-6">
          <div className="flex flex-col items-center gap-4">
            <Image
              src="/images/logo-flow-spark.svg"
              alt="logo"
              width={170}
              height={30}
              className="h-[30px] w-[170px]"
            />
            <ul className="mb-6 flex gap-8">
              {footerSocialLinks.map((item) => (
                <li key={item.id}>
                  <Image
                    src={item.url}
                    alt={item.alt}
                    width={20}
                    height={20}
                    className="h-[20px] w-[20px] object-cover"
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-6 flex items-center justify-center gap-8 text-center">
            <Link href="/">Terms of service</Link>
            <Link href="/">Privacy Policy</Link>
          </div>
          <p className="text-center text-[14px] font-bold text-[#F5F5F7]">
            &copy; {new Date().getFullYear()} FlowSpark Digital LLC
          </p>
        </div>
      </div>
    </footer>
  );
}
