import React from "react";

type Props = {
  title: string;
  titleColor: string;
  contents: string[];
};

export default function HomeAccountDescriptionCard({
  title,
  titleColor,
  contents,
}: Props) {
  return (
    <div className="w-full flex flex-col gap-4">
      <h3 className={`text-2xl font-semibold text-center ${titleColor}`}>
        {title}
      </h3>
      <ul className="flex flex-col justify-center items-center text-center text-lg">
        {contents.map((content) => (
          <li key={Math.random()}>{content}</li>
        ))}
      </ul>
    </div>
  );
}
