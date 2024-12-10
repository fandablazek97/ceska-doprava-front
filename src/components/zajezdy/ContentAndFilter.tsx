import Button from "@components/bricks/Button";
import Wrapper from "@components/bricks/Wrapper";
import Select from "@components/forms/Select";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { ScrollContainer } from "react-indiana-drag-scroll";
import "react-indiana-drag-scroll/dist/style.css";
import { tagAndText } from "./References";
import TripMinimal from "./TripMinimal";

export default function ContentAndFilter({ category, zajezdData }: { category: string, zajezdData: any }) {
  const router = useRouter();
  const addItems = 9;
  const [showedItems, setShowedItems] = useState<number>(12);

  return (
    <Wrapper as={"section"} size="lg">

      {/* Filter */}
      <section id="filter" className="border-mute relative mb-5 border-y">
        <Select defaultValue={category} name="filterSelect" label="" className="md:hidden mb-5" setFunction={(value: string) => router.push("/zajezdy/" + value)}>
          {Object.entries(tagAndText).map((elem: any, index: number) => <option key={"ok" + index} value={elem[0]}>{elem[1]}</option>)}
        </Select>
        <div
          className={`hidden md:flex min-h-[75px] !w-full flex-row justify-between py-5 xl:py-10`}
        >
          <div
            className={`grid w-fit grid-cols-1 justify-between mx-auto`}
          >
            <ScrollContainer
              component={"ul"}
              className={`my-auto flex flex-row`}
            >
              {Object.entries(tagAndText).map((elem: any, key: number) => (
                <li
                  tabIndex={0}
                  key={key}
                  className={`mx-1 flex h-10 w-fit cursor-pointer items-center justify-center whitespace-nowrap rounded-lg px-3 text-sm font-semibold md:text-base xl:px-5
                    ${elem[0] === category ? "bg-gray-200" : "hover:bg-gray-100"
                    }`}
                >
                  <Link href={`${elem[0]}`} scroll={false}>
                    {elem[1]}</Link>
                </li>
              ))}
            </ScrollContainer>
          </div>
        </div>
      </section>

      {/* Content */}

      <Wrapper id="zajezdy" size="lg" paddedContent="sm">
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-2 xl:grid-cols-3 2xl:gap-x-16 2xl:gap-y-20">
          {zajezdData.map((trip: any, key: number) => (
            key < showedItems &&
            <TripMinimal
              key={trip.id}
              id={trip.id}
              name={trip.attributes.nazev}
              imageSrc={trip.attributes.uvodniFoto.data.attributes.url}
              categories={trip.attributes.kategorie}
              dateAndPrice={trip.attributes.terminACena}
              filterCategory={category}
              full={trip.attributes.obsazeny}
            />
          ))}
        </div>
        {zajezdData.length > showedItems && (
          <Button
            className="mx-auto mt-24 !flex w-fit"
            onClick={() => setShowedItems(showedItems + addItems)}
          >
            Načíst další
          </Button>
        )}
      </Wrapper>
    </Wrapper>
  );
}