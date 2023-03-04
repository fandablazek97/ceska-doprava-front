import BasicHero from "@components/bricks/BasicHero";
import Seo from "@components/root/seo/Seo";
import ContentAndFilter from "@components/zajezdy/ContentAndFilter";
import Downloads from "@components/zajezdy/Downloads";
import { ipToFetch } from "@configs/globalConfig";
// import Button from "@components/bricks/Button";
// import { HiArrowSmDown } from "react-icons/hi";

type Props = {
  calendar: string;
  catalog: string;
  conditions: string;
};

export default function zajezdy({ calendar, catalog, conditions }: Props) {
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
          /* "Říká se, že zážitky vám nikdo nesebere. Proto pro vás již 4. sezónu připravujeme výlety za poznáním, kulturou, sportem i odpočinkem. Vyberte si cestovatelský zážitek podle svých představ a objevujte s námi krásy světa kolem nás." */
        }
      >
        {/* <div className="flex flex-col gap-5 sm:flex-row md:flex-col lg:flex-row">
          <Button
            as="a"
            href="#filter"
            className="w-full"
            rightIcon={<HiArrowSmDown />}
          >
            Zobrazit zájezdy
          </Button>
          <Button
            as="a"
            href="#keStazeni"
            variant={"outlined"}
            className="w-full"
          >
            Informace ke stažení
          </Button>
        </div> */}
      </BasicHero>

      {/* Zobrazovač zájezdů + Filtr + veškerá logika*/}
      <ContentAndFilter />

      {/* Kalendář, Katalog, Podmínky -> ke stažení */}
      <Downloads
        calendar={calendar}
        catalog={catalog}
        conditions={conditions}
      />
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    ipToFetch +
    "/api/informace?populate[katalog][fields][0]=url&populate[kalendar][fields][1]=url&populate[podminky][fields][2]=url"
  );
  const dataAndMeta = await res.json();
  const data = dataAndMeta.data ? dataAndMeta.data.attributes : null;
  if (data) {
    return {
      props: {
        calendar: data.kalendar.data ? data.kalendar.data.attributes.url : null,
        catalog: data.katalog.data ? data.katalog.data.attributes.url : null,
        conditions: data.podminky.data ? data.podminky.data.attributes.url : null
      },
    };
  }
  else {
    return {
      props: {
        calendar: null,
        catalog: null,
        conditions: null
      },
    };
  }
}
