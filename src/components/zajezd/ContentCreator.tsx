import Wrapper from "@components/bricks/Wrapper";
import { useState } from "react";

import ContentFilter from "./ContentFilter";
import DatesAll from "./DatesAll";
import Form from "./Form/Form";
import Gallery from "./Gallery";
import Information from "./Information";

type Props = {
  code: string;
  name: string;
  country: string;
  imageSrc: string;
  otherImages?: any;
  dateAndPrice: [
    {
      datumOd: string;
      datumDo: string;
      cena: number;
      pocetDni: number;
      pocetNoci: number;
    }
  ];
  text: string;
  information?: string;
  transport?: string;
  programme?: string;
  comment?: string;
  trasy: any;
  newTrasy?: any;
  organizer?: any;
  full: boolean;
  cenaMistenky: number;
};

export default function ContentCreator({
  code,
  name,
  country,
  otherImages,
  dateAndPrice,
  text,
  information,
  transport,
  programme,
  comment,
  trasy,
  newTrasy,
  organizer,
  full,
  cenaMistenky
}: Props) {
  const [content, setContent] = useState("informace");
  let contentShown: any;

  if (content === "informace") contentShown = null;
  else if (content === "termin") contentShown = <DatesAll dateAndPrice={dateAndPrice} />;
  else if (content === "galerie") contentShown = <Gallery images={otherImages} />;
  else if (content === "objednavka") contentShown = (
    <Form
      code={code}
      name={name}
      country={country}
      dateAndPrice={dateAndPrice}
      trasy={newTrasy ? newTrasy : trasy}
      full={full}
      cenaMistenky={cenaMistenky}
    />
  );
  return (
    <Wrapper size="sm" as={"section"} className="pt-24">
      <ContentFilter content={content} setContent={setContent} otherImages={otherImages} />
      <div className={`${content !== "informace" && "hidden"}`}>
        <Information
          text={text}
          information={information}
          transport={transport}
          programme={programme}
          comment={comment}
          departurePoints={trasy}
          newDeparturePoints={newTrasy}
          organizer={organizer}
        />
      </div>
      {contentShown}
    </Wrapper>
  );
}
