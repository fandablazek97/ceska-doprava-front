import Button from "@components/bricks/Button";
import Wrapper from "@components/bricks/Wrapper";
import { useState, useEffect } from "react";
import TripMinimal from "./TripMinimal";

type Props = {
  category: string;
  zajezdData: any;
};

const zajezdy:any[] = [];
let itemsLeft:boolean = true;

export default function ContentCreator({ category, zajezdData }: Props) {
  const [refresh, setRefresh] = useState<boolean>(false);
  const addItems = 9;


  useEffect(() => {
    showItems(0,12); 
  }, [])
  

  function changeDateType(date: string) {
    let newDate = date.split("-")[2] + "." + date.split("-")[1] + ".";
    return newDate;
  }
  
  function showItems(start: number, end: number){
    for(let i = start; i < end; i++){
      zajezdData[i] ? zajezdy[i] = zajezdData[i] : itemsLeft = false;
    }
    setRefresh(!refresh);
  }

    return (
       <Wrapper id="zajezdy" size="lg" paddedContent="sm">
       <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-2 xl:grid-cols-3 2xl:gap-x-16 2xl:gap-y-20">
         {zajezdy.map((trip: any, key: number) => (
           <TripMinimal
             key={key}
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
       {itemsLeft && (
         <Button
           className="mx-auto mt-24 !flex w-fit"
           onClick={() => showItems(zajezdy.length, zajezdy.length + addItems)}
         >
           Načíst další
         </Button>
       )}
     </Wrapper>
    );
}