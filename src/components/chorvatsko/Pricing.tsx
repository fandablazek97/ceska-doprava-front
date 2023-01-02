import Heading from "@components/bricks/Heading";
import ScrollReveal from "@components/bricks/ScrollReveal";
import Wrapper from "@components/bricks/Wrapper";

type Props = {
  prices: {
    oblast: string;
    jednosmerna: number;
    zpatecni: number;
  }[];
  specialPrices: {
    cena: string;
    mesto: {
      nazev: string;
    }[];
  }[];
  swimming: any;
};

export default function Pricing({ prices, specialPrices, swimming }: Props) {
  return (
    <div className="bg-body-100">
      <Wrapper as="section" size="base" paddedContent="sm">
        <ScrollReveal>
          <Heading level={2} size="xl">
            Cena jízdného
          </Heading>
          <div className="my-10 grid grid-cols-1 gap-20 md:grid-cols-2">
            <p>
              I přes neustálý růst cen PHM a dalších vstupních nákladů se
              snažíme pro naše cestující zachovat přátelské ceny jízdenek tak,
              aby cestování na Jadran zůstalo cenově dostupné pro každého z vás
              a zároveň abychom vám stále byli schopni nabídnout vysokou kvalitu
              služeb.
            </p>
          </div>
        </ScrollReveal>
        <ScrollReveal staggerChildren className="mt-20 flex flex-col gap-16">
          <div>
            <Heading level={3} size="base">
              Jízdné
            </Heading>
            <table className="w-full max-w-2xl">
              <thead>
                <tr>
                  <td>
                    <Heading level={4} size="xs" className="mb-2 mt-7">
                      Cílová oblast
                    </Heading>
                  </td>
                  <td>
                    <Heading
                      level={4}
                      size="xs"
                      align="right"
                      className="mb-2 mt-7"
                    >
                      Jednosměrná jízdenka
                    </Heading>
                  </td>
                  <td>
                    <Heading
                      level={4}
                      size="xs"
                      align="right"
                      className="mb-2 mt-7"
                    >
                      Obousměrná jízdenka
                    </Heading>
                  </td>
                </tr>
              </thead>
              <tbody>
                {prices.map((e: any, key: number) => (
                  <tr key={key}>
                    <td>{e.oblast}</td>
                    <td className="py-2 text-right font-medium text-primary">
                      {e.jednosmerna} Kč
                    </td>
                    <td className="py-2 text-right font-medium text-primary">
                      {e.zpatecni} Kč
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <Heading level={3} size="base">
              Jednodenní koupání
            </Heading>
            <table className="w-full max-w-2xl">
              <thead>
                <tr>
                  <td>
                    <Heading level={4} size="xs" className="mb-2 mt-7">
                      Cílová oblast
                    </Heading>
                  </td>
                  <td>
                    <Heading
                      level={4}
                      size="xs"
                      align="right"
                      className="mb-2 mt-7"
                    >
                      Obousměrná jízdenka
                    </Heading>
                  </td>
                </tr>
              </thead>
              <tbody>
                {swimming.map((e: any, key: number) => (
                  <tr key={key}>
                    <td>{e.oblast}</td>
                    <td className="py-2 text-right font-medium text-primary">
                      {e.obousmerna} Kč
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Nástupní místa */}
          <div>
            <Heading level={3} size="base">
              Nástupní místa
            </Heading>
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
                {specialPrices.map((e: any, key: number) => {
                  return (
                    <tr key={key}>
                      <td>
                        {e.mesto.map((mesto: any, key: number) =>
                          key !== e.mesto.length - 1
                            ? mesto.nazev + ", "
                            : mesto.nazev
                        )}
                      </td>
                      <td className="py-2 text-right font-medium text-primary">
                        {e.cena}
                        {e.cena !== "Zdarma" && " Kč / osoba"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </ScrollReveal>
      </Wrapper>
    </div>
  );
}
