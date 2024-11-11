import { useEffect, useState } from "react";

type Props = {
  type: string;
  name: string;
  label: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  isReadOnly?: boolean;
  className?: string;
  defaultValue?: string;
  allDataObject: any;
  requiredArray?: any;
  oneOfMany?: boolean | string;
  formState?: "waiting" | "verifying" | "refused" | "accepted";
  errorMessage?: string;
};

export default function Input({
  type,
  name,
  label,
  isDisabled = false,
  isRequired = false,
  isReadOnly = false,
  className,
  defaultValue = "__false",
  allDataObject,
  requiredArray,
  oneOfMany = false,
  formState,
  errorMessage
}: Props) {
  const [inValidation, setInValidation] = useState<
    undefined | "waiting" | "verifying" | "refused" | "accepted"
  >("waiting");

  useEffect(() => {
    if (oneOfMany === false) {
      if (allDataObject[name] === undefined) {
        if (defaultValue === "__false") {
          allDataObject[name] = "";
        } else {
          allDataObject[name] = defaultValue;
        }
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
    <div className={`w-full`}>
      <label className="cursor-pointer font-semibold text-black" htmlFor={name}>
        {label}
        {isRequired && <span className="ml-1 text-primary">*</span>}
        {inValidation === "refused" &&
          isRequired &&
          oneOfMany === false &&
          (allDataObject[name] === "" || errorMessage) && (
            <span className="ml-1 text-primary">{errorMessage ? errorMessage : "Toto pole je povinné!"}</span>
          )}
        {inValidation === "refused" &&
          isRequired &&
          typeof oneOfMany === "string" &&
          (allDataObject[oneOfMany][name] === "" || errorMessage) && (
            <span className="ml-1 text-primary">{errorMessage ? errorMessage : "Toto pole je povinné!"}</span>
          )}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className={`duration-default mt-3 h-auto w-full rounded-md
        border border-body-200 bg-body-200 px-4 py-2.5 
        text-base font-normal text-rich transition 
        placeholder:text-rich placeholder:opacity-60 ${className}
        focus:z-1 focus:relative focus:border-primary focus:bg-transparent
        focus:!outline-none focus:ring-2 focus:ring-primary ${isDisabled
            ? "pointer-events-none cursor-not-allowed opacity-60"
            : "cursor-text opacity-100"
          }`}
        pattern={type === "number" ? "\d*" : undefined}
        disabled={isDisabled}
        required={isRequired}
        readOnly={isReadOnly}
        defaultValue={defaultValue !== "__false" ? defaultValue : ""}
        onChange={(e: any) => {
          if (oneOfMany === false) {
            allDataObject[name] = e.target.value;
          } else if (typeof oneOfMany === "string") {
            allDataObject[oneOfMany][name] = e.target.value;
          }
        }}
      />
    </div>
  );
}
