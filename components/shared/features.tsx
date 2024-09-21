"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { featuresData } from "@/constants";
import ImageCarousel from "./image-carousel";

export default function Features() {
  const [selectedFeature, setSelectedFeature] = useState(1);

  const currentFeature = featuresData[selectedFeature];
  const totalImages = currentFeature.images.length;

  const handleFeatureChange = (featureKey: number) => {
    setSelectedFeature(featureKey);
  };

  return (
    <section className="w-full">
      <div className="container mx-auto flex max-w-6xl gap-4 rounded-xl bg-[#F1FCFB] p-10">
        {/* features content */}
        <div className="flex w-2/4 flex-col gap-6">
          <h3 className="text-4xl font-semibold">FlowSpark features</h3>
          {/* list of features */}
          <div className="flex flex-col gap-4">
            {Object.keys(featuresData).map((key) => {
              const featureKey = Number(key);
              const isActiveFeature = featureKey === selectedFeature;

              return (
                <div
                  key={featureKey}
                  onClick={() => handleFeatureChange(featureKey)}
                  className="flex h-[48px] w-[259px] cursor-pointer items-center justify-start gap-4"
                >
                  <div
                    className={` ${
                      isActiveFeature ? "bg-primary-400" : "bg-primary-200"
                    } block h-full w-[4px] rounded-md transition-all duration-300 ease-in-out`}
                  />
                  <div>
                    <p className="text-[14px] font-semibold leading-none text-neutral-800">
                      {featuresData[featureKey].title}
                    </p>
                    <p className="text-[14px] font-medium text-neutral-800">
                      {featuresData[featureKey].subtext}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <p
            className="max-w-md text-[16px] text-neutral-800"
            style={{ lineHeight: "22.4px" }}
          >
            Experience simplicity with our user-friendly interface, designed for
            effortless navigation. Transform complex tasks into simple actions,
            enhancing productivity and strategic focus. Enjoy a seamless
            experience that drives results and optimizes your marketing efforts
            efficiently.
          </p>
          <Button
            variant="outline"
            className="border-primary-400 h-[48px] w-[194px] rounded-full border-2 hover:bg-[#F1FCFB]"
          >
            See more features
          </Button>
        </div>
        {/* iamge carousel */}
        <div className="w-2/4">
          <ImageCarousel
            images={currentFeature.images}
            totalImages={totalImages}
          />
        </div>
      </div>
    </section>
  );
}
