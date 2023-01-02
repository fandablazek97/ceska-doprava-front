import Heading from "@components/bricks/Heading";
import ScrollReveal from "@components/bricks/ScrollReveal";
import Wrapper from "@components/bricks/Wrapper";

type Props = {
  months: any;
  year: string;
};

export default function Dates({ months, year }: Props) {
  return (
    <Wrapper as="section" size="base" paddedContent="sm">
      <ScrollReveal>
        <Heading level={2} size="xl">
          Termíny {year}
        </Heading>
      </ScrollReveal>

      <div className="my-14 grid grid-cols-1 items-start justify-start gap-12 md:grid-cols-2">
        {months.map((e: any, key: number) => {
          return (
            <div key={key} className="overflow-hidden rounded-2xl">
              <Heading
                level={3}
                size="none"
                color="white"
                align="center"
                className="bg-primary py-5 text-lg sm:text-xl lg:text-2xl"
              >
                {e.mesic}
              </Heading>
              <div className="grid grid-cols-2 bg-gray-100 py-5">
                <div className="flex flex-col gap-y-1 divide-y-2">
                  <Heading
                    level={4}
                    align="center"
                    size="xs"
                    className="flex h-12 items-end justify-center pb-2"
                  >
                    Odjezd ČR(pátek)
                  </Heading>
                  {e.datumCr !== undefined &&
                    e.datumCr.map((date: any, key: number) => (
                      <p className="text-center" key={key}>
                        {date.datum}
                      </p>
                    ))}
                </div>
                <div className="flex flex-col gap-y-1 divide-y-2">
                  <Heading
                    level={4}
                    align="center"
                    size="xs"
                    className="flex h-12 items-end justify-center pb-2"
                  >
                    Odjezd Chorvatsko(sobota)
                  </Heading>
                  {e.datumHr !== undefined &&
                    e.datumHr.map((date: any, key: number) => (
                      <p className="text-center" key={key}>
                        {date.datum}
                      </p>
                    ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
}
