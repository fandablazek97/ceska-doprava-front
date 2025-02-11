import { useEffect, useRef, useState } from "react";
import { BsChevronDown, BsChevronLeft, BsChevronRight } from "react-icons/bs";
import ScrollContainer from "react-indiana-drag-scroll";

type DatePickerProps = {
  text?: string;
  label?: string;
  name?: string;
  startDay?: number | "today";
  startMonth?: number | "today";
  startYear?: number | "today";
  setFunction?: any;
  defaultTextAlign?: "left" | "center" | "right";
  datePickerValueAlign?: "left" | "center" | "right";
  datePickerAlign: "left" | "right";
  tabIndex?: number;
  inputClassName?: string;
  allDataObject?: any;
  yearStart?: number;
  yearEnd?: number;
  yearOrder?: "asc" | "desc";
  isRequired?: boolean;
  requiredArray?: any;
  formState?: "waiting" | "verifying" | "refused" | "accepted" | "refused-email"
  oneOfMany?: false | string;
};

const months = [
  "leden",
  "únor",
  "březen",
  "duben",
  "květen",
  "červen",
  "červenec",
  "srpen",
  "září",
  "říjen",
  "listopad",
  "prosinec",
];

export default function DatePicker({
  text,
  label,
  name = "",
  startDay,
  startMonth,
  startYear,
  setFunction,
  defaultTextAlign = "left",
  datePickerValueAlign = "left",
  datePickerAlign,
  tabIndex,
  inputClassName,
  allDataObject,
  yearStart = new Date().getFullYear() - 5,
  yearEnd = new Date().getFullYear() + 5,
  yearOrder = "asc",
  isRequired = false,
  requiredArray,
  formState,
  oneOfMany = false,
}: DatePickerProps) {
  const [inValidation, setInValidation] = useState<
    "waiting" | "verifying" | "refused" | "accepted" | "refused-email"
  >();
  const [activated, setActivated] = useState<boolean>(false);

  if (startDay === "today" || startMonth === "today" || startYear === "today") {
    if (startDay === "today") {
      startDay = new Date().getDate();
      startMonth = new Date().getMonth();
      startYear = new Date().getFullYear();
    }
    if (startMonth === "today") {
      startMonth = new Date().getMonth();
      startYear = new Date().getFullYear();
    }
    if (startYear === "today") {
      startYear = new Date().getFullYear();
    }
  }

  const [day, setDay] = useState<number | undefined>(startDay);
  const [month, setMonth] = useState<number | undefined>(startMonth);
  const [year, setYear] = useState<number | undefined>(startYear);
  let content: any;
  let inputText: any;
  const clickerRef: any = useRef();

  useEffect(() => {
    if (oneOfMany === false) {
      if (allDataObject !== undefined) {
        if (allDataObject[name] === undefined) {
          if (day && month && year) {
            allDataObject[name] = day + "." + month + "." + year;
          }
          else {
            allDataObject[name] = "";
          }
        }
      }
      if (isRequired && requiredArray !== undefined) {
        if (!requiredArray.includes(name)) {
          requiredArray?.push(name);
        }
      }
    } else {
      if (allDataObject !== undefined) {
        if (allDataObject[oneOfMany] === undefined) {
          allDataObject[oneOfMany] = {};
        } else {
          if (allDataObject[oneOfMany][name] === undefined)
            if (day && month && year) {
              allDataObject[oneOfMany][name] = day + "." + month + "." + year;
            }
            else {
              allDataObject[oneOfMany][name] = "";
            }
        }
      }
      if (isRequired && requiredArray !== undefined) {
        if (requiredArray[oneOfMany] === undefined) {
          requiredArray[oneOfMany] = [];
          requiredArray[oneOfMany].push(name);
        } else {
          if (!requiredArray[oneOfMany].includes(name)) {
            requiredArray[oneOfMany].push(name);
          }
        }
      }
    }
  }, []);

  useEffect(() => {
    if (activated) {
      document.addEventListener("mousedown", closeDatePicker);
    } else {
      document.removeEventListener("mousedown", closeDatePicker);
    }
  }, [activated]);

  useEffect(() => {
    setInValidation(formState);
  }, [formState])

  function closeDatePicker(e: any) {
    if (
      clickerRef.current &&
      activated &&
      !clickerRef.current.contains(e.target)
    ) {
      setActivated(false);
    }
  }

  /* Vytvoření klikacích spanů */

  if (year !== undefined) {
    if (month !== undefined) {
      if (day !== undefined) {
        /* Pokud je vyplněn rok, měsíc a den  */
        inputText = (
          <>
            <span /* Den */
              className="mr-1 cursor-pointer"
              onClick={() => {
                setDay(undefined);
              }}
            >
              {day + "."}
            </span>
            <span /* Měsíc */
              className="mr-1 cursor-pointer"
              onClick={() => {
                setMonth(undefined);
                setDay(undefined);
              }}
            >
              {months[month]}
            </span>
            <span /* Rok */
              className="cursor-pointer"
              onClick={() => {
                setYear(undefined);
                setMonth(undefined);
                setDay(undefined);
              }}
            >
              {year}
            </span>
          </>
        );
      } else {

        /* Pokud je vyplněn pouze rok a měsíc */
        inputText = (
          <>
            <span /* Měsíc */
              className="mr-1 cursor-pointer"
              onClick={() => {
                setMonth(undefined);
                setDay(undefined);
              }}
            >
              {months[month]}
            </span>
            <span /* Rok */
              className="cursor-pointer"
              onClick={() => {
                setYear(undefined);
                setMonth(undefined);
                setDay(undefined);
              }}
            >
              {year}
            </span>
          </>
        );
      }
      content = (
        <ShowDays
          setDay={setDay}
          setMonth={setMonth}
          setYear={setYear}
          day={day}
          month={month}
          year={year}
          setActivated={setActivated}
          setFunction={setFunction}
          name={name}
          allDataObject={allDataObject}
          oneOfMany={oneOfMany}
        />
      );
    } else {

      /* Pokud je vyplněn pouze rok */
      inputText = (
        <span /* Rok */
          className="cursor-pointer"
          onClick={() => setYear(undefined)}
        >
          {year}
        </span>
      );
      content = (
        <ShowMonths
          month={month}
          setMonth={setMonth}
          year={year}
          setYear={setYear}
        />
      );
    }
  } else {
    content = (
      <ShowYears
        setYear={setYear}
        year={year}
        yearStart={yearStart}
        yearEnd={yearEnd}
        yearOrder={yearOrder}
      />
    );
  }
  return (
    <>
      <span className="relative" ref={clickerRef} tabIndex={tabIndex}>
        <div
          className={`flex-col md:max-w-sm
      ${label !== undefined ? "flex" : "hidden"}
    `}
        >
          <label
            className="mb-3 cursor-pointer font-semibold text-black"
            htmlFor={name}
            onClick={() => setActivated(true)}
          >
            {label}
            {isRequired && <span className="ml-1 text-primary">*</span>}
            {inValidation === "refused" &&
              isRequired &&
              oneOfMany === false &&
              allDataObject[name] === "" && (
                <span className="ml-1 text-primary">Toto pole je povinné!</span>
              )}
            {inValidation === "refused" &&
              isRequired &&
              oneOfMany !== false &&
              allDataObject[oneOfMany][name] === "" && (
                <span className="ml-1 text-primary">Toto pole je povinné!</span>
              )}
          </label>
        </div>

        {/* Jakoby input */}
        <div
          className={`
          duration-default flex cursor-pointer items-center p-1.5 transition
          ${activated &&
            "!border-primary bg-transparent !bg-white !outline-none ring-2 ring-primary"
            }
          ${inputText === undefined &&
            defaultTextAlign === "left" &&
            "justify-start"
            }
          ${inputText === undefined &&
            defaultTextAlign === "center" &&
            "justify-center"
            }
          ${inputText === undefined &&
            defaultTextAlign === "right" &&
            "justify-end"
            }
          ${inputText !== undefined &&
            datePickerValueAlign === "left" &&
            "justify-start"
            }
          ${inputText !== undefined &&
            datePickerValueAlign === "center" &&
            "justify-center"
            }
          ${inputText !== undefined &&
            datePickerValueAlign === "right" &&
            "justify-end"
            }
          ${inputClassName === undefined
              ? "h-12 w-full rounded-md bg-body-200"
              : inputClassName
            }
          `}
          onClick={() => {
            setActivated(true);
          }}
        >
          {inputText === undefined ? text : inputText}
        </div>

        {/* Datepicker */}
        <ScrollContainer
          component={"div"}
          className={`absolute z-50 mt-5 flex h-fit w-80 flex-col overflow-y-auto rounded-lg bg-gray-50 shadow-xl
          ${!activated && "hidden"}
          ${datePickerAlign === "left" && "left-0"}
          ${datePickerAlign === "right" && "right-0"}
          ${year === undefined || month === undefined
              ? "max-h-72 p-3"
              : "px-5 pb-8"
            }
        `}
        >
          {content}
        </ScrollContainer>
      </span>
    </>
  );
}

