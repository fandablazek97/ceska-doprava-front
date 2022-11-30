import Heading from "@components/bricks/Heading";
import Wrapper from "@components/bricks/Wrapper";
import Image from "next/image";

type Props = {
  text?: string;
  information?: string;
  transport?: string;
  programme?: string;
  comment?: string;
  departurePoints: any;
  organizer?: string;
}

export default function Information({
  text,
  information,
  transport,
  programme,
  comment,
  departurePoints,
  organizer
}: Props) {
  return (
    <Wrapper
      size="sm"
      id="informace"
      className="flex flex-col gap-y-10 mb-16"
    >
      <div className={`${text === null ? "hidden" : "block"}`}>
        <Heading level={2} size={"base"}>Popis</Heading>
        <p className="text-sm my-6">{text}</p>
      </div>
      <div className={`${information === null ? "hidden" : "block"}`}>
        <Heading level={2} size={"base"}>Důležité informace</Heading>
        <p className="text-sm my-6">{information}</p>
      </div>
      <div className={`${transport === null ? "hidden" : "block"}`}>
        <Heading level={2} size={"base"}>Doprava</Heading>
        <p className="text-sm my-6">{transport}</p>
      </div>
      {departurePoints !== null && departurePoints.length !== 0 &&
      <div>
        <Heading level={2} size={"base"}>Odjezdová místa</Heading>
          {departurePoints.map((point: any, i: any) => (
            <div className="flex flex-col mt-5 gap-y-3">
              <Heading level={3} size={"sm"}>{point.attributes.nazev} trasa</Heading>
              {point.attributes.mesta.map((city: any, i: number) => (
                i + 1 === point.attributes.mesta.length ? city.nazevMesta : city.nazevMesta + ", "
              ))}
              {point.attributes.obrazek.data !== null &&
                <div className="w-full aspect-square max-h-[400px] relative rounded-md overflow-hidden">
                  <Image
                      src={point.attributes.obrazek.data.attributes.url}
                      layout="fill"
                      objectFit="contain"
                      sizes="(max-width: 768px) 50vw,
                      (max-width: 1200px) 50vw,
                      50vw"
                    />
                </div>
              }
            </div>
           ))}
      </div>
      }
      <div className={` ${programme === null ? "hidden" : "block"}`}>
        <Heading level={2} size={"base"}>Program</Heading>
        <p className="text-sm my-6">{programme}</p>
      </div>
      <div className={`${comment === null ? "hidden" : "block"}`}>
        <Heading level={2} size={"base"}>Poznámka k zájezdu</Heading>
        <p className="text-sm my-6">{comment}</p>
      </div>
      <div className={`${comment === null ? "hidden" : "block"}`}>
        <Heading level={2} size={"base"}>Poznámka k zájezdu</Heading>
        <p className="text-sm my-6">{comment}</p>
      </div>
      <div className={`${organizer === null ? "hidden" : "block"}`}>
        <Heading level={2} size={"base"}>Pořadatel</Heading>
        <p className="text-lg my-6">{organizer}</p>
      </div>
      <p className="mt-10 font-bold">ZMĚNA PROGRAMU VYHRAZENA</p>
    </Wrapper>
  )
}