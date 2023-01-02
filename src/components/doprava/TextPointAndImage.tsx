import Heading from "@components/bricks/Heading";
import ScrollReveal from "@components/bricks/ScrollReveal";
import Image from "next/image";

type Props = {
  heading: string;
  imageBigSrc: string;
  imageBigAlt: string;
  imageSmallLeftSrc: string;
  imageSmallLeftAlt: string;
  imageSmallRightSrc: string;
  imageSmallRightAlt: string;
  imagePosition: "left" | "right";
  points: {
    heading: string;
    text: string;
    icon: any;
  }[];
};

export default function TextPointAndImage({
  heading,
  points,
  imageBigSrc,
  imageBigAlt,
  imageSmallLeftSrc,
  imageSmallLeftAlt,
  imageSmallRightSrc,
  imageSmallRightAlt,
  imagePosition,
}: Props) {
  return (
    <div
      className={`flex h-full flex-col-reverse gap-10
        ${imagePosition === "right" ? "lg:flex-row-reverse" : "lg:flex-row"}`}
    >
      <div className="flex flex-col gap-5 lg:w-1/2">
        <div className="relative aspect-[5/3] overflow-hidden rounded-xl">
          <Image
            src={imageBigSrc}
            alt={imageBigAlt}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div className="relative aspect-[8/5] overflow-hidden rounded-xl">
            <Image
              src={imageSmallLeftSrc}
              alt={imageSmallLeftAlt}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="relative aspect-[8/5] overflow-hidden rounded-xl">
            <Image
              src={imageSmallRightSrc}
              alt={imageSmallRightAlt}
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
      </div>
      <div className="mt-12 w-full lg:mt-0 lg:w-1/2">
        <h3 className="text-3xl font-bold text-gray-900">{heading}</h3>
        <ScrollReveal staggerChildren className="mt-5 flex flex-col gap-y-7">
          {points.map((item, key) => (
            <div
              className="flex flex-col gap-y-3 py-3 lg:flex-row lg:px-5"
              key={key}
            >
              <span className="mr-5 hidden h-8 min-h-[32px] w-8 min-w-[32px] items-center justify-center rounded-full bg-primary text-xl text-white md:flex">
                {item.icon}
              </span>
              <div className="flex flex-col gap-y-1">
                <div className="flex flex-row">
                  <span className="mr-5 flex h-10 min-h-[32px] w-10 min-w-[32px] items-center justify-center rounded-full bg-primary text-xl text-white md:hidden">
                    {item.icon}
                  </span>
                  <Heading size="sm" level={3} className="text-gray-900">
                    {item.heading}
                  </Heading>
                </div>
                <p className="mt-1 leading-5 text-gray-700">{item.text}</p>
              </div>
            </div>
          ))}
        </ScrollReveal>
      </div>
    </div>
  );
}
