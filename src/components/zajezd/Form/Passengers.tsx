import Button from "@components/bricks/Button";
import Heading from "@components/bricks/Heading";
import DatePicker from "@components/forms/DatePicker";
import Input from "@components/forms/Input";
import { useEffect, useState } from "react";
import { HiTrash, HiUserAdd } from "react-icons/hi";

type Props = {
  formState: "waiting" | "verifying" | "refused" | "accepted";
  passengers: number;
  setPassengers: any;
  allDataObject: any;
  requiredArray: any;
};

export default function Passengers({
  formState,
  passengers,
  setPassengers,
  allDataObject,
  requiredArray,
}: Props) {
  const [restate, setRestate] = useState<
    "waiting" | "verifying" | "refused" | "accepted"
  >("waiting");
  var allOthers = [];

  useEffect(() => {
    setRestate(formState);
  }, [formState]);

  for (var i = 1; i <= passengers; i++) {
    allOthers.push(
      <AddOthers
        formState={formState}
        id={i}
        key={i}
        allDataObject={allDataObject}
        requiredArray={requiredArray}
      />
    );
  }

  return (
    <div className="mt-16 flex flex-col">
      <Heading level={3} size={"base"} className="lg:!text-3xl">
        Seznam všech cestujících
      </Heading>
      {allOthers}
      <div className="mt-10 flex flex-row flex-wrap gap-3">
        {allOthers.length < 8 && (
          <Button
            onClick={() => setPassengers(passengers + 1)}
            color="dark"
            variant="tinted"
            rightIcon={<HiUserAdd />}
            className="w-full sm:w-auto"
          >
            Přidat cestujícího
          </Button>
        )}
        {allOthers.length >= 2 && (
          <Button
            onClick={() => {
              delete allDataObject.names["names" + passengers];
              requiredArray.names.pop();
              delete allDataObject.births["births" + passengers];
              requiredArray.births.pop();
              setPassengers(passengers - 1);
            }}
            color="error"
            variant="tinted"
            rightIcon={<HiTrash />}
            className="w-full sm:w-auto"
          >
            Odebrat cestujícího
          </Button>
        )}
      </div>
    </div>
  );
}

type AddOthersProps = {
  formState: "waiting" | "verifying" | "refused" | "accepted";
  id: number;
  allDataObject: any;
  requiredArray: any;
};

function AddOthers({
  formState,
  id,
  allDataObject,
  requiredArray,
}: AddOthersProps) {
  return (
    <div className="border-b-1 mt-8 grid grid-cols-1 gap-10 border-gray-200 md:grid-cols-2">
      <Input
        className="mt-3 border-none bg-gray-100"
        name={`names${id}`}
        type="text"
        label="Jméno a příjmení"
        isRequired={true}
        requiredArray={requiredArray}
        allDataObject={allDataObject}
        oneOfMany="names"
        formState={formState}
      />
      <DatePicker
        tabIndex={0}
        text=""
        name={`births${id}`}
        yearStart={1900}
        yearEnd={new Date().getFullYear()}
        yearOrder="desc"
        label="Datum narození"
        oneOfMany={"births"}
        datePickerAlign="left"
        defaultTextAlign="left"
        datePickerValueAlign="left"
        allDataObject={allDataObject}
        formState={formState}
        isRequired={true}
        requiredArray={requiredArray}
      />
    </div>
  );
}
