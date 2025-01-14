import Heading from "@components/bricks/Heading";
import Wrapper from "@components/bricks/Wrapper";

export default function Hero() {
  return (
    <div className="relative pt-36 pb-12">
      <Wrapper size="base">
        <Heading level={1} size="xl">
          ŠKOLNÍ VÝLETY A ZÁJEZDY NA KLÍČ
        </Heading>
        <p className="mt-10">
          Rádi byste se svými žáky nebo spolužáky vyrazili za poznáním, kulturou nebo turistikou, ale nechce se vám trávit dlouhé
          hodiny telefonováním, mailováním a zařizováním všeho potřebného k uspořádání takového školního výletu? Nechte starosti na
          nás a užívejte si zážitky z cestování s vaší třídou a spolužáky. Připravujeme školní výlety a zájezdy na klíč od nabídky až po
          realizaci.
        </p>
      </Wrapper>
    </div>
  );
}
