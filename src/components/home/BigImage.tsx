import Image from "next/image";

type Props = {
  imageSrc: string;
  imageAlt: string;
};

export default function BigImage({ imageSrc, imageAlt }: Props) {
  return (
    <div className="relative mt-32 flex aspect-[4/3] w-full justify-center md:aspect-video">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        loading="lazy"
      />
    </div>
  );
}
