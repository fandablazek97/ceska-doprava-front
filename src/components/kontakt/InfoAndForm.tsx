import Heading from "@components/bricks/Heading";
import Wrapper from "@components/bricks/Wrapper";
import Form from "@components/kontakt/Form";

type Props = {};

export default function InfoAndForm({}: Props) {
  return (
    <Wrapper paddedContent="base" size="base" className="grid md:grid-cols-4">
      <div className="flex flex-col px-2">
        <Heading level={2} size="base" className="mb-12">
          Firemní údaje
        </Heading>
        <p>ČESKÁ DOPRAVA.CZ s.r.o.</p>
        <p>U Papírny 210, 340 21 Janovice nad Úhlavou</p>
        <p>IČ: 07592507</p>
        <p>DIČ: CZ07592507</p>
        <p>Jednatel: Ing. Martin Zdvořák</p>
      </div>
      <div className="col-span-3">
        <Form></Form>
      </div>
    </Wrapper>
  );
}
