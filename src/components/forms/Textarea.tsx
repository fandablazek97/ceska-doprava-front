import { useEffect, useState } from "react";

type Props = {
  as?: React.ElementType;
  id?: string;
  name: string;
  label: string;
  cols?: number;
  rows?: number;
  isDisabled?: boolean;
  isRequired?: boolean;
  className?: string;
  allDataObject: any;
  requiredArray?: any;
  oneOfMany?: boolean | string;
  position?: number;
  formState?: "waiting" | "verifying" | "refused" | "accepted";
  [x: string]: any;
};

export default function Textarea({
  as: Tag = "div",
  name = "textarea-name",
  label = "Textarea name",
  isDisabled = false,
  isRequired = false,
  className = "",
  cols = 30,
  rows = 8,
  allDataObject,
  requiredArray,
  oneOfMany = false,
  formState,
  ...rest
}: Props) {
  const [inValidation, setInValidation] = useState<
    undefined | "waiting" | "verifying" | "refused" | "accepted"
  >("waiting");

  useEffect(() => {
    if (oneOfMany === false) {
      if (allDataObject[name] === undefined) {
        allDataObject[name] = "";
      }
      if (isRequired && requiredArray !== undefined) {
        if (!requiredArray.includes(name)) {
          requiredArray?.push(name);
        }
      }
    } else if (typeof oneOfMany === "string") {
      if (allDataObject[oneOfMany] === undefined) {
        allDataObject[oneOfMany] = {};
      } else {
        if (allDataObject[oneOfMany][name] === undefined)
          allDataObject[oneOfMany][name] = "";
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
    setInValidation(formState);
  }, [formState]);

  return (
    <Tag className={`block w-full ${className}`}>
      <label className="cursor-pointer font-semibold text-black" htmlFor={name}>
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
          typeof oneOfMany === "string" &&
          allDataObject[oneOfMany][name] === "" && (
            <span className="ml-1 text-primary">Toto pole je povinné!</span>
          )}
      </label>
      <textarea
        id={name}
        name={name}
        cols={cols}
        rows={rows}
        className={`mt-3 h-auto w-full resize-y rounded-md border
      border-body-200 bg-body-200 px-4 py-3
      text-base font-normal text-gray-900 transition duration-150
      placeholder:opacity-60
      focus:border-primary focus:bg-white focus:!outline-none focus:ring-1 focus:ring-primary ${isDisabled
            ? "pointer-events-none cursor-not-allowed opacity-60"
            : "cursor-text opacity-100"
          }`}
        disabled={isDisabled}
        required={isRequired}
        onChange={(e: any) => {
          if (oneOfMany === false) {
            allDataObject[name] = e.target.value;
          } else if (typeof oneOfMany === "string") {
            allDataObject[oneOfMany][name] = e.target.value;
          }
        }}
        {...rest}
      />
    </Tag>
  );
}
