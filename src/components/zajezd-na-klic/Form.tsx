import { useState } from "react";

import Alert from "@components/bricks/Alert";
import Button from "@components/bricks/Button";
import Heading from "@components/bricks/Heading";
import Wrapper from "@components/bricks/Wrapper";
import Checkbox from "@components/forms/Checkbox";
import Input from "@components/forms/Input";
import Textarea from "@components/forms/Textarea";
import { useRouter } from "next/router";

export default function Form() {
    let allDataObject: any = {};
    let requiredArray: any = [];

    return (
        <FormStater allDataObject={allDataObject} requiredArray={requiredArray} />
    );
}

type FormStaterProps = {
    allDataObject: any;
    requiredArray: any;
};

function FormStater({ allDataObject, requiredArray }: FormStaterProps) {
    const [formState, setFormState] = useState<
        "waiting" | "verifying" | "refused" | "accepted" | "refused-email"
    >("waiting");
    const router = useRouter();

    function verifying(e: any) {
        e.preventDefault();

        setFormState("verifying");
        setTimeout(() => {
            let tempState = "verifying";
            Object.entries(requiredArray).map((e) => {
                if (typeof e[1] === "string") {
                    if (!(e[1] === "gdpr")) {
                        if (e[1] in allDataObject && allDataObject[e[1]] === "") {
                            tempState = "refused";
                            setFormState("refused");
                        }
                    } else {
                        if (allDataObject[e[1]] === false || allDataObject[e[1]] === "") {
                            tempState = "refused";
                            setFormState("refused");
                        }
                    }
                } else if (typeof e[1] === "object" && e[1] !== null) {
                    if (Object.keys(e[1]).length !== 0) {
                        if (e[0] in allDataObject) {
                            Object.entries(allDataObject[e[0]]).map((elem: any) => {
                                if (elem[1] === "") {
                                    tempState = "refused";
                                    setFormState("refused");
                                }
                            });
                        }
                    }
                }
            });
            if (tempState === "refused") {
                setFormState("refused");
            } else {
                sendMail();
            }
        }, 150);
    }

    function sendMail() {
        allDataObject.termin = new Date(allDataObject.termin).toLocaleDateString('cs-CZ');
        console.log(allDataObject);
    }

    return (
        <Wrapper size="sm" as={"section"} className="mt-16">
            <form>
                <Heading level={2} size={"base"}>
                    Máte zájem o zájezd?
                </Heading>
                <div className="mt-12 flex flex-col gap-10">
                    <Input
                        allDataObject={allDataObject}
                        requiredArray={requiredArray}
                        label="Jméno a příjmení"
                        name="name"
                        type="text"
                        isRequired
                    />
                    <div className="grid gap-10 md:grid-cols-2">
                        <Input
                            allDataObject={allDataObject}
                            requiredArray={requiredArray}
                            label="Telefon"
                            name="phone"
                            type="tel"
                            isRequired
                        />
                        <Input
                            allDataObject={allDataObject}
                            requiredArray={requiredArray}
                            isRequired={true}
                            label="Email"
                            name="email"
                            type="email"
                            formState={formState}
                        />
                    </div>
                    <div className="grid gap-10 md:grid-cols-2">
                        <Input
                            allDataObject={allDataObject}
                            requiredArray={requiredArray}
                            label="Velikost skupiny"
                            name="velikostSkupiny"
                            type="number"
                            isRequired
                        />
                        <Input
                            allDataObject={allDataObject}
                            requiredArray={requiredArray}
                            isRequired={true}
                            label="Termín"
                            name="termin"
                            type="date"
                            formState={formState}
                        />
                    </div>
                    <div className="grid gap-10 md:grid-cols-2">
                        <Input
                            allDataObject={allDataObject}
                            requiredArray={requiredArray}
                            label="Čas odjezdu"
                            name="casOdjezdu"
                            type="time"
                            isRequired
                        />
                        <Input
                            allDataObject={allDataObject}
                            requiredArray={requiredArray}
                            isRequired={true}
                            label="Čas návratu"
                            name="casNavratu"
                            type="time"
                            formState={formState}
                        />
                    </div>
                    <Textarea
                        id="question"
                        label="Požadavky (např. destinace, lokace, místo, tématické zaměření)"
                        name="question"
                        rows={8}
                        allDataObject={allDataObject}
                        isRequired={true}
                        requiredArray={requiredArray}
                        formState={formState}
                    />
                </div>

                <div className="mt-16 flex flex-col">
                    <Checkbox
                        allDataObject={allDataObject}
                        requiredArray={requiredArray}
                        isRequired={true}
                        label={
                            <>
                                Souhlasím se{" "}
                                <span className="text-primary">zpracováním osobních údajů</span>
                            </>
                        }
                        name="gdpr"
                        formState={formState}
                    />
                    <Button className="my-8 w-fit" isLoading={formState === "verifying" ? true : false} onClick={(e: any) => verifying(e)}>
                        Odeslat
                    </Button>
                </div>
            </form>
            {formState === "refused" && (
                <Alert
                    status="error"
                    title="Chyba!"
                    text="Zapoměli jste vypnit některá pole"
                />
            )}
        </Wrapper>
    );
}