type ShowYearsProps = {
  year: number | undefined;
  setYear: any;
  yearStart: number;
  yearEnd: number;
  yearOrder: "asc" | "desc";
};

function ShowYears({ year, setYear, yearStart, yearEnd, yearOrder }: ShowYearsProps) {
  let yearValues: any = [];
  if (yearOrder === "asc") {
    for (let i = yearStart; i <= yearEnd; i++) {
      yearValues.push(
        <span
          key={i}
          className="cursor-pointer rounded-md text-center hover:bg-gray-200"
          onClick={() => setYear(i)}
        >
          {i}
        </span>
      );
    }
  } else {
    for (let i = yearEnd; i >= yearStart; i--) {
      yearValues.push(
        <span
          key={i}
          className="cursor-pointer rounded-md text-center hover:bg-gray-200"
          onClick={() => setYear(i)}
        >
          {i}
        </span>
      );
    }

  }
  return <div className="grid grid-cols-3 gap-3">{yearValues}</div>;
}

type ShowMonthsProps = {
  month: number | undefined;
  setMonth: any;
  year: number;
  setYear: any;
};

function ShowMonths({ month, setMonth, year, setYear }: ShowMonthsProps) {
  let monthValues: any = [];
  for (let i = 0; i <= 11; i++) {
    monthValues.push(
      <span
        key={i}
        className="cursor-pointer rounded-md text-center hover:bg-gray-200"
        onClick={() => setMonth(i)}
      >
        {months[i]}
      </span>
    );
  }

  return (
    <>
      <div className="grid h-14 w-full grid-cols-7">
        <span
          className="col-span-1 flex cursor-pointer items-center justify-start text-xl"
          onClick={() => setYear(year - 1)}
        >
          <BsChevronLeft></BsChevronLeft>
        </span>
        <span
          className="col-span-5 flex cursor-pointer items-center justify-center text-lg font-semibold"
          onClick={() => setYear(undefined)}
        >
          {year}
        </span>
        <span
          className="col-span-1 flex cursor-pointer items-center justify-end text-xl"
          onClick={() => setYear(year + 1)}
        >
          <BsChevronRight></BsChevronRight>
        </span>
      </div>
      <div className="grid grid-cols-3 gap-3">{monthValues}</div>
    </>
  );
}

