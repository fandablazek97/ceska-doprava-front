import ScrollReveal from "@components/bricks/ScrollReveal";
import "react-indiana-drag-scroll/dist/style.css";

import Heading from "@components/bricks/Heading";
import Wrapper from "@components/bricks/Wrapper";
import { NewMap } from "@components/zajezd/Information";

type Props = {
  departurePoints: DeparturePointsProps[] | any;
  stred: string;
  zoom: number;
};

interface DeparturePointsProps {
  oblast: string;
  stat: string;
  mesto: Mesto[];
}

interface Mesto {
  nazev: string;
}

export default function DeparturePoints({ departurePoints, stred, zoom }: Props) {
  return (
    <Wrapper as="section" size="base" paddedContent="sm" className="mt-12">
      <ScrollReveal>
        <Heading level={2} size="xl">
          Nástupní a výstupní místa
        </Heading>
        <p className="mt-10">
          Nabízíme největší počet nástupních míst v Plzeňském a Jihočeském
          kraji. Nabereme vás doslova na každém rohu. V Chorvatsku obsluhujeme
          všechna letoviska podél celého pobřeží.
        </p>
        <div className="mt-12 text-error font-bold text-lg">
          Od června do září odjíždí autobusy z České republiky každý pátek a z Chorvatska zpět do ČR každou sobotu.
        </div>
      </ScrollReveal>

      <NewMap stops={departurePoints.flatMap((stop: any) =>
        stop.mesto.map((m: any) => ({ ...m, cena: stop.cena }))
      )} center={stred} zoom={zoom} />
    </Wrapper>
  );
}
