import React from "react";

type Props = {
  title: string;
  text: string;
  imageSource: string;
  imagePosition: "right" | "left";
};

export default function HomeDescriptionCard({
  title,
  text,
  imageSource,
  imagePosition,
}: Props) {
  return (
    <div className="flex flex-col-reverse lg:flex-row justify-between gap-8">
      <div className="flex flex-col gap-4 w-full lg:w-1/2">
        <h2 className="text-4xl underline font-aldrich">{title}</h2>
        <p className="text-lg font-barlow">{text}</p>
      </div>
      <img
        className={`w-full lg:w-2/5 object-contain ${
          imagePosition === "left" ? "order-first" : "order-last"
        }`}
        src={imageSource}
        alt="imgEditor"
      />
    </div>
  );
}
