import Button from "@components/bricks/Button";
import Heading from "@components/bricks/Heading";
import Loader from "@components/bricks/Loader";
import Wrapper from "@components/bricks/Wrapper";
import { ipToFetch } from "@configs/globalConfig";
import { useEffect, useState } from "react";
import TripMinimal from "./TripMinimal";

type Props = {
  category: string;
  dateFrom: string;
  dateTo: string;
};
type Trip = {
  id: number;
  name: string;
  dateAndPrice: DateAndPrice[];
  price: string;
  imageSrc: string;
  dateFrom: string;
  dateTo: string;
  categories: Categories[];
};
type Categories = {
  kategorie: string;
};
type DateAndPrice = {
  datumOd: string;
  datumDo: string;
  cena: number;
};

let data: Trip[] = [];

export default function ContentCreator({ category, dateFrom, dateTo }: Props) {
  const [state, setState] = useState<"initial" | "loading" | "success" | "error" | "nodata">("initial");
  const [refresh, setRefresh] = useState<boolean>(false);
  const [hasItemsLeft, setHasItemsLeft] = useState<boolean>(true);
  const itemsAtStart = 12;
  const addItems = 9;
  const populateQuery =
    "?populate[0]=uvodniFoto&populate[1]=kategorie&populate[2]=terminACena";
  let categoryQuery =
    category === "Vse"
      ? ""
      : "&filters[kategorie][kategorie][$containsi]=" + category;
  let dateQuery =
    "&filters[$and][0][terminACena][datumOd][$gte]=" +
    dateFrom +
    "&filters[$and][1][terminACena][datumOd][$lte]=" +
    dateTo;
  const fieldsQuery = "&fields[0]=nazev";
  const sortQuery = "&sort[0]=dulezitost%3Adesc&sort[1]=id";

  useEffect(() => {
    setState("loading");
    setHasItemsLeft(true);
    getData(0, itemsAtStart, true);
  }, [category, dateFrom, dateTo]);

  async function getData(
    currentAmount: number,
    addXItems: number,
    filterChanged: boolean
  ) {
    let paginationQuery =
      "&pagination[start]=" + currentAmount + "&pagination[limit]=" + addXItems;
    await fetch(
      ipToFetch +
      "/api/zajezds" +
      populateQuery +
      categoryQuery +
      dateQuery +
      paginationQuery +
      fieldsQuery +
      sortQuery
    )
      .then((response) => response.json())
      .then((all) => {
        /* Pokud se to úspěšně připojilo */
        if (all.data !== undefined && all.data !== null) {
          /* Pokud zatím nejsou žádný data nebo se změnil filtr */
          if (data.length === 0 || filterChanged) {
            /* Pokud se v databázi nenašla žádná data podle parametrů */
            if (all.data.length === 0) {
              data = [];
              setRefresh(!refresh);
              setState("nodata");
            } else {
              /* Pokud se našli data */
              data = all.data;
              setRefresh(!refresh);
              setState("success")
              /* Pokud je stažených dat míň než bylo požádáno -> skryje tlačítko */
              if (all.data.length < currentAmount + addXItems) {
                setHasItemsLeft(false);
              }
            }
          } else {
            /* Pokud už existujou nějaký data */
            data.push(...all.data);
            setRefresh(!refresh);
            setState("success")

            /* Pokud je dat míň než bylo požádáno -> skryje tlačítko */
            if (data.length < currentAmount + addXItems) {
              setHasItemsLeft(false);
            }
          }
        } else {
          /* Špatný připojení/požadavek */
          data = [];
          setRefresh(!refresh);
          setState("error")
        }
      });
  }
  if (state === "success") {
    return (
      <Wrapper id="zajezdy" size="lg" paddedContent="sm">
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-2 xl:grid-cols-3 2xl:gap-x-16 2xl:gap-y-20">
          {data.map((trip: any, key: number) => (
            <TripMinimal
              key={key}
              id={trip.id}
              name={trip.attributes.nazev}
              imageSrc={trip.attributes.uvodniFoto.data.attributes.url}
              categories={trip.attributes.kategorie}
              dateAndPrice={trip.attributes.terminACena}
              filterCategory={category}
              filterDateFrom={dateFrom}
              filterDateTo={dateTo}
            />
          ))}
        </div>
        {hasItemsLeft && state === "success" && (
          <Button
            className="mx-auto mt-24 !flex w-fit"
            onClick={() => getData(data.length, addItems, false)}
          >
            Načíst další
          </Button>
        )}
      </Wrapper>
    );
  }
  else if (state === "error") {
    return (
      <Wrapper paddedContent="lg" className="flex justify-center">
        <Heading level={3} size={"base"}>
          Při vyhledání zájezdů se vyskytla chyba. Prosím zkuste to znovu později.
        </Heading>
      </Wrapper>
    );
  }
  else if (state === "nodata") {
    return (
      <Wrapper paddedContent="lg" className="flex justify-center">
        <Heading level={3} size={"base"}>
          Ve vámi vybraných parametrech nemáme žádný zájezd.
        </Heading>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper paddedContent="lg" className="flex flex-col items-center gap-5 justify-center">
        <Loader size="2xl" thickness="5" />
        <Heading level={3} size={"base"}>
          Vydržte prosím, vyhledáváme pro Vás zájezdy.
        </Heading>
      </Wrapper>
    );
  }
}
