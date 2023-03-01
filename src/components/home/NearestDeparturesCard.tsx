import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
  tripId?: number;
  imageSrc?: string;
  imageAlt?: string;
  country?: string;
  name?: string;
  dateAndPrice?: {
    datumOd: string;
    datumDo: string;
    cena: number;
  }[];
  className?: string;
  fake?: boolean;
};

export default function NearestDeparturesCard({
  tripId,
  imageSrc = "",
  imageAlt = "",
  name = "",
  dateAndPrice,
  className = "",
  fake = false,
}: Props) {
  const [changeables, setChangables] = useState<{
    dateFrom: string;
    dateTo: string;
  }>({ dateFrom: "2023-12-31", dateTo: "2023-12-31" });

  useEffect(() => {
    let tempDateFrom = "2023-12-31";
    let tempDateTo = "2023-12-31";

    !fake &&
      dateAndPrice!.map((entry, index) => {
        if (index + 1 === dateAndPrice!.length) {
          if (
            new Date(entry.datumOd).getTime() >= new Date().getTime() &&
            new Date(entry.datumOd).getTime() < new Date(tempDateFrom).getTime()
          ) {
            if (entry.datumDo === null) {
              setChangables({
                dateFrom: changeDateType(entry.datumOd),
                dateTo: "none",
              });
            } else {
              setChangables({
                dateFrom: changeDateType(entry.datumOd),
                dateTo: changeDateType(entry.datumDo),
              });
            }
          } else {
            if (entry.datumDo === null) {
              setChangables({
                dateFrom: changeDateType(tempDateFrom),
                dateTo: "none",
              });
            } else {
              setChangables({
                dateFrom: changeDateType(tempDateFrom),
                dateTo: changeDateType(tempDateTo),
              });
            }
          }
        } else {
          if (
            new Date(entry.datumOd).getTime() >= new Date().getTime() &&
            new Date(entry.datumOd).getTime() < new Date(tempDateFrom).getTime()
          ) {
            tempDateFrom = entry.datumOd;
            tempDateTo = entry.datumDo;
          }
        }
      });
  }, []);

  function changeDateType(date: string) {
    var newDate = date.split("-")[2] + "." + date.split("-")[1] + ".";
    return newDate;
  }

  return (
    <Link href={fake ? "" : `/zajezd/${tripId}`}>
      <a
        className={`group flex flex-col md:gap-2 ${
          fake
            ? "animate-pulse justify-between"
            : "items-start transition duration-300 hover:scale-95"
        } ${className}`}
        onClick={(e) => fake && e.preventDefault()}
      >
        <div
          className={`relative isolate aspect-[16/10] w-full overflow-hidden rounded-2xl ${
            fake && "bg-gray-200"
          }`}
        >
          {!fake && (
            <Image
              src={imageSrc}
              alt={imageAlt}
              layout="fill"
              objectFit="cover"
              loading="eager"
              sizes="(max-width: 768px) 50vw,
                (max-width: 1200px) 25vw,
                25vw"
              className="transition-transform duration-300 group-hover:scale-105"
            />
          )}
        </div>
        <div className="flex flex-col gap-2 py-2 px-1">
          <span
            className={`block ${
              fake
                ? "h-5 w-40 bg-gray-200"
                : "text-lg font-semibold leading-6 text-rich"
            }`}
          >
            {!fake && name}
          </span>
          <span
            className={`block ${fake ? "h-5 w-28 bg-gray-200" : "mt-auto"}`}
          >
            {!fake &&
              (changeables.dateTo === "none"
                ? changeables.dateFrom
                : changeables.dateFrom + "-" + changeables.dateTo)}
          </span>
        </div>
      </a>
    </Link>
  );
}