type ShowDaysProps = {
  day: number | undefined;
  setDay: any;
  month: number;
  setMonth: any;
  year: number;
  setYear: any;
  setActivated: any;
  setFunction: any;
  name: string;
  allDataObject: any;
  oneOfMany: boolean | string;
};

function ShowDays({
  day,
  setDay,
  month,
  setMonth,
  year,
  setYear,
  setActivated,
  setFunction,
  name,
  allDataObject,
  oneOfMany,
}: ShowDaysProps) {
  let dayValues: any = [];
  let monthWithZero = month + 1 < 10 ? "0" + (month + 1) : month + 1;

  for (let i = 1; i <= new Date(year, month + 1, 0).getDate(); i++) {
    let dayWithZero = i < 10 ? "0" + i : i;

    if (i === 1 && new Date(year, month, 0).getDay() !== 1) {
      for (let i = 1; i <= new Date(year, month, 0).getDay(); i++) {
        dayValues.push(<span key={"spacer" + i}></span>);
      }
    }
    dayValues.push(
      <span
        key={i}
        className={`aspect-square cursor-pointer rounded-full p-1 text-center hover:bg-gray-200 ${day === i && "bg-primary text-white"
          }`}
        onClick={() => {
          setDay(i);
          setActivated(false);
          setFunction !== undefined &&
            setFunction(year + "-" + monthWithZero + "-" + dayWithZero);
          if (allDataObject !== undefined) {
            if (oneOfMany === false) {
              allDataObject[name] = dayWithZero + "." + monthWithZero + "." + year
            } else if (typeof oneOfMany === "string") {
              allDataObject[oneOfMany][name] = dayWithZero + "." + monthWithZero + "." + year
            }
          }
        }}
      >
        {i}
      </span>
    );
  }

  return (
    <>
      <div className="flex h-14 w-full justify-between">
        <span
          className="flex cursor-pointer items-center font-semibold"
          onClick={() => {
            setYear(undefined), setMonth(undefined), setDay(undefined);
          }}
        >
          {months[month] + "  " + year + "  "}
          <BsChevronDown className=" ml-1 cursor-pointer text-xl" />
        </span>
        <div className="flex gap-x-4">
          <span
            className="flex cursor-pointer items-center justify-start text-xl"
            onClick={() => {
              if (month === 0) {
                setMonth(11);
                setYear(year - 1);
              } else {
                setMonth(month - 1);
              }
            }}
          >
            <BsChevronLeft />
          </span>
          <span
            className="flex cursor-pointer items-center justify-end text-xl"
            onClick={() => {
              if (month === 11) {
                setMonth(0);
                setYear(year + 1);
              } else {
                setMonth(month + 1);
              }
            }}
          >
            <BsChevronRight />
          </span>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-7 gap-2">
        <span className="text-gray-400">Po</span>
        <span className="text-gray-400">Út</span>
        <span className="text-gray-400">St</span>
        <span className="text-gray-400">Čt</span>
        <span className="text-gray-400">Pá</span>
        <span className="text-gray-400">So</span>
        <span className="text-gray-400">Ne</span>
      </div>
      <div className="mt-1 grid grid-cols-7 gap-x-2 gap-y-2">{dayValues}</div>
    </>
  );
}
