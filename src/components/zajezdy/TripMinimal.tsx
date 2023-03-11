import Image from "next/image";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";
import { useEffect, useState } from "react";

type Categories = {
  kategorie: string;
};

type DateAndPrice = {
  datumOd: string;
  datumDo: string;
  cena: number;
};

type Props = {
  id: number;
  name: string;
  imageSrc: string;
  dateAndPrice: DateAndPrice[];
  categories: Categories[];
  filterCategory: string;
};

export default function TripMinimal({
  id,
  name,
  imageSrc,
  dateAndPrice,
  categories,
  filterCategory,
}: Props) {
  let dateFrom: string = "2024-12-31";
  let dateTo: string = "2024-12-31";
  let price: number = 0;
  let counterForTags = 0;
  let tempDateFrom = "2023-12-31";
  let tempDateTo = "2023-12-31";
  let tempPrice = 0;

  dateAndPrice.map((entry, index) => {
    if (index + 1 === dateAndPrice.length) {
      if (
        new Date(entry.datumOd).getTime() >=
          new Date().getTime() &&
        new Date(entry.datumOd).getTime() < new Date(tempDateFrom).getTime()
      ) {
        if (entry.datumDo === null) {
          dateFrom = changeDateType(entry.datumOd);
          dateTo = "none";
          price = entry.cena;
        } else {
          dateFrom = changeDateType(entry.datumOd);
          dateTo = changeDateType(entry.datumDo);
          price = entry.cena;
        }
      } else {
        if (entry.datumDo === null) {
          dateFrom = changeDateType(tempDateFrom);
          dateTo = "none";
          price = entry.cena;
        } else {
          dateFrom = changeDateType(tempDateFrom);
          dateTo = changeDateType(tempDateTo);
          price = entry.cena;
        }
      }
    } else {
      if (
        new Date(entry.datumOd).getTime() >=
          new Date().getTime() &&
        new Date(entry.datumOd).getTime() < new Date(tempDateFrom).getTime()
      ) {
        tempDateFrom = entry.datumOd;
        tempDateTo = entry.datumDo;
        tempPrice = entry.cena;
      }
    }
  },[]);

  function changeDateType(date: string) {
    var newDate = date.split("-")[2] + "." + date.split("-")[1] + ".";
    return newDate;
  }

  // Change price to number with spaces every thousand
  function changePriceFormat(price: number) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  return (
    <Link href={`/zajezd/${id}`}>
      <a className="group relative flex flex-col rounded-lg transition-transform duration-300 hover:scale-95">
        <div className="relative isolate aspect-[16/10] w-full overflow-hidden rounded-2xl bg-gray-200">
          <Image
            src={imageSrc}
            alt={name}
            layout="fill"
            objectFit="cover"
            priority={true}
            sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
            className="transition-transform duration-300 group-hover:scale-110"
          />
        </div>

        {/* Content karty */}
        <div className="flex flex-col space-y-3 py-2 px-1">
          {/* Název zájezdu */}
          <h3 className="pt-3 text-lg font-bold leading-tight text-black">
            {name}
          </h3>
          {/* Štítky s datem */}
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((category: any, key: number) => {
                if (
                  counterForTags === 0 ||
                  (counterForTags === 1 &&
                    category.kategorie === filterCategory) ||
                  (counterForTags === 1 && key === categories.length - 1)
                ) {
                  counterForTags++;
                  return (
                    <span
                      className="h-fit rounded-full bg-primary/15 px-2 text-xs font-medium capitalize tracking-wider text-primary"
                      key={key}
                    >
                      {category.kategorie}
                    </span>
                  );
                }
              })}
            </div>
            <span className="block min-w-[100px] text-right font-medium">
              {dateTo === "none" 
                ? 
                  dateFrom
                : 
                  dateFrom === dateTo 
                  ?
                    dateFrom
                  :
                    dateFrom + " - " + dateTo
              }
            </span>
          </div>

          {/* Cena */}
          <span className="block text-lg font-semibold leading-tight">
            {changePriceFormat(price)} Kč
          </span>

          {/* Zjistit více */}
          <div className="flex w-full flex-row items-center justify-between font-semibold text-primary transition-colors duration-300 sm:text-lg">
            <span>Zobrazit více</span>
            <HiArrowRight className="ml-5 h-5 w-5" />
          </div>
        </div>
      </a>
    </Link>
  );
}
