import ScrollReveal from "@components/bricks/ScrollReveal";
import "react-indiana-drag-scroll/dist/style.css";

import Heading from "@components/bricks/Heading";
import Wrapper from "@components/bricks/Wrapper";
import MapClient from "@components/map/MapClient";
import { useState } from "react";

type Props = {
  departurePoints: DeparturePointsProps[] | any;
  stredCr: string | null;
  zoomCr: number | null;
  stredHr: string | null;
  zoomHr: number | null;
};

interface DeparturePointsProps {
  oblast: string;
  stat: string;
  mesto: Mesto[];
}

interface Mesto {
  nazev: string;
}

export default function DeparturePoints({ departurePoints, stredCr, zoomCr, stredHr, zoomHr }: Props) {
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
        <div className="my-12 text-error font-bold text-lg">
          Od června do září odjíždí autobusy z České republiky každý pátek a z Chorvatska zpět do ČR každou sobotu.
        </div>
      </ScrollReveal>
      <div className="space-y-20">
        <div>
          <Heading level={3} size="base" className="pb-3">
            Nástupní a výstupní místa Česká republika
          </Heading>
          <div>
            <p><span className="text-red-600 font-semibold">ČERVENÁ</span> - Hlavní trasa</p>
            <p><span className="text-yellow-400 font-semibold">ŽLUTÁ</span> - Svozová trasa</p>
          </div>
          <MapClient markers={departurePoints
            .filter((stat: any) => stat.stat === "Česká Republika")
            .flatMap((oblast: any) => oblast.mesto.map((m: any, index: number) => {
              return (
                {
                  position: m.souradnice.split(","),
                  trasa: m.trasa,
                  children:
                    <div className="space-y-1.5" key={"mcm" + index}>
                      <p className="!m-0">{m.popisek && <><b>Popis:</b> {m.popisek}</>}</p>
                      <p><b>Město:</b> {m.nazev}</p>
                      <p><b>Adresa:</b> {m.adresa}</p>
                      <p><b>Souřadnice:</b> {m.souradnice.split(",").map((coord: any) => parseFloat(coord).toFixed(8)).join(", ")}</p>
                      {m.cena && <p><b>Příplatek:</b> {m.cena}</p>}
                      {m.casOdjezdu && <p><b>Čas:</b> {m.casOdjezdu.slice(0, -3)}</p>}
                    </div>
                })
            }))}
            center={stredCr?.split(",").map(pos => parseFloat(pos)) as [number, number]}
            zoom={zoomCr ?? undefined}
            className="h-[calc(100vh-25vh)]"
          />
          <p className="text-right text-red-600 font-semibold">Seznam odjezdových míst je orientační, rádi vás nabereme i na dalších místech na trase autobusu</p>
        </div>

        <div>
          <Heading level={3} size="base" className="pb-3">
            Nástupní a výstupní místa Chorvatsko
          </Heading>
          <MapClient markers={departurePoints
            .filter((stat: any) => stat.stat === "Chorvatsko")
            .flatMap((oblast: any) => oblast.mesto.map((m: any, index: number) => ({
              position: m.souradnice.split(","),
              children:
                <div className="space-y-1.5" key={"mcm" + index}>
                  <p className="!m-0">{m.popisek && <><b>Popis:</b> {m.popisek}</>}</p>
                  <p><b>Město:</b> {m.nazev}</p>
                  <p><b>Adresa:</b> {m.adresa}</p>
                  <p><b>Souřadnice:</b> {m.souradnice.split(",").map((coord: any) => parseFloat(coord).toFixed(8)).join(", ")}</p>
                  {m.cena && <p><b>Příplatek:</b> {m.cena}</p>}
                  {m.casOdjezdu && <p><b>Čas:</b> {m.casOdjezdu.slice(0, -3)}</p>}
                </div>
            })))}
            center={stredHr?.split(",").map(pos => parseFloat(pos)) as [number, number]}
            zoom={zoomHr ?? undefined}
            className="h-[calc(100vh-25vh)]"
          />
          <p className="float-right text-red-600 font-semibold">Seznam odjezdových míst je orientační, rádi vás nabereme i na dalších místech na trase autobusu</p>
        </div>
      </div>
    </Wrapper>
  );
}

function ListVsech({ departurePoints }: any) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div>
      <button onClick={() => setOpen(!open)}>{open ? "Zavřít " : "Otevřít "}informace</button>

      <div className={`${!open && "hidden"}`}>
        {departurePoints.map((dp: any, index: number) => (
          <div key={"dp" + index}>
            <Heading level={3} size="base" className="pb-3">{dp.oblast}</Heading>
            <table>
              <thead>
                <tr>
                  <th>Město</th>
                  <th>Adresa</th>
                  <th>Čas odjezdu</th>
                  <th>Popisek</th>
                  <th>Příplatek</th>
                </tr>
              </thead>
              <tbody>
                {dp.mesto.map((stop: any, index: number) => <tr key={"sp" + index}>
                  <td>{stop.nazev}</td>
                  <td>{stop.adresa}</td>
                  <td>{stop.casOdjezdu}</td>
                  <td>{stop.popisek}</td>
                  <td>{stop.cena}</td>
                </tr>)}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}
