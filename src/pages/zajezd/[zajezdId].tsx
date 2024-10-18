import Seo from "@components/root/seo/Seo";
import ContentCreator from "@components/zajezd/ContentCreator";
import Hero from "@components/zajezd/Hero";
import { ipToFetch } from "@configs/globalConfig";
import { useEffect, useState } from "react";

type Props = {
  country: string;
  location: string;
  name: string;
  perex: string;
  code: string;
  categories: [{ kategorie: string }];
  imageSrc: string;
  otherImages?: [string];
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
  obsazeny: boolean;
};

export default function Zajezd({
  country,
  location,
  name,
  perex,
  code,
  categories,
  imageSrc,
  otherImages,
  dateAndPrice,
  text,
  information,
  transport,
  programme,
  comment,
  trasy,
  organizer,
  obsazeny,
}: Props) {
  const [lowestPrice, setLowestPrice] = useState<number>(9999999);
  useEffect(() => {
    dateAndPrice.map((e: any, index: number) => {
      let tmp = lowestPrice;
      if (e.cena < tmp) {
        setLowestPrice(e.cena);
      }
    });
  });

  return (
    <>
      <Seo title={`${name} | Česká Doprava`} description={perex} />
      <Hero
        country={country}
        location={location}
        name={name}
        perex={perex}
        price={lowestPrice}
        date={dateAndPrice.length === 1 && dateAndPrice[0].datumOd}
        code={code}
        categories={categories}
        imageSrc={imageSrc}
        imageAlt="Úvodní fotka zájezdu"
        full={obsazeny}
      />
      <ContentCreator
        code={code}
        name={name}
        country={country}
        imageSrc={imageSrc}
        otherImages={otherImages}
        dateAndPrice={dateAndPrice}
        text={text}
        information={information}
        transport={transport}
        programme={programme}
        comment={comment}
        trasy={trasy}
        organizer={organizer}
        full={obsazeny}
      />
    </>
  );
}

export async function getStaticProps({ params }: any) {
  const zajezdData = (
    await (
      await fetch(
        ipToFetch +
        "/api/zajezds/" +
        params.zajezdId +
        "?populate[terminACena][fields][0]=datumOd&populate[terminACena][fields][1]=datumDo&populate[terminACena][fields][2]=cena&populate[kategorie][fields][3]=kategorie&populate[odjezdovaMista][fields][4]=mesto&populate[odjezdovaMista][fields][5]=ulice&populate[odjezdovaMista][fields][6]=cisloPopisne&populate[uvodniFoto][fields][7]=url&populate[dalsiFoto][fields][8]=url&populate[terminACena][fields][9]=pocetDni&populate[terminACena][fields][10]=pocetNoci&populate[trasy][fields][11]=oznaceni"
      )
    ).json()
  ).data;
  let trasyString = "";
  zajezdData.attributes.trasy.map((e: any, i: number) => {
    if (trasyString === "") {
      trasyString += "?filters[$or][" + i + "][oznaceni][$eq]=" + e.oznaceni;
    } else {
      trasyString += "&filters[$or][" + i + "][oznaceni][$eq]=" + e.oznaceni;
    }
  });
  const trasyData = (
    await (
      await fetch(ipToFetch + "/api/trasas" + trasyString + "&populate[obrazek][fields][0]=url&populate[mesta][fields][1]=cena&populate[mesta][populate]=mesto")
    ).json()
  ).data;

  return {
    props: {
      country: zajezdData.attributes.stat,
      location: zajezdData.attributes.lokace,
      name: zajezdData.attributes.nazev,
      perex: zajezdData.attributes.kratkyPopis,
      code: zajezdData.attributes.kod,
      categories: zajezdData.attributes.kategorie,
      imageSrc: zajezdData.attributes.uvodniFoto.data.attributes.url,
      otherImages:
        zajezdData.attributes.dalsiFoto.data !== null &&
        zajezdData.attributes.dalsiFoto.data.map((e: any) => {
          return e.attributes.url;
        }),
      dateAndPrice: zajezdData.attributes.terminACena,
      text: zajezdData.attributes.popis,
      information: zajezdData.attributes.informace,
      transport: zajezdData.attributes.doprava,
      programme: zajezdData.attributes.program,
      comment: zajezdData.attributes.poznamka,
      trasy: trasyData,
      organizer: zajezdData.attributes.poradatel,
      obsazeny: zajezdData.attributes.obsazeny
    },
  };
}

export async function getStaticPaths() {
  const data = (
    await (await fetch(ipToFetch + "/api/zajezds?fields[0]=id&sort[0]=id&pagination[page]=1&pagination[pageSize]=1000")).json()
  ).data;

  const paths = Object.entries(data).map((zajezd: any) => {
    return {
      params: { zajezdId: String(zajezd[1].id) },
    };
  });
  return {
    paths,
    fallback: false,
  };
}
