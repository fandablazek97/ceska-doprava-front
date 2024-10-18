import Heading from "@components/bricks/Heading";
import Wrapper from "@components/bricks/Wrapper";
import Image from "next/image";
import { HiArrowLeft } from "react-icons/hi";
import { changeDateType } from "./DatesAll";

type Category = {
  kategorie: string;
};

type Props = {
  country: string;
  name: string;
  perex: string;
  price?: number;
  date?: string | false;
  code: string;
  location: string;
  categories: Category[];
  imageSrc: string;
  imageAlt: string;
  full: boolean;
};

export default function Hero({
  country,
  name,
  perex,
  price,
  date,
  code,
  location,
  categories,
  imageSrc,
  imageAlt,
  full,
}: Props) {
  // Change price to number with spaces every thousand
  const priceWithSpaces = price!
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  return (
    <Wrapper
      size="base"
      className="grid grid-cols-1 items-center justify-center gap-x-20 pt-32 md:grid-cols-2"
      as={"header"}
    >
      <div className="flex flex-col items-start">
        <button className="group flex flex-row items-center gap-2 font-semibold text-gray-600" onClick={() => { window.history.back(); return false; }}>
          <HiArrowLeft className="transition-transform duration-150 group-hover:-translate-x-3" />
          <span className="ml-1">Zpět</span>
        </button>
        <div className="mt-8 flex flex-row flex-wrap gap-2 md:gap-3">
          {categories.map((categories, key) => {
            if (key <= 2) {
              return (
                <span
                  className="rounded-full bg-primary/15 px-3 font-medium capitalize tracking-wider text-primary"
                  key={key}
                >
                  {categories.kategorie}
                </span>
              );
            }
          })}
        </div>
        <Heading level={1} size={"lg"} className="mt-6">
          {name}
        </Heading>
        <p className="mt-10 max-w-prose font-semibold text-gray-600 sm:text-lg">
          {perex}
        </p>
        <div className="mt-12 flex flex-col gap-y-2">
          <div className="flex flex-row gap-x-3 shrink-0 text-lg font-bold text-primary">
            <span className={`block ${full && "line-through"}`}>
              {categories.some((e) => e.kategorie === "Jednodenni")
                ? priceWithSpaces + " Kč"
                : "Od " + priceWithSpaces + " Kč"}
            </span>
            {full && <span className="block">Obsazeno!</span>}
          </div>

          {date &&
            <span className="shrink-0 text-lg text-gray-500">
              Datum zájezdu: {changeDateType(date)}
            </span>
          }
          <span className="shrink-0 text-lg text-gray-500">
            Kód zájezdu: {code}
          </span>
          <span className="text-lg text-gray-500">
            {country} / {location}
          </span>
        </div>
      </div>
      <div className="relative mt-10 aspect-[4/3] bg-gray-200 overflow-hidden rounded-2xl md:mt-0">
        <Image
          src={imageSrc}
          alt={imageAlt}
          layout="fill"
          objectFit="cover"
          loading="eager"
          priority={true}
          sizes="100vh 100vw"
        />
      </div>
    </Wrapper>
  );
}
