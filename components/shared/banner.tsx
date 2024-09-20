import { ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import GlobeIcon from "@/assets/icons/globe-icon";
import ChatIcon from "@/assets/icons/chat-icon";
import SupportIcon from "@/assets/icons/support-icon";
import SystemIcon from "@/assets/icons/system-icon";
import SunIcon from "@/assets/icons/sun-icon";
import MoonIcon from "@/assets/icons/moon-icon";
import UserIcon from "@/assets/icons/user-icon";

export default function Banner() {
  return (
    <div className="w-full p-4">
      <div className="flex items-center justify-between">
        {/* localization, chat, support */}
        <div className="flex gap-6">
          <Button
            variant="ghost"
            className="flex h-[24px] items-center justify-between gap-2 rounded-full bg-[#F5F5F7] px-2 py-1 text-primary"
          >
            <GlobeIcon />
            <span className="text-[10px] font-semibold">EN</span>
            <ChevronDown className="size-3" />
          </Button>
          <Button
            variant="ghost"
            className="flex h-[24px] items-center justify-between gap-2 rounded-full bg-[#F5F5F7] px-2 py-1 text-primary"
          >
            <ChatIcon />
            <span className="text-[10px] font-semibold uppercase">
              Chat to Sales
            </span>
          </Button>
          <Button
            variant="ghost"
            className="flex h-[24px] items-center justify-between gap-2 rounded-full bg-[#F5F5F7] px-2 py-1 text-primary"
          >
            <SupportIcon />
            <span className="text-[10px] font-semibold uppercase">Support</span>
          </Button>
        </div>
        {/* theme, login */}
        <div className="flex gap-6">
          <Button
            variant="ghost"
            className="flex h-[24px] items-center justify-between gap-2 rounded-full bg-[#F5F5F7] px-2 py-1 text-primary"
          >
            <SystemIcon />
            <SunIcon />
            <MoonIcon />
          </Button>
          <Button
            variant="ghost"
            className="flex h-[24px] items-center justify-between gap-2 rounded-full bg-[#F5F5F7] px-2 py-1 text-primary"
          >
            <UserIcon />
            <span className="text-[10px] font-semibold uppercase">Log in</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
