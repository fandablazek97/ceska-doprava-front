import Link from "next/link";
import { ScrollContainer } from "react-indiana-drag-scroll";
import "react-indiana-drag-scroll/dist/style.css";
import { tagAndText } from "./References";
import { useState } from "react";
import Wrapper from "@components/bricks/Wrapper";
import TripMinimal from "./TripMinimal";
import Button from "@components/bricks/Button";

export default function ContentAndFilter({category, zajezdData} : {category: string, zajezdData:any}) {
  const addItems = 9;
  const [showedItems, setShowedItems] = useState<number>(12);

  function changeDateType(date: string) {
    let newDate = date.split("-")[2] + "." + date.split("-")[1] + ".";
    return newDate;
  }

  return (
    <Wrapper as={"section"} size="lg">

      {/* Filter */}
       <section id="filter" className="border-mute relative mb-5 border-y">
      <div
        className={`flex min-h-[75px] !w-full flex-row justify-between py-5 xl:py-10`}
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
                <Link href={`${elem[0]}`} scroll={false}><a>
                {elem[1]}</a></Link>
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
             filterDateFrom={changeDateType(new Date().toISOString().slice(0, 10))}
             filterDateTo={"24.12.2099"}
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