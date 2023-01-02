import Wrapper from "@components/bricks/Wrapper";
import { useState } from "react";

import ContentFilter from "./ContentFilter";
import DatesAll from "./DatesAll";
import Form from "./Form/Form";
import Gallery from "./Gallery";
import Information from "./Information";

type Props = {
  code: string;
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
  organizer?: any;
};

export default function ContentCreator({
  code,
  country,
  otherImages,
  dateAndPrice,
  text,
  information,
  transport,
  programme,
  comment,
  trasy,
  organizer,
}: Props) {
  const [content, setContent] = useState("informace");
  let contentShown: any;
  let allDeparturePoints: string[] = [];

  trasy !== null &&
    trasy.map((e: any, i: number) => {
      e.attributes.mesta.map(
        (en: any) =>
          !allDeparturePoints.includes(en.nazevMesta) &&
          allDeparturePoints.push(en.nazevMesta)
      );
    });

  if (content === "informace") {
    contentShown = (
      <Information
        text={text}
        information={information}
        transport={transport}
        programme={programme}
        comment={comment}
        departurePoints={trasy}
        organizer={organizer}
      />
    );
  } else if (content === "termin") {
    contentShown = <DatesAll dateAndPrice={dateAndPrice} />;
  } else if (content === "galerie") {
    contentShown = <Gallery images={otherImages} />;
  } else if (content === "objednavka") {
    contentShown = (
      <Form
        code={code}
        country={country}
        dateAndPrice={dateAndPrice}
        departurePoints={allDeparturePoints}
      />
    );
  }

  return (
    <Wrapper size="sm" as={"section"} className="pt-24">
      <ContentFilter content={content} setContent={setContent} />

      {contentShown}
    </Wrapper>
  );
}
