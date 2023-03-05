import Wrapper from "@components/bricks/Wrapper";
import DatePicker from "@components/forms/DatePicker";
import Link from "next/link";
import { ScrollContainer } from "react-indiana-drag-scroll";
import "react-indiana-drag-scroll/dist/style.css";
import { tagAndText } from "./References";

type Props = {
  category?: string;
};

export default function Filter({
  category = "Vse",
}: Props) {
  return (
    <section id="filter" className="border-mute relative mb-5 border-y">
      <Wrapper
        size="lg"
        className={`flex min-h-[75px] !w-full flex-row justify-between py-5 xl:py-10`}
      >
        <div
          className={`grid w-fit grid-cols-1 justify-between mx-auto`}
        >
          <ScrollContainer
            component={"ul"}
            className={`my-auto flex flex-row`}
          >
            {Object.entries(tagAndText).map((elem: any, key: number) => (
              <li
                tabIndex={0}
                key={key}
                className={`mx-1 flex h-10 w-fit cursor-pointer items-center justify-center whitespace-nowrap rounded-lg px-3 text-sm font-semibold md:text-base xl:px-5
                    ${elem[0] === category ? "bg-gray-200" : "hover:bg-gray-100"
                  }`}
              >

                <Link href={`/zajezdy/${elem[0].toLowerCase()}`}><a>{elem[1]}</a></Link>
              </li>
            ))}
          </ScrollContainer>
        </div>
      </Wrapper>
    </section>
  );
}
