import Heading from "@components/bricks/Heading";
import ScrollReveal from "@components/bricks/ScrollReveal";
import Wrapper from "@components/bricks/Wrapper";

type Props = {
  year: string;
};

export default function Dates({ year }: Props) {
  return (
    <Wrapper as="section" size="base" paddedContent="sm">
      <ScrollReveal>
        <Heading level={2} size="xl">
          Termíny {year}
        </Heading>
      </ScrollReveal>

      <div className="mt-12">
        Autobusy odjíždí z <b>České republiky</b> každý <b>pátek</b> večer a z <b>Chorvatska</b> každou <b>sobotu</b> večer a to od <b>června</b> do <b>září</b>.
      </div>
    </Wrapper>
  );
}
