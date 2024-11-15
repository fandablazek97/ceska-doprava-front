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
  organizer?: any;
  full: boolean;
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
  organizer,
  full
}: Props) {
  const [content, setContent] = useState("informace");
  let contentShown: any;
  let allDeparturePoints: string[] = [];

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
        name={name}
        country={country}
        dateAndPrice={dateAndPrice}
        trasy={trasy}
        full={full}
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
