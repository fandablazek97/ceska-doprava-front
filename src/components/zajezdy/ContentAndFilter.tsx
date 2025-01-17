import Button from "@components/bricks/Button";
import Heading from "@components/bricks/Heading";
import Wrapper from "@components/bricks/Wrapper";
import Select from "@components/forms/Select";
import { useRouter } from "next/router";
import { useState } from "react";
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
      <Wrapper id="filterWrap" size="lg">
        <section id="filter" className="border-mute relative border-y pt-44 xl:pt-[208px] pb-5 w-full">
          <div className="flex flex-col md:flex-row gap-x-10 gap-y-5 justify-between w-full mb-5 items-end">
            <div className="space-y-5">
              <Heading level={1} size={"lg"} className={`text-left`}>
                Cestovní agentura
              </Heading>

              <p>Vyberte si cestovatelský zážitek podle svých představ a objevujte s námi krásy světa kolem nás.</p>
            </div>
            <Select defaultValue={category} name="filterSelect" label="Vyberte kategorii:" className="md:w-fit flex flex-col gap-y-1.5" selectClassName="w-full md:min-w-[320px]" setFunction={(value: string) => router.push("/zajezdy/" + value)}>
              {Object.entries(tagAndText).map((elem: any, index: number) => <option key={"ok" + index} value={elem[0]}>{elem[1]}</option>)}
            </Select>
          </div>
          {/* <div
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
        </div> */}
        </section>
      </Wrapper>

      {/* Content */}

      <Wrapper id="zajezdy" size="lg" paddedContent="sm" className="pt-7">
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-2 xl:grid-cols-3 2xl:gap-x-16 2xl:gap-y-20">
          {zajezdData.map((trip: any, key: number) => (
            key < showedItems &&
            <TripMinimal
              key={trip.id}
              id={trip.id}
              name={trip.attributes.nazev}
              imageSrc={trip.attributes.uvodniFoto.data?.attributes.url}
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