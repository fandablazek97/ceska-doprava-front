import Image from "next/image";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";

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
  let dateFrom: string = "2030-12-31";
  let dateTo: string | null = "2030-12-31";
  let price: number = 0;
  let counterForTags = 0;
  let tempPrice = 0;
  let today = new Date().toISOString().slice(0, 10);


  dateAndPrice.map((entry, index) => {
    if (index + 1 === dateAndPrice.length) {
      if (
        new Date(entry.datumOd).getTime() >=
        new Date(today).getTime() &&
        new Date(entry.datumOd).getTime() < new Date(dateFrom).getTime()
      ) {
        if (entry.datumDo === null) {
          dateFrom = changeDateType(entry.datumOd, true);
          dateTo = "none";
          price = entry.cena;
        } else {
          dateFrom = changeDateType(entry.datumOd);
          dateTo = changeDateType(entry.datumDo, true);
          price = entry.cena;
        }
      } else {
        if (entry.datumDo === null) {
          dateFrom = changeDateType(dateFrom, true);
          dateTo = "none";
          price = entry.cena;
        } else {
          dateFrom = changeDateType(dateFrom);
          if (dateTo) dateTo = changeDateType(dateTo, true);
          price = entry.cena;
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
        tempPrice = entry.cena;
      }
    }
  });

  function changeDateType(date: string, year?: boolean) {
    var newDate = date.split("-")[2] + "." + date.split("-")[1];
    if (year) newDate += "." + date.split("-")[0]
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
              {(dateTo === "none" || !dateTo || dateFrom === dateTo)
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
