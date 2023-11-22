import Heading from "@components/bricks/Heading";
import ComboSelect from "@components/forms/ComboSelect";
import Input from "@components/forms/Input";
import Select from "@components/forms/Select";
import Textarea from "@components/forms/Textarea";
import { useEffect } from "react";

type Props = {
  formState: "waiting" | "verifying" | "refused" | "accepted";
  setPrice: any;
  code: string;
  dateAndPrice: {
    datumOd: string;
    datumDo: string;
    cena: number;
  }[];
  departurePoints: string[];
  allDataObject: any;
  requiredArray: any;
  setPriceByCity: any;
  cityPrice: any;
};

export default function Trip({
  formState,
  setPrice,
  code,
  dateAndPrice,
  departurePoints,
  allDataObject,
  requiredArray,
  setPriceByCity,
  cityPrice
}: Props) {
  useEffect(() => {
    if (allDataObject.price === undefined) {
      allDataObject.price === "0";
    }
    if (allDataObject.date === undefined) {
      for (let e of dateAndPrice) {
        if (e.datumOd > new Date().toISOString().slice(0, 10)) {
          allDataObject.date =
            changeDateType(e.datumOd) + " - " + changeDateType(e.datumDo);
          allDataObject.price = e.cena;
          setPrice(e.cena);
          break;
        }
      }
    }
  }, []);

  function changeDateType(date: string) {
    var newDate =
      date.split("-")[2] + "." + date.split("-")[1] + "." + date.split("-")[0];
    return newDate;
  }

  return (
    <div className="mt-16">
      <Heading level={3} size={"base"} className="lg:!text-3xl">
        Zájezd
      </Heading>
      <div className="mt-10 mb-7 grid grid-cols-1 gap-10 md:grid-cols-2">
        <Input
          className="mt-3 cursor-not-allowed border-none bg-gray-100"
          name="code"
          type="text"
          label="Číslo zájezdu "
          isReadOnly={true}
          defaultValue={code}
          isRequired={true}
          requiredArray={requiredArray}
          allDataObject={allDataObject}
        />
        <Select
          name="date"
          label="Termín"
          isRequired={true}
          requiredArray={requiredArray}
          allDataObject={allDataObject}
          formState={formState}
          setFunction={setPrice}
          rare="dateAndPrice"
        >
          {dateAndPrice.map(
            (entry: any, key: number) =>
              entry.datumOd > new Date().toISOString().slice(0, 10) && (
                <option
                  key={key}
                  value={
                    entry.datumDo
                      ? `{"date" : "${changeDateType(
                        entry.datumOd
                      )} - ${changeDateType(entry.datumDo)}", "price" : "${entry.cena
                      }"}`
                      : `{"date" : "${changeDateType(
                        entry.datumOd
                      )}", "price" : "${entry.cena}"}`
                  }
                >
                  {entry.datumDo
                    ? changeDateType(entry.datumOd) +
                    " - " +
                    changeDateType(entry.datumDo)
                    : changeDateType(entry.datumOd)}
                </option>
              )
          )}
        </Select>
      </div>
      <ComboSelect
        name="departurePoint"
        label="Preferované nástupní / výstupní místo"
        isRequired={true}
        requiredArray={requiredArray}
        allDataObject={allDataObject}
        formState={formState}
        values={departurePoints}
        specialFunction={setPriceByCity}

      />
      {cityPrice !== 0 &&
        <p className="mt-3 text-warning">
          Vybrané místo je za příplatek: {cityPrice} Kč
        </p>
      }
      <Textarea
        className="mt-10"
        name="comment"
        label="Vaše poznámka"
        allDataObject={allDataObject}
      />
    </div>
  );
}
