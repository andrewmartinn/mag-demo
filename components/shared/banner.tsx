import { ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import GlobeIcon from "@/assets/icons/globe-icon";
import ChatIcon from "@/assets/icons/chat-icon";
import SupportIcon from "@/assets/icons/support-icon";
import UserIcon from "@/assets/icons/user-icon";
import ThemeToggle from "./theme-toggle";

export default function Banner() {
  return (
    <div className="w-full p-4">
      <div className="flex items-center justify-between">
        {/* localization, chat, support */}
        <div className="flex gap-6">
          <Button
            variant="ghost"
            className="flex h-[24px] items-center justify-between gap-2 rounded-full bg-neutral-200 px-2 py-1 text-neutral-600 dark:bg-neutral-600 dark:text-neutral-300"
          >
            <GlobeIcon />
            <span className="text-[10px] font-semibold">EN</span>
            <ChevronDown className="size-3" />
          </Button>
          <Button
            variant="ghost"
            className="hidden h-[24px] items-center justify-between gap-2 rounded-full bg-neutral-200 px-2 py-1 text-neutral-600 dark:bg-neutral-600 dark:text-neutral-300 sm:flex"
          >
            <ChatIcon />
            <span className="text-[10px] font-semibold uppercase">
              Chat to Sales
            </span>
          </Button>
          <Button
            variant="ghost"
            className="hidden h-[24px] items-center justify-between gap-2 rounded-full bg-neutral-200 px-2 py-1 text-neutral-600 dark:bg-neutral-600 dark:text-neutral-300 sm:flex"
          >
            <SupportIcon />
            <span className="text-[10px] font-semibold uppercase">Support</span>
          </Button>
        </div>
        {/* theme, login */}
        <div className="flex gap-6">
          <ThemeToggle />
          <Button
            variant="ghost"
            className="flex h-[24px] items-center justify-between gap-2 rounded-full bg-neutral-200 px-2 py-1 text-neutral-600 dark:bg-neutral-600 dark:text-neutral-300"
          >
            <UserIcon />
            <span className="hidden text-[10px] font-semibold uppercase sm:block">
              Log in
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}
