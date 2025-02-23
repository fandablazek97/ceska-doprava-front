import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Props = {
  tripId?: number;
  imageSrc?: string;
  imageAlt?: string;
  country?: string;
  name?: string;
  dateAndPrice?: DateAndPrice[];
  className?: string;
  fake?: boolean;
};


type DateAndPrice = {
  datumOd: string;
  datumDo: string;
  cena: number;
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

  let dateFrom: string = "2030-12-31";
  let dateTo: string | null = "2030-12-31";
  let today = new Date().toISOString().slice(0, 10);

  !fake && dateAndPrice && dateAndPrice.map((entry, index) => {
    if (index + 1 === dateAndPrice.length) {
      if (
        new Date(entry.datumOd).getTime() >=
        new Date(today).getTime() &&
        new Date(entry.datumOd).getTime() < new Date(dateFrom).getTime()
      ) {
        if (entry.datumDo === null) {
          dateFrom = changeDateType(entry.datumOd);
          dateTo = "none";
        } else {
          dateFrom = changeDateType(entry.datumOd);
          dateTo = changeDateType(entry.datumDo);
        }
      } else {
        if (entry.datumDo === null) {
          dateFrom = changeDateType(dateFrom);
          dateTo = "none";
        } else {
          dateFrom = changeDateType(dateFrom);
          if (dateTo) dateTo = changeDateType(dateTo);
        }
      }
    } else {
      if (
        new Date(entry.datumOd).getTime() >=
        new Date(today).getTime() &&
        new Date(entry.datumOd).getTime() < new Date(dateFrom).getTime()
      ) {
        if (entry.datumOd === entry.datumDo) {
          dateTo = null;
        }
        else {
          dateTo = entry.datumDo;
        }
        dateFrom = entry.datumOd;
      }
    }
  });
  function changeDateType(date: string) {
    var newDate = date.split("-")[2] + "." + date.split("-")[1] + ".";
    return newDate;
  }

  return (
    <Link href={fake ? "" : `/zajezd/${tripId}`}
      className={`group flex flex-col md:gap-2 ${fake
        ? "animate-pulse justify-between"
        : "items-start transition duration-300 hover:scale-95"
        } ${className}`}
      onClick={(e) => fake && e.preventDefault()}>
      <div
        className={`relative isolate aspect-[16/10] w-full overflow-hidden rounded-2xl ${fake && "bg-gray-200"
          }`}
      >
        {!fake && (
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
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
          className={`block ${fake
            ? "h-5 w-40 bg-gray-200"
            : "text-lg font-semibold leading-6 text-rich"
            }`}
        >
          {!fake && name}
        </span>
        <span
          className={`block ${fake ? "h-5 w-28 bg-gray-200" : "mt-auto"}`}
        >
          {!fake ? (dateTo === "none" || !dateTo || dateFrom === dateTo)
            ?
            dateFrom
            :
            dateFrom + " - " + dateTo
            : null
          }
        </span>
      </div>
    </Link>
  );
}
