import React from "react";

type Props = {
  imageSource: string;
  title: string;
  text: string;
  button: JSX.Element;
};

export default function ChoiceActionCard({
  imageSource,
  title,
  text,
  button,
}: Props) {
  return (
    <div className="rounded text-center bg-[#283544]">
      <div className="m-10">
        <img
          className="w-full object-cover"
          src={imageSource}
          alt="Create a project"
        />
      </div>
      <div className="grid place-items-center mb-6">
        <p className="m-6">
          <b className="underline">{title}</b> {text}
        </p>
        {button}
      </div>
    </div>
  );
}
