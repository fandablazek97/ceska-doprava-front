import Heading from "@components/bricks/Heading";
import Wrapper from "@components/bricks/Wrapper";
import MapClient from "@components/map/MapClient";

import Image from "next/image";
import ReactMarkdown from "react-markdown";

type Props = {
  text?: string;
  information?: string;
  transport?: string;
  programme?: string;
  comment?: string;
  departurePoints: any;
  newDeparturePoints?: any;
  organizer?: string;
};

export default function Information({
  text,
  information,
  transport,
  programme,
  comment,
  departurePoints,
  newDeparturePoints,
  organizer,
}: Props) {
  return (
    <Wrapper size="sm" id="informace" className="mb-16 flex flex-col gap-y-10">
      {text && (
        <div>
          <Heading level={2} size={"base"}>
            Popis
          </Heading>
          <div className="
            prose my-6 prose-headings:leading-[1.2]
            prose-h1:text-lg
            prose-h2:text-lg prose-h3:text-base prose-h4:text-sm
            prose-h5:text-xs prose-h5:font-semibold
            prose-h6:text-xs
            prose-h6:font-semibold
            prose-p:text-sm xs:prose-h1:text-xl
            xs:prose-h2:text-xl lg:prose-h1:text-2xl
          ">
            <ReactMarkdown>{text}</ReactMarkdown>
          </div>
        </div>
      )}

      {information && (
        <div>
          <Heading level={2} size={"base"}>
            Důležité informace
          </Heading>
          <div className="
            prose my-6 prose-headings:leading-[1.2]
            prose-h1:text-lg
            prose-h2:text-lg prose-h3:text-base prose-h4:text-sm
            prose-h5:text-xs prose-h5:font-semibold
            prose-h6:text-xs
            prose-h6:font-semibold
            prose-p:text-sm xs:prose-h1:text-xl
            xs:prose-h2:text-xl lg:prose-h1:text-2xl
          ">
            <ReactMarkdown>{information}</ReactMarkdown>
          </div>
        </div>
      )}

      {transport && (
        <div>
          <Heading level={2} size={"base"}>
            Doprava
          </Heading>
          <div className="
            prose my-6 prose-headings:leading-[1.2]
            prose-h1:text-lg
            prose-h2:text-lg prose-h3:text-base prose-h4:text-sm
            prose-h5:text-xs prose-h5:font-semibold
            prose-h6:text-xs
            prose-h6:font-semibold
            prose-p:text-sm xs:prose-h1:text-xl
            xs:prose-h2:text-xl lg:prose-h1:text-2xl
          ">
            <ReactMarkdown>{transport}</ReactMarkdown>
          </div>
        </div>
      )}
      {newDeparturePoints ?
        <MapClient markers={departurePoints.flatMap((stop: any) =>
          stop.mesto.map((m: any) => ({
            position: m.souradnice.split(","),
            children:
              <div className="space-y-1.5">
                <p className="!m-0">{m.popisek && <><b>Popis:</b> {m.popisek}</>}</p>
                <p><b>Město:</b> {m.nazev}</p>
                <p><b>Adresa:</b> {m.adresa}</p>
                <p><b>Cena:</b> {stop.cena}Kč</p>
                <p><b>Souřadnice:</b> {m.souradnice}</p>
              </div>
          }))
        )?.sort((a: any, b: any) => a.poradi - b.poradi)}
          center={newDeparturePoints?.[0].attributes?.stred?.split(",").split(",").map((pos: string) => parseFloat(pos)) as [number, number]}
          zoom={8}
          className="h-[600px]"
        />

        : departurePoints?.length !== 0 && (
          <div>
            <Heading level={2} size={"base"}>
              Odjezdová místa
            </Heading>
            {departurePoints.map((e: any, key: number) => (
              <div key={key}>
                <table className="w-full max-w-2xl">
                  <thead>
                    <tr>
                      <td>
                        <Heading level={4} size="xs" className="mb-5 mt-7">
                          Nástupní místo
                        </Heading>
                      </td>
                      <td>
                        <Heading
                          level={4}
                          size="xs"
                          align="right"
                          className="mb-5 mt-7 min-w-[125px]"
                        >
                          Příplatek
                        </Heading>
                      </td>
                    </tr>
                  </thead>
                  <tbody className="divide-y-2">
                    {e.attributes.mesta.map((en: any, key: number) => (
                      <tr key={key}>
                        <td>
                          {en.mesto.map((mesto: any, key: number) =>
                            key !== en.mesto.length - 1
                              ? mesto.mesto + ", "
                              : mesto.mesto
                          )}
                        </td>
                        <td className="py-2 text-right font-medium text-primary">
                          {en.cena === 0 ? "Zdarma" : en.cena}
                          {en.cena !== 0 && " Kč / osoba"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {e.attributes.obrazek.data !== null && (
                  <div className="relative mt-5 aspect-square max-h-[400px] w-full overflow-hidden rounded-md">
                    <Image
                      src={e.attributes.obrazek.data.attributes.url}
                      alt={""}
                      fill
                      sizes="(max-width: 768px) 50vw,
                    (max-width: 1200px) 50vw,
                    50vw"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      {programme && (
        <div>
          <Heading level={2} size={"base"}>
            Program
          </Heading>
          <div className="
            prose my-6 prose-headings:leading-[1.2]
            prose-h1:text-lg
            prose-h2:text-lg prose-h3:text-base prose-h4:text-sm
            prose-h5:text-xs prose-h5:font-semibold
            prose-h6:text-xs
            prose-h6:font-semibold
            prose-p:text-sm xs:prose-h1:text-xl
            xs:prose-h2:text-xl lg:prose-h1:text-2xl
          ">
            <ReactMarkdown>{programme}</ReactMarkdown>
          </div>
        </div>
      )}

      {comment && (
        <div>
          <Heading level={2} size={"base"}>
            Poznámka k zájezdu
          </Heading>
          <div className="
            prose my-6 prose-headings:leading-[1.2]
            prose-h1:text-lg
            prose-h2:text-lg prose-h3:text-base prose-h4:text-sm
            prose-h5:text-xs prose-h5:font-semibold
            prose-h6:text-xs
            prose-h6:font-semibold
            prose-p:text-sm xs:prose-h1:text-xl
            xs:prose-h2:text-xl lg:prose-h1:text-2xl
          ">
            <ReactMarkdown>{comment}</ReactMarkdown>
          </div>
        </div>
      )}

      {organizer && (
        <div>
          <Heading level={2} size={"base"}>
            Pořadatel
          </Heading>
          <p className="my-6 text-lg">{organizer}</p>
        </div>
      )}

      <p className="mt-10 font-bold">ZMĚNA PROGRAMU VYHRAZENA</p>
    </Wrapper>
  );
}