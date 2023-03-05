import BasicHero from "@components/bricks/BasicHero";
import Seo from "@components/root/seo/Seo";
import ContentAndFilter from "@components/zajezdy/ContentAndFilter";
import Downloads from "@components/zajezdy/Downloads";
import { ipToFetch } from "@configs/globalConfig";

type Props = {
  calendar: string;
  catalog: string;
  conditions: string;
  zajezdData: any;
};

export default function Exkurze({ calendar, catalog, conditions, zajezdData }: Props) {
  return (
    <>
      <Seo
        title="Cestovní agentura – Nabízíme desítky zájezdů po celém Česku i Evropě"
        description="Nabízíme zájezdy za poznáním, kulturou, sportem a odpočinkem. Vydejte se s námi na jednodenní či vícedenní výlety. Již od 499 Kč."
      />
      <BasicHero
        heading="Cestovní agentura"
        text={
          "Vyberte si cestovatelský zážitek podle svých představ a objevujte s námi krásy světa kolem nás."
        }
      >
      </BasicHero>

      {/* Zobrazovač zájezdů + Filtr + veškerá logika*/}
      <ContentAndFilter category="vse" zajezdData={zajezdData}/>

      {/* Kalendář, Katalog, Podmínky -> ke stažení */}
      <Downloads
        calendar={calendar}
        catalog={catalog}
        conditions={conditions}
      />
    </>
  );
}

export async function getStaticProps({params}: any) {

  /* ZAJEZD */
  const populateQuery =
    "?populate[0]=uvodniFoto&populate[1]=kategorie&populate[2]=terminACena";
  let dateQuery =
    "&filters[$and][0][terminACena][datumOd][$gte]=" +
    "2023-03-05" +
    "&filters[$and][1][terminACena][datumOd][$lte]=" +
    "2025-12-31";
  const fieldsQuery = "&fields[0]=nazev";
  const sortQuery = "&sort[0]=dulezitost%3Adesc&sort[1]=id";
  const paginationQuery = "&pagination[start]=0&pagination[limit]=1000";
  const categoryQuery = params.kategorie !== "vse" ? "filters[kategorie][kategorie][$containsi]=" + params.kategorie : "";

  const zajezdRes = await fetch(
    ipToFetch +
      "/api/zajezds" +
      populateQuery +
      dateQuery +
      fieldsQuery +
      sortQuery +
      paginationQuery +
      categoryQuery 
  );

  const zajezdDataAndMeta = await zajezdRes.json();
  const zajezdData = zajezdDataAndMeta.data ? zajezdDataAndMeta.data : null;


/* INFO */
  const infoRes = await fetch(
    ipToFetch +
    "/api/informace?populate[katalog][fields][0]=url&populate[kalendar][fields][1]=url&populate[podminky][fields][2]=url"
  );
  const infoDataAndMeta = await infoRes.json();
  const infoData = infoDataAndMeta.data ? infoDataAndMeta.data.attributes : null;

  return {
    props: {
      calendar: infoData.kalendar ? infoData.kalendar.data ? infoData.kalendar.data.attributes.url : null : null,
      catalog: infoData.katalog ? infoData.katalog.data ? infoData.katalog.data.attributes.url : null : null,
      conditions: infoData.katalog ? infoData.podminky.data ? infoData.podminky.data.attributes.url : null : null,
      zajezdData: zajezdData ? zajezdData : null
    },
  };
}

export async function getStaticPaths() {
  const allCategories = ["vse", "novinky", "jednodenni", "chorvatsko", "lyzovani", "exkurze", "muzikaly", "adventni", "badfussing"]

  const paths = allCategories.map((category: any) => {
    return {
      params: { kategorie: category },
    };
  });
  return {
    paths,
    fallback: false,
  };
}
