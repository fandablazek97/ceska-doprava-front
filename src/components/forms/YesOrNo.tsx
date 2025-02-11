import { useEffect, useState } from "react";

type Props = {
    name: string;
    label: string | React.ReactNode;
    passengers?: number;
    setPassengers?: any;
    isDisabled?: boolean;
    isRequired?: boolean;
    isReadOnly?: boolean;
    className?: string;
    defaultValue?: boolean | "";
    allDataObject: object | any;
    requiredArray?: string[] | object[] | any;
    oneOfMany?: boolean | string;
    position?: number;
    formState?: "waiting" | "verifying" | "refused" | "accepted" | "refused-email"
    otherState?: any;
};

export default function YesOrNo({
    name,
    label,
    passengers,
    setPassengers,
    isRequired = false,
    defaultValue = "",
    allDataObject,
    requiredArray,
    oneOfMany = false,
    formState,
    otherState = undefined,
}: Props) {
    const [inValidation, setInValidation] = useState<
        undefined | "waiting" | "verifying" | "refused" | "accepted" | "refused-email"
    >("waiting");
    const [checkState, setCheckState] = useState<boolean | string>(defaultValue);

    useEffect(() => {
        if (oneOfMany === false) {
            if (allDataObject[name] === undefined) {
                allDataObject[name] = defaultValue;
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
                    allDataObject[oneOfMany][name] = defaultValue;
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
    });

    useEffect(() => {
        setInValidation(formState);
    }, [formState]);

    function setForm(value: boolean) {
        if (value === checkState) return;
        if (passengers !== undefined && setPassengers) {
            if (value) setPassengers(passengers + 1);
            else if (!value && checkState) setPassengers(passengers - 1);
        }
        setCheckState(value);
        if (oneOfMany === false) {
            if (otherState !== undefined) {
                otherState(value);
            }
            allDataObject[name] = value;
        } else if (typeof oneOfMany === "string") {
            if (otherState !== undefined) {
                otherState(value);
            }
            allDataObject[oneOfMany][name] = value;
        }
    }

    return (
        <div className={`flex w-full mt-10`}>
            <div className="flex flex-row">
                <button className={`${checkState === true && "text-primary underline underline-offset-1"}`} onClick={() => setForm(true)}>Ano</button>
                <span className="mx-2">/</span>
                <button className={`${checkState === false && "text-primary underline underline-offset-1"}`} onClick={() => setForm(false)}>Ne</button>
            </div>
            <button className="cursor-pointer ml-2 font-semibold" onClick={() => setForm(!checkState)}>
                <span className="text-black">
                    {label}
                </span>
                {isRequired && <span className="text-primary">*</span>}
                {inValidation === "refused" &&
                    isRequired &&
                    oneOfMany === false &&
                    (allDataObject[name] === "") && (
                        <span className="ml-1 text-primary">Toto pole je povinné!</span>
                    )}
                {inValidation === "refused" &&
                    isRequired &&
                    typeof oneOfMany === "string" &&
                    (allDataObject[oneOfMany][name] === "") && (
                        <span className="ml-1 text-primary">Toto pole je povinné!</span>
                    )}
            </button>
        </div>
    );
}
