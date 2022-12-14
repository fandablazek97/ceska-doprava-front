import Wrapper from "@components/bricks/Wrapper";
import DatePicker from "@components/forms/DatePicker";
import { ScrollContainer } from "react-indiana-drag-scroll";
import "react-indiana-drag-scroll/dist/style.css";
import { tagAndText } from "./References";

type Props = {
  category?: string;
  setCategory: any;
  dateFrom?: string;
  setDateFrom: any;
  dateTo?: string;
  setDateTo: any;
};

export default function Filter({
  category = "Vse",
  setCategory,
  dateFrom = "26.09.",
  setDateFrom,
  dateTo = "26.09.",
  setDateTo,
}: Props) {
  return (
    <section id="filter" className="border-mute relative mb-5 border-y">
      <Wrapper
        size="lg"
        className={`flex min-h-[75px] !w-full flex-row justify-between py-5 xl:py-16`}
      >
        <div
          className={`grid w-full grid-cols-1 justify-between xl:flex xl:flex-row`}
        >
          <ScrollContainer
            component={"ul"}
            className={`my-auto flex flex-row pb-5 xl:mr-16 xl:pt-5`}
          >
            {Object.entries(tagAndText).map((elem: any, key: number) => (
              <li
                tabIndex={0}
                key={key}
                className={`mx-1 flex h-10 w-fit cursor-pointer items-center justify-center whitespace-nowrap rounded-lg px-3 text-sm font-semibold md:text-base xl:px-5
                    ${
                      elem[0] === category ? "bg-gray-200" : "hover:bg-gray-100"
                    }`}
                onClick={() => setCategory(elem[0])}
              >
                {elem[1]}
              </li>
            ))}
          </ScrollContainer>
          <div
            className={`grid grid-cols-2 justify-center gap-5 sm:flex sm:justify-end xl:my-auto`}
          >
            <DatePicker
              text="Datum od"
              startDay="today"
              setFunction={setDateFrom}
              datePickerAlign="left"
              datePickerValueAlign="left"
              tabIndex={0}
              inputClassName="rounded-lg w-full sm:w-[153px] h-12 bg-gray-200 font-semibold"
            />
            <DatePicker
              text="Datum do"
              startDay={31}
              startMonth={11}
              startYear={new Date().getFullYear() + 1}
              setFunction={setDateTo}
              datePickerAlign="right"
              datePickerValueAlign="left"
              tabIndex={0}
              inputClassName="rounded-lg w-full sm:w-[153px] h-12 bg-gray-200 font-semibold"
            />
          </div>
        </div>
      </Wrapper>
    </section>
  );
}
