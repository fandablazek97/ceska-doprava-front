import Heading from "@components/bricks/Heading";
import Wrapper from "@components/bricks/Wrapper";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

type Props = {
  text?: string;
  information?: string;
  transport?: string;
  programme?: string;
  comment?: string;
  departurePoints: any;
  organizer?: string;
};

export default function Information({
  text,
  information,
  transport,
  programme,
  comment,
  departurePoints,
  organizer,
}: Props) {
  return (
    <Wrapper size="sm" id="informace" className="mb-16 flex flex-col gap-y-10">
      {text && (
        <div>
          <Heading level={2} size={"base"}>
            Popis
          </Heading>
          <div
            className="
            prose my-6 prose-headings:leading-[1.2]
            prose-h1:text-lg
            prose-h2:text-lg prose-h3:text-base prose-h4:text-sm
            prose-h5:text-xs prose-h5:font-semibold
            prose-h6:text-xs
            prose-h6:font-semibold
            prose-p:text-sm xs:prose-h1:text-xl
            xs:prose-h2:text-xl lg:prose-h1:text-2xl
            [&>*]:text-black
          "
          >
            <ReactMarkdown>{text}</ReactMarkdown>
          </div>
        </div>
      )}

      {information && (
        <div>
          <Heading level={2} size={"base"}>
            Důležité informace
          </Heading>
          <div className="my-6 [&>p]:text-sm">
            <ReactMarkdown>{information}</ReactMarkdown>
          </div>
        </div>
      )}

      {transport && (
        <div>
          <Heading level={2} size={"base"}>
            Doprava
          </Heading>
          <div className="my-6 [&>p]:text-sm">
            <ReactMarkdown>{transport}</ReactMarkdown>
          </div>
        </div>
      )}

      {departurePoints && departurePoints.length !== 0 && (
        <div>
          <Heading level={2} size={"base"}>
            Odjezdová místa
          </Heading>
          {departurePoints.map((point: any, key: any) => (
            <div className="mt-5 flex flex-col gap-y-3" key={key}>
              <Heading level={3} size={"sm"}>
                {point.attributes.nazev} trasa
              </Heading>
              {point.attributes.mesta.map((city: any, i: number) =>
                i + 1 === point.attributes.mesta.length
                  ? city.nazevMesta
                  : city.nazevMesta + ", "
              )}
              {point.attributes.obrazek.data !== null && (
                <div className="relative aspect-square max-h-[400px] w-full overflow-hidden rounded-md">
                  <Image
                    src={point.attributes.obrazek.data.attributes.url}
                    layout="fill"
                    objectFit="contain"
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
          <div className="my-6 [&>p]:text-sm">
            <ReactMarkdown>{programme}</ReactMarkdown>
          </div>
        </div>
      )}

      {comment && (
        <div>
          <Heading level={2} size={"base"}>
            Poznámka k zájezdu
          </Heading>
          <div className="my-6 [&>p]:text-sm">
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
