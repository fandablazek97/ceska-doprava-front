import Heading from "@components/bricks/Heading";
import Wrapper from "@components/bricks/Wrapper";
import {
  HiDownload,
  HiOutlineBookOpen,
  HiOutlineCalendar,
  HiOutlineClipboardList
} from "react-icons/hi";

type Props = {
  calendar: string;
  catalog: string;
  conditions: string;
};

export default function Downloads({ calendar, catalog, conditions }: Props) {
  return (
    <section id="keStazeni" className="bg-gray-100">
      <Wrapper size="base" className="py-20 md:py-36">
        <Heading level={3} size={"lg"} className="font-bold text-black">
          Informace ke stažení
        </Heading>

        <div className="mt-20 grid gap-8 md:grid-cols-3">
          {/* Kalendář */}
          {calendar &&
            <a
              href={calendar}
              download
              className="flex flex-col rounded-2xl bg-white px-5 py-8 duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <HiOutlineCalendar className="my-auto h-40 w-40 text-primary md:h-20 md:w-20 [&>path]:stroke-1" />
              <div className="p-5 md:px-0">
                <Heading level={4} size="sm">
                  Kalendář akcí
                </Heading>
                <p className="mt-5 text-sm text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                  vulputate libero.
                </p>
                <span className="mt-10 flex flex-row font-semibold">
                  Stáhnout zde
                  <HiDownload size={20} className="mt-1" />
                </span>
              </div>
            </a>
          }

          {/* Katalog */}

          {catalog &&
            <a
              href={catalog}
              download
              className="flex flex-col rounded-2xl bg-white px-5 py-8 duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <HiOutlineBookOpen className="my-auto h-40 w-40 text-primary md:h-20 md:w-20 [&>path]:stroke-1" />
              <div className="p-5 md:px-0">
                <Heading level={4} size="sm">
                  Aktuální katalog
                </Heading>
                <p className="mt-5 text-sm text-gray-600">
                  Objevte naši nejnovější nabídku zájezdů a inspirujte se širokým výběrem destinací pro vaši příští dovolenou. Stačí si stáhnout katalog a začít plánovat!
                </p>
                <span className="mt-10 ml-0 flex flex-row font-semibold">
                  Stáhnout zde
                  <HiDownload size={20} className="mt-1" />
                </span>
              </div>
            </a>
          }

          {/* Podmínky */}

          {conditions &&
            <a
              href={conditions}
              download
              className="flex flex-col rounded-2xl bg-white px-5 py-8 duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <HiOutlineClipboardList className="my-auto h-40 w-40 text-primary md:h-20 md:w-20 [&>path]:stroke-1" />
              <div className="p-5 md:px-0">
                <Heading level={4} size="sm">
                  Všeobecné obchodní podmínky
                </Heading>
                <p className="mt-5 text-sm text-gray-600">
                  Seznamte se s našimi obchodními podmínkami, které vám poskytnou všechny důležité informace o rezervaci a účasti na zájezdech.
                </p>
                <span className="mt-10 ml-0 flex flex-row font-semibold">
                  Stáhnout zde
                  <HiDownload size={20} className="mt-1" />
                </span>
              </div>
            </a>
          }
        </div>
      </Wrapper>
    </section>
  );
}
