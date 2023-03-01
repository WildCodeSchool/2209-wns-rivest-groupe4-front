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
    <div
      className={`flex justify-between ${
        imagePosition === "left" && "flex-row-reverse"
      }`}
    >
      <div className="flex flex-col gap-4 w-1/2">
        <h2 className="text-4xl underline font-aldrich ">{title}</h2>
        <p className="text-lg font-barlow">{text}</p>
      </div>
      <img className="w-2/5 object-contain" src={imageSource} alt="imgEditor" />
    </div>
  );
}
