import Heading from "@components/bricks/Heading";
import DatePicker from "@components/forms/DatePicker";
import Input from "@components/forms/Input";

type Props = {
  formState: "waiting" | "verifying" | "refused" | "accepted";
  allDataObject: object;
  requiredArray: string[] | object[];
};

export default function Customer({
  formState,
  allDataObject,
  requiredArray,
}: Props) {
  return (
    <div className="mt-16">
      <Heading level={3} size={"base"} className="lg:!text-3xl">
        Fakturační údaje
      </Heading>
      <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2">
        <Input
          name="name"
          type="text"
          label="Jméno a příjmení"
          isRequired={true}
          requiredArray={requiredArray}
          allDataObject={allDataObject}
          formState={formState}
        />
        <DatePicker
          tabIndex={0}
          text=""
          name="birth"
          label="Datum narození"
          yearStart={1900}
          yearEnd={new Date().getFullYear()}
          yearOrder="desc"
          datePickerAlign="left"
          defaultTextAlign="left"
          datePickerValueAlign="left"
          allDataObject={allDataObject}
          formState={formState}
          isRequired={true}
          requiredArray={requiredArray}
        />
        <Input
          name="phone"
          type="text"
          label="Telefonní číslo"
          isRequired={true}
          requiredArray={requiredArray}
          allDataObject={allDataObject}
          formState={formState}
        />
        <Input
          name="email"
          type="email"
          label="E-mail"
          isRequired={true}
          requiredArray={requiredArray}
          allDataObject={allDataObject}
          formState={formState}
        />
      </div>
    </div>
  );
}
