"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

import { Progress } from "@/components/ui/progress";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

type ImageCarouselProps = {
  images: string[];
  totalImages?: number;
};

export default function ImageCarousel({
  images,
  totalImages = 3,
}: ImageCarouselProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [progressValue, setProgressValue] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // get current slide whenever it changes
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      const selectedIndex = emblaApi.selectedScrollSnap();
      setCurrentImageIndex(selectedIndex);
      const progress = ((selectedIndex + 1) / totalImages) * 100;
      setProgressValue(progress);
    };

    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      if (emblaApi) {
        emblaApi.off("select", onSelect);
      }
    };
  }, [emblaApi, totalImages]);

  // reset image index when feature changes
  useEffect(() => {
    if (emblaApi) {
      setCurrentImageIndex(0);
      emblaApi.scrollTo(0);
    }
  }, [images, emblaApi]);

  return (
    <div className="w-full">
      <div className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {images.map((item, index) => (
              <div className="embla__slide" key={index}>
                <div className="mx-auto h-[460px] w-[500px] overflow-hidden rounded-lg">
                  <Image
                    quality={96}
                    height={460}
                    width={500}
                    src={item}
                    alt="image"
                    className="rounde-lg h-[460px] w-[500px] object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 flex items-center justify-center gap-6">
          <Button
            variant="outline"
            size="icon"
            className="embla__prev h-[32px] w-[32px] border-2 border-primary-400 bg-[#F1FCFB] text-primary-400 hover:bg-[#F1FCFB]"
            onClick={scrollPrev}
          >
            <ArrowLeft className="size-5" />
          </Button>
          <p className="text-[16px]">
            <span className="font-semibold">{currentImageIndex + 1}</span> /{" "}
            {totalImages}
          </p>
          <Button
            variant="outline"
            size="icon"
            className="embla__next h-[32px] w-[32px] border-2 border-primary-400 bg-[#F1FCFB] text-primary-400 hover:bg-[#F1FCFB]"
            onClick={scrollNext}
          >
            <ArrowRight className="size-5" />
          </Button>
        </div>
        <div className="mt-6 flex justify-center">
          <Progress
            value={progressValue}
            className="max-w-[200px] text-primary-400"
          />
        </div>
      </div>
    </div>
  );
}
