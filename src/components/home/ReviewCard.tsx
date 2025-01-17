import Image from "next/image";

type Props = {
  name: string;
  destination: string;
  text: string;
  imageSrc: string;
};

export default function ReviewCard({
  name,
  destination,
  text,
  imageSrc,
}: Props) {
  return (
    <div className="mt-20 flex flex-col items-center justify-center rounded-2xl border border-gray-200 px-6 py-8 text-center">
      <div className="flex w-full flex-row pb-5">
        <div className="relative h-16 w-16 overflow-hidden rounded-full">
          <Image
            src={imageSrc}
            alt="Ikona"
            fill
            loading="eager"
          />
        </div>
        <div className="my-auto w-[calc(100%_-_60px)] px-2">
          <p className="text-left font-semibold">{name}</p>
          <p className="text-left text-sm text-gray-400">{destination}</p>
        </div>
      </div>
      <p className="text-left text-sm font-medium">{text}</p>
    </div>
  );
}
