import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { MenuIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { navLinks } from "@/constants";
import Link from "next/link";

export default function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="rounded-full bg-primary-400 p-2 dark:bg-neutral-800">
          <MenuIcon className="size-5 text-neutral-200 dark:text-neutral-200" />
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-white dark:bg-neutral-600 dark:text-neutral-200">
        <SheetHeader>
          <SheetTitle className="text-left">Menu</SheetTitle>
          <Separator className="dark:bg-neutral-300" />
          <div>
            <ul className="mt-10 flex w-full flex-col items-center gap-10">
              {navLinks.map((item) => (
                <Link href={item.url} key={item.id}>
                  <li className="text-[16px] font-semibold text-primary-600 transition-all hover:text-primary-400 dark:text-neutral-200">
                    {item.name}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
          <SheetDescription className="sr-only">
            Mobile navigation
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
