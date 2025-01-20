import emailjs from "@emailjs/browser";
import jsPDF from "jspdf";
import { useEffect, useState } from "react";

import Customer from "./Customer";
import Passengers from "./Passengers";
import Trip from "./Trip";

import Alert from "@components/bricks/Alert";
import Button from "@components/bricks/Button";
import Heading from "@components/bricks/Heading";
import Wrapper from "@components/bricks/Wrapper";
import Checkbox from "@components/forms/Checkbox";
import Select from "@components/forms/Select";
import Textarea from "@components/forms/Textarea";
import { useRouter } from "next/router";
import "public/fonts/DejaVuSans.js";
import { zajezd64 } from "public/images/pdfs/zajezd64";

type FormProps = {
  country: string;
  code: string;
  name: string;
  dateAndPrice: [
    {
      datumOd: string;
      datumDo: string;
      cena: number;
    }
  ];
  trasy: any;
  full: boolean;
  cenaMistenky: number;
};

export default function Form({
  country,
  code,
  name,
  dateAndPrice,
  trasy,
  full,
  cenaMistenky
}: FormProps) {
  let allDataObject: any = {};
  let requiredArray: any = [];
  const allDeparturePoints: string[] = trasy?.reduce((acc: string[], e: any) => {
    e.attributes.mesta.forEach((en: any) => {
      en.mesto.forEach((env: any) => {
        if (!acc.includes(env.mesto)) acc.push(env.mesto);
      });
    });
    return acc;
  }, []) || [];


  return (
    <FormStater
      country={country}
      code={code}
      name={name}
      dateAndPrice={dateAndPrice}
      trasy={trasy}
      allDataObject={allDataObject}
      requiredArray={requiredArray}
      allDeparturePoints={allDeparturePoints}
      full={full}
      cenaMistenky={cenaMistenky}
    />
  );
}

type FormStaterProps = {
  country: string;
  code: string;
  name: string;
  dateAndPrice: [
    {
      datumOd: string;
      datumDo: string;
      cena: number;
    }
  ];
  trasy: any;
  allDataObject: any;
  requiredArray: any;
  allDeparturePoints: any;
  full: boolean;
  cenaMistenky: number;
};

