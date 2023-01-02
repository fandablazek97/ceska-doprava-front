import Heading from "@components/bricks/Heading";
import ScrollReveal from "@components/bricks/ScrollReveal";
import Wrapper from "@components/bricks/Wrapper";
import { BiTask } from "react-icons/bi";
import { GrMapLocation } from "react-icons/gr";
import { MdAccessTime } from "react-icons/md";

export default function Informations() {
  return (
    <div className="bg-body-100 pb-20" id="informace">
      <Wrapper
        as="section"
        size="base"
        paddedContent="sm"
        className="flex flex-col items-center justify-center"
      >
        <ScrollReveal>
          <Heading level={2} size={"lg"} align="center" className="mb-10">
            Jak to funguje
          </Heading>
          <p className="max-w-prose text-center">
            Autobusy odjíždí z České republiky každý pátek večer a z Chorvatska
            každou sobotu večer a to od června do září. Všechny autobusy jsou
            vybaveny polohovatelnými sedačkami s bezpečnostními pásy,
            klimatizací, vždy funkční toaletou, občerstvením, zásuvkami na 230V,
            televizí a k dispozici je vám profesionální a zkušená posádka.
          </p>
        </ScrollReveal>
        <ScrollReveal
          staggerChildren
          className="mt-24 grid grid-cols-1 gap-x-5 gap-y-12 md:grid-cols-3 lg:gap-x-10"
        >
          <div className="relative flex flex-col items-center  rounded-2xl bg-white px-5 pt-10 pb-5 shadow-2xl">
            <span className="absolute left-1/2 top-0 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-xl text-white">
              <GrMapLocation className="[&>path]:stroke-white" />
            </span>
            <Heading level={3} size="sm" align="center">
              Vyberte destinaci.
            </Heading>
            <p className="mt-5 text-center text-sm">
              Vyberte si z více než 40 nástupních míst v ČR a zvolte vaší
              oblíbenou destinaci v Chorvatsku.
            </p>
          </div>
          <div className="relative flex flex-col items-center  rounded-2xl bg-white px-5 pt-10 pb-5 shadow-2xl">
            <span className="absolute left-1/2 top-0 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-xl text-white">
              <MdAccessTime />
            </span>
            <Heading level={3} size="sm" align="center">
              Na jak dlouho?
            </Heading>
            <p className="mt-5 text-center text-sm">
              Autobusy odjíždí z ČR každý pátek a můžete s nimi vyrazit jak na
              týdenní dovolenou, tak se zajet vykoupat na jeden den za super
              zvýhodněné jízdné.
            </p>
          </div>
          <div className="relative flex flex-col items-center rounded-2xl bg-white px-5 pt-10 pb-5 shadow-2xl">
            <span className="absolute left-1/2 top-0 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-xl text-white">
              <BiTask />
            </span>
            <Heading level={3} size="sm" align="center">
              Rezervujte si místo
            </Heading>
            <p className="mt-5 text-center text-sm">
              Vytvořte si snadno a rychle rezervaci jízdenek pro vaší cestu do
              Chorvatska
            </p>
          </div>
        </ScrollReveal>
      </Wrapper>
    </div>
  );
}
