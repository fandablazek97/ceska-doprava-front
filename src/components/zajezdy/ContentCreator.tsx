import Button from "@components/bricks/Button";
import Heading from "@components/bricks/Heading";
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
  const [refresh, setRefresh] = useState<boolean>(false);
  const [hasItemsLeft, setHasItemsLeft] = useState<boolean>(true);
  const itemsAtStart = 6;
  const addItems = 3;
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
        /* Pokud se to ??sp????n?? p??ipojilo */
        if (all.data !== undefined && all.data !== null) {
          /* Pokud zat??m nejsou ????dn?? data nebo se zm??nil filtr */
          if (data.length === 0 || filterChanged) {
            /* Pokud se v datab??zi nena??la ????dn?? data podle parametr?? */
            if (all.data.length === 0) {
              data = [];
              setRefresh(!refresh);
            } else {
            /* Pokud se na??li data */
              data = all.data;
              setRefresh(!refresh);
              /* Pokud je sta??en??ch dat m???? ne?? bylo po????d??no -> skryje tla????tko */
              if (all.data.length < currentAmount + addXItems) {
                setHasItemsLeft(false);
              }
            }
          } else {
          /* Pokud u?? existujou n??jak?? data */
            data.push(...all.data);
            setRefresh(!refresh);

            /* Pokud je dat m???? ne?? bylo po????d??no -> skryje tla????tko */
            if (data.length < currentAmount + addXItems) {
              setHasItemsLeft(false);
            }
          }
        } else {
        /* ??patn?? p??ipojen??/po??adavek */
          data = [];
          setRefresh(!refresh);
        }
      });
  }

  if (data.length === 0) {
    return (
      <Wrapper paddedContent="lg" className="flex justify-center">
        <Heading level={3} size={"base"}>
          Ve v??mi vybran??ch parametrech nem??me ????dn?? z??jezd.
        </Heading>
      </Wrapper>
    );
  } else {
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
        {hasItemsLeft && (
          <Button
            className="mx-auto mt-24 !flex w-fit"
            onClick={() => getData(data.length, addItems, false)}
          >
            Na????st dal????
          </Button>
        )}
      </Wrapper>
    );
  }
}