function FormStater({
  country,
  code,
  name,
  dateAndPrice,
  trasy,
  allDataObject,
  requiredArray,
  allDeparturePoints,
  full,
  cenaMistenky
}: FormStaterProps) {
  const [formState, setFormState] = useState<
    "waiting" | "verifying" | "refused" | "accepted"
  >("waiting");
  const [seats, setSeats] = useState(false);
  const [passengers, setPassengers] = useState<number>(1);
  const [price, setPrice] = useState<number>(0);
  const [cityPrice, setCityPrice] = useState<number>(0);
  const [calculatedPrice, setCalculatedPrice] = useState<number>(0);

  const router = useRouter();

  useEffect(() => {
    allDataObject.country = country;

    if (price === undefined) {
      let tempPrice = 0;
      let tempDateFrom = "2025-12-12";
      dateAndPrice.map((entry) => {
        if (
          new Date(entry.datumOd).getTime() > new Date().getTime() &&
          new Date(entry.datumOd).getTime() < new Date(tempDateFrom).getTime()
        ) {
          tempPrice = entry.cena;
        }
      });
      setPrice(tempPrice);
    }
  }, []);

  useEffect(() => {
    setCalculatedPrice((price + cityPrice) * passengers + (seats ? passengers * cenaMistenky : 0));
  }, [price, cityPrice, passengers, seats]);



  function verifying(e: any) {
    setFormState("verifying");
    let tempState = "verifying";
    Object.entries(requiredArray).map((e) => {
      if (typeof e[1] === "string") {
        if (e[1] === "gdpr") {
          if (allDataObject[e[1]] === false || allDataObject[e[1]] === "") {
            tempState = "refused";
          }
        }
        if ((e[1] === "phone")) {
          if (allDataObject[e[1]] === "" || !returnIsPhoneNumber(allDataObject[e[1]])) {
            tempState = "refused";
          }
        }
        else {
          if (e[1] in allDataObject && allDataObject[e[1]] === "") {
            tempState = "refused";
          }
        }
      } else if (typeof e[1] === "object" && e[1] !== null) {
        if (Object.keys(e[1]).length !== 0) {
          if (e[0] in allDataObject) {
            Object.entries(allDataObject[e[0]]).map((elem: any) => {
              if (elem[1] === "") {
                tempState = "refused";
              }
            });
          }
        }
      }
    });
    if (tempState === "refused") {
      setFormState("refused");
    } else {
      sendEmail(null);
    }
  }

  function createPdf() {
    const doc = new jsPDF("p", "mm", "a4");
    doc.setFont("DejaVuSans", "normal");
    doc.addImage(zajezd64, "JPEG", 0, 0, 210, 297);
    doc.setFontSize(10);

    /* Zájezd */
    doc.text(allDataObject.code + " " + name, 60, 74);
    doc.text(allDataObject.country, 60, 79);
    doc.text(allDataObject.date, 60, 84);
    doc.text(allDataObject.departurePoint, 60, 94);

    /* Objednatel */
    doc.text(allDataObject.name, 42, 107);
    doc.text(allDataObject.phone, 28, 112);
    doc.text(allDataObject.email, 117, 112);

    doc.text(allDataObject.name, 18, 129);
    doc.text(allDataObject.birth, 73, 129);


    /*Další cestující*/
    if (allDataObject.names !== undefined) {
      let fH: number = 129;
      for (let i = 1; i <= Object.values(allDataObject.names).length; i++) {
        doc.text(allDataObject.names["names" + i], 18, fH + 5 * i);
        doc.text(allDataObject.births["births" + i], 73, fH + 5 * i);
      }
    }


    /* Ceny a podobné */
    doc.text((passengers + 1).toString(), 45, 182);
    doc.text(price.toString() + ",-", 77, 182);
    doc.text((price * (passengers + 1)).toString() + ",-", 173, 182);

    doc.text((passengers + 1).toString(), 45, 187);
    doc.text(cityPrice.toString() + ",-", 77, 187);
    doc.text((cityPrice * (passengers + 1)).toString() + ",-", 173, 187);


    doc.text(((cityPrice + price) * (passengers + 1)).toString() + ",-", 45, 202);



    doc.output("dataurlnewwindow");
    setFormState("accepted");
    //sendEmail(doc.output('datauristring'))
  }

  // Create function to convert price to number with spaces every thousand
  function numberWithSpaces(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  function sendEmail(doc: any) {
    emailjs
      .send(
        "service_5ijykst",
        "template_fy1kysa",
        {
          name: allDataObject.name,
          narozeni: allDataObject.birth,
          phone: allDataObject.phone,
          email: allDataObject.email,
          mistenka: allDataObject.mistoSelect,
          mistenkaKomentar: allDataObject.mistoComment,
          kod: allDataObject.code,
          termin: allDataObject.date,
          misto: allDataObject.departurePoint,
          komentar: allDataObject.comment,
          jm1: allDataObject.names && allDataObject.names.names1 && allDataObject.names.names1,
          jm2: allDataObject.names && allDataObject.names.names2 && allDataObject.names.names2,
          jm3: allDataObject.names && allDataObject.names.names3 && allDataObject.names.names3,
          jm4: allDataObject.names && allDataObject.names.names4 && allDataObject.names.names4,
          jm5: allDataObject.names && allDataObject.names.names5 && allDataObject.names.names5,
          jm6: allDataObject.names && allDataObject.names.names6 && allDataObject.names.names6,
          jm7: allDataObject.names && allDataObject.names.names7 && allDataObject.names.names7,
          jm8: allDataObject.names && allDataObject.names.names8 && allDataObject.names.names8,
          nar1: allDataObject.births && allDataObject.births.births1 && allDataObject.births.births1,
          nar2: allDataObject.births && allDataObject.births.births2 && allDataObject.births.births2,
          nar3: allDataObject.births && allDataObject.births.births3 && allDataObject.births.births3,
          nar4: allDataObject.births && allDataObject.births.births4 && allDataObject.births.births4,
          nar5: allDataObject.births && allDataObject.births.births5 && allDataObject.births.births5,
          nar6: allDataObject.births && allDataObject.births.births6 && allDataObject.births.births6,
          nar7: allDataObject.births && allDataObject.births.births7 && allDataObject.births.births7,
          nar8: allDataObject.births && allDataObject.births.births8 && allDataObject.births.births8,
          cestujicich: passengers,
        },
        "peXEQ-b1oFp3uAQvI"
      )
      .then(
        () => {
          return router.push("/zajezd-uspech");
        },
        () => {
          setFormState("refused");
        }
      );
  }

  function setPriceByCity(city: string) {
    trasy.map((e: any) => (
      e.attributes.mesta.map((en: any) => (
        en.mesto.map((env: any) => {
          if (env.mesto === city) {
            setCityPrice(en.cena);
          }
        })
      ))
    ))
  }


  return (
    <Wrapper size="base" as={"section"} className="mb-16">
      {full ? <div className="mt-12"><Heading level={2} size={"lg"}>
        Zájezd plně obsazen
      </Heading>
        <p className="mt-10 max-w-xl text-gray-600">
          Děkujeme za váš zájem! Tento zájezd je bohužel <strong>již plně obsazen.</strong>
          <br />
          <br />
          Prosím, vraťte se na <button className="underline" onClick={() => router.back()}>předchozí stránku</button> a podívejte se na naše další skvělé nabídky.
          <br />
          <br />
          V případě, že máte zájem o umístění na seznam náhradníků, napište <strong>nám na email: <a href="mailto:cestovka.ceskadoprava@email.cz" className="underline">cestovka.ceskadoprava@email.cz</a>.</strong>
          Pokud se místa uvolní - budeme vás kontaktovat.
        </p></div> :
        <>
          <div className="mt-12">
            <Heading level={2} size={"lg"}>
              Objednávkový formulář
            </Heading>
            <p className="mt-10 max-w-prose text-gray-600">
              Pole označená hvězdičkou jsou nutné vyplnit. Veškeré informace
              týkající se zájezdu naleznete zde nad formulářem
            </p>
            <Customer
              passengers={passengers}
              setPassengers={setPassengers}
              allDataObject={allDataObject}
              requiredArray={requiredArray}
              formState={formState}
            />
            <Trip
              setPrice={setPrice}
              setPriceByCity={setPriceByCity}
              code={code}
              dateAndPrice={dateAndPrice}
              departurePoints={allDeparturePoints}
              allDataObject={allDataObject}
              requiredArray={requiredArray}
              formState={formState}
              cityPrice={cityPrice}
              seats={seats}
              setSeats={setSeats}
            />
            <Passengers
              passengers={passengers}
              setPassengers={setPassengers}
              allDataObject={allDataObject}
              requiredArray={requiredArray}
              formState={formState}
            />
            <Select
              name="mistoSelect"
              label="Chcete objednat místenky?"
              isRequired={true}
              requiredArray={requiredArray}
              allDataObject={allDataObject}
              formState={formState}
              setFunction={(value: any) => {
                if (value === 1) {
                  setSeats(true);
                } else {
                  setSeats(false);
                  allDataObject.mistoComment = "";
                }
              }}
              className="mt-14"
              rare="returnIndex"
              emptyValue="Vyberte možnost"
            >

              {["Vyberte možnost",
                `Ano (vyberu si místa sám) + ${cenaMistenky} Kč / os`,
                "Ne (je mi jedno, kde budeme sedět) - zdarma"].map((word: string, key: number) => (
                  <option value={word} key={key}>
                    {word}
                  </option>
                ))}
            </Select>
            <Textarea
              className="mt-5 mb-14"
              name="mistoComment"
              label="Specifikujte místa k sezení"
              requiredArray={requiredArray}
              allDataObject={allDataObject}
              rows={2}
              isDisabled={!seats}
              isRequired={seats}
              key={"ref" + seats}
              defaultValue={allDataObject.mistoComment}
              formState={formState}
              placeholder="Např. 3. řada sedadel na pravé straně (bráno po směru jízdy autobusu)"
            />


            <Textarea
              className="mt-5"
              name="comment"
              label="Vaše poznámka"
              allDataObject={allDataObject}
              formState={formState}
            />
            <Heading level={3} size={"base"} className="lg:!text-3xl mt-10">
              Shrnutí objednávky
            </Heading>
            <div className="flex flex-col mt-5">
              <div className="flex flex-row gap-x-3 items-end">
                <span className="font-semibold text-rich pb-0.5">Celkový počet cestujících:</span>
                <span className="text-xl font-bold text-rich">
                  {passengers}
                </span>
              </div>
              <div className="flex flex-row gap-x-3 items-end">
                <span className="font-semibold text-rich pb-0.5">Celková cena:</span>
                <span className="text-xl font-bold text-rich">
                  {numberWithSpaces(calculatedPrice)}
                  {" Kč"}
                </span>
              </div>
            </div>
          </div>
          <Alert isDismissable={false} className="mt-5" status="warning" title="Upozornění" text="Pokud vyplňujete tento formulář a jste zároveň jedním z cestujících, musíte být uvedení v seznamu cestujících. Seznam cestujících musí být kompletní seznam osob včetně objednavatele." />

          <div className="mt-8 flex flex-col">
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
            <Button
              className="my-8 w-fit"
              onClick={(e: any) => verifying(e)}
              isLoading={formState === "verifying"}
              isDisabled={formState !== "waiting"}
            >
              Odeslat objednávku
            </Button>
          </div>
          {formState === "refused" && (
            <Alert
              status="error"
              title="Chyba!"
              text="Zapoměli jste vypnit některá pole"
              onClose={() => setFormState("waiting")}
            />
          )}
        </>
      }
    </Wrapper>
  );
}

export function returnIsPhoneNumber(value: string) {
  const regex = /^(\+?420\s?)?(\d{3}[\s-]?\d{3}[\s-]?\d{3}|\d{9})$/;
  return regex.test(value);
}