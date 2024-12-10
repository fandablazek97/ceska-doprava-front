import Image from "next/image";
import Heading from "./Heading";
import Wrapper from "./Wrapper";

type Props = {
  heading: string;
  text: string;
  imageSrc?: string;
  imageAlt?: string;
  imageSizeSm?: string;
  imageSizeMd?: string;
  imageSizeLg?: string;
  imagePosition?: "left" | "right";
  children?: React.ReactNode;
};

export default function BasicHero({
  heading,
  text,
  imageSrc = "",
  imageAlt,
  imageSizeSm = "100vw",
  imageSizeMd = "100vw",
  imageSizeLg = "100vw",
  imagePosition = "right",
  children,
}: Props) {
  return (
    <Wrapper
      as={"header"}
      size={"base"}
      className={`flex flex-col gap-10 pb-16 pt-24 xl:pb-24 xl:pt-32 ${imagePosition === "left" ? "md:flex-row-reverse" : "md:flex-row"
        }`}
    >
      <div className={`mt-20 flex items-center justify-center md:mt-0 ${imageSrc && "md:w-1/2"}`}>
        <div className="flex flex-col space-y-10">
          <Heading level={1} size={"xl"} className={`text-left ${imageSrc && "max-w-md"}`}>
            {heading}
          </Heading>
          <p className={`${imageSrc && "max-w-md"}`}>{text}</p>
          {children}
        </div>
      </div>
      {
        imageSrc &&
        <div className="relative aspect-square md:w-1/2">
          <Image
            src={imageSrc}
            alt={imageAlt ?? "Hero image"}
            fill
            loading="eager"
            priority={true}
            sizes={`(max-width: 768px) ${imageSizeSm},
              (max-width: 1200px) ${imageSizeMd},
              ${imageSizeLg}`}
          />
        </div>
      }
    </Wrapper>
  );
}
