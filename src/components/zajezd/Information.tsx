import Heading from "@components/bricks/Heading";
import Wrapper from "@components/bricks/Wrapper";
import Image from "next/image";
import ReactMarkdown from 'react-markdown'

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
      {text && 
        <div>
          <Heading level={2} size={"base"}>Popis</Heading>
          <div className="[&>p]:text-sm my-6">
            <ReactMarkdown>{text}</ReactMarkdown>
            </div>
        </div>
      }

      {information && 
        <div>
          <Heading level={2} size={"base"}>Důležité informace</Heading>
          <div className="[&>p]:text-sm my-6">
            <ReactMarkdown>{information}</ReactMarkdown>
            </div>
        </div>
      }

      {transport && 
        <div>
          <Heading level={2} size={"base"}>Doprava</Heading>
          <div className="[&>p]:text-sm my-6">
            <ReactMarkdown>{transport}</ReactMarkdown>
            </div>
        </div>
      }

      {departurePoints && departurePoints.length !== 0 &&
        <div>
          <Heading level={2} size={"base"}>Odjezdová místa</Heading>
            {departurePoints.map((point: any, key: any) => (
              <div className="flex flex-col mt-5 gap-y-3" key={key}>
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

      {programme && 
        <div>
          <Heading level={2} size={"base"}>Program</Heading>
          <div className="[&>p]:text-sm my-6">
            <ReactMarkdown>{programme}</ReactMarkdown>
            </div>
        </div>
      }

      {comment && 
        <div>
          <Heading level={2} size={"base"}>Poznámka k zájezdu</Heading>
          <div className="[&>p]:text-sm my-6">
            <ReactMarkdown>{comment}</ReactMarkdown>
            </div>
        </div>
      }

      {organizer &&
        <div>
          <Heading level={2} size={"base"}>Pořadatel</Heading>
          <p className="text-lg my-6">{organizer}</p>
        </div>
      }

      <p className="mt-10 font-bold">ZMĚNA PROGRAMU VYHRAZENA</p>
    </Wrapper>
  )
}