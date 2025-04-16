import Button from "@components/bricks/Button";
import Heading from "@components/bricks/Heading";
import Wrapper from "@components/bricks/Wrapper";
import Select from "@components/forms/Select";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import "react-indiana-drag-scroll/dist/style.css";
import { tagAndText } from "./References";
import TripMinimal from "./TripMinimal";

export default function ContentAndFilter({ category, zajezdData }: { category: string, zajezdData: any }) {
  const router = useRouter();
  const { pocet } = router.query;
  const [showedItems, setShowedItems] = useState<number>(Number(pocet) || 12);
  const addItems = 9;

  useEffect(() => {
    if (pocet) setShowedItems(Number(pocet));
  }, [pocet]);


  function showMore() {
    const newCount = showedItems + addItems;
    setShowedItems(newCount);

    router.push({
      pathname: '/zajezdy/' + category,
      query: { pocet: newCount }
    }, undefined, { shallow: true })
  }

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
            <Select defaultValue={category} name="filterSelect" label="Vyberte kategorii:" className="flex md:hidden md:w-fit flex-col gap-y-1.5" selectClassName="w-full md:min-w-[320px]" setFunction={(value: string) => router.push("/zajezdy/" + value)}>
              {Object.entries(tagAndText).map((elem: any, index: number) => <option key={"ok" + index} value={elem[0]}>{elem[1]}</option>)}
            </Select>
          </div>
          <div
            className={`hidden md:flex min-h-[75px] !w-full flex-row justify-between`}
          >
            <div
              className={`grid w-fit grid-cols-1`}
            >
              <ScrollContainer
                component={"ul"}
                className={`flex flex-row gap-x-1.5 py-5 xl:py-10`}
              >
                {Object.entries(tagAndText).map((elem: any, key: number) => (
                  <li
                    tabIndex={0}
                    key={key}
                    className={`flex h-10 w-fit cursor-pointer items-center justify-center whitespace-nowrap rounded-lg px-2 text-sm font-semibold md:text-base select-none
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
            onClick={showMore}
          >
            Načíst další
          </Button>
        )}
      </Wrapper>
    </Wrapper>
  );
}