import Image from "next/image";
import LeadForm from "./lead-form";

export default function HeroSection() {
  return (
    <section className="container mx-auto mb-24 p-2">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 p-10 sm:grid-cols-2">
        {/* image & text content */}
        <div className="flex flex-col">
          <h1 className="mb-2 text-[48px] font-bold leading-tight dark:text-neutral-300">
            FlowSpark
          </h1>
          <p className="mb-6 text-[16px] font-semibold uppercase dark:text-neutral-300">
            Digital Marketing Solutions
          </p>
          <p
            className="mb-4 max-w-md text-[16px] dark:text-neutral-300"
            style={{ lineHeight: "22.4px" }}
          >
            We believe that marketing shouldn&rsquo;t be a headache, so
            we&rsquo;ve crafted a platform that&rsquo;s super easy to use but
            doesn&rsquo;t skimp on the powerful stuff.
          </p>
          <div className="w-full max-w-sm">
            <Image
              priority
              quality={95}
              src="/images/hero-image.png"
              alt="hero illustration"
              width={223}
              height={225}
              className="mx-auto h-[225px] w-[223px] object-cover"
            />
          </div>
        </div>
        {/* lead gen form */}
        <div className="flex w-[] items-center justify-center">
          <div className="w-full">
            <LeadForm />
          </div>
        </div>
      </div>
    </section>
  );
}
