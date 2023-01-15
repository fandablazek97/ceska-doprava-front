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
import "public/fonts/DejaVuSans.js";
import { zajezd64 } from "public/images/pdfs/zajezd64";

type FormProps = {
  country: string;
  code: string;
  dateAndPrice: [
    {
      datumOd: string;
      datumDo: string;
      cena: number;
    }
  ];
  trasy: any;
};

export default function Form({
  country,
  code,
  dateAndPrice,
  trasy,
}: FormProps) {
  let allDataObject: any = {};
  let requiredArray: any = [];
  let allDeparturePoints: string[] = [];

  return (
    <FormStater
      country={country}
      code={code}
      dateAndPrice={dateAndPrice}
      trasy={trasy}
      allDataObject={allDataObject}
      requiredArray={requiredArray}
      allDeparturePoints={allDeparturePoints}
    />
  );
}

type FormStaterProps = {
  country: string;
  code: string;
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
  allDeparturePoints: string[];
};

function FormStater({
  country,
  code,
  dateAndPrice,
  trasy,
  allDataObject,
  requiredArray,
  allDeparturePoints
}: FormStaterProps) {
  const [formState, setFormState] = useState<
    "waiting" | "verifying" | "refused" | "accepted"
  >("waiting");
  const [passengers, setPassengers] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [cityPrice, setCityPrice] = useState<number>(0);
  const [calculatedPrice, setCalculatedPrice] = useState<number>(0);

  useEffect(() => {
    allDataObject.country = country;

    allDeparturePoints = trasy !== null &&
    trasy.map((e: any, i: number) => {
      e.attributes.mesta.map(
        (en: any) => {
        en.mesto.map((env:any) => {
          !allDeparturePoints.includes(env.mesto) &&
          allDeparturePoints.push(env.mesto)
          })
        });
    });

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
    setCalculatedPrice((price + cityPrice) * (1 + passengers));
  },[price, cityPrice, passengers])

  function verifying(e: any) {
    setFormState("verifying");
    let tempState = "verifying";
    Object.entries(requiredArray).map((e) => {
      if (typeof e[1] === "string") {
        if (!(e[1] === "gdpr")) {
          if (e[1] in allDataObject && allDataObject[e[1]] === "") {
            tempState = "refused";
          }
        } else {
          if (allDataObject[e[1]] === false || allDataObject[e[1]] === "") {
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
      createPdf();
    }
  }

  function createPdf() {
    const doc = new jsPDF("p", "mm", "a4");
    doc.setFont("DejaVuSans", "normal");
    doc.addImage(zajezd64, "JPEG", 0, 0, 210, 297);
    doc.setFontSize(10);

    /* Zájezd */
    doc.text(allDataObject.code, 60, 74);
    doc.text(allDataObject.country, 60, 79);
    doc.text(allDataObject.date, 60, 84);
    doc.text(allDataObject.departurePoint, 60, 94);

    /* Objednatel */
    doc.text(allDataObject.name, 42, 107);
    doc.text(allDataObject.birth, 163, 107);
    doc.text(allDataObject.phone, 28, 112);
    doc.text(allDataObject.email, 117, 112);

    /*Další cestující*/
    if (allDataObject.names !== undefined) {
      let fH: number = 124;
      for (let i = 1; i <= Object.values(allDataObject.names).length; i++) {
        doc.text(allDataObject.names["names" + i], 18, fH + 5 * i);
        doc.text(allDataObject.births["births" + i], 73, fH + 5 * i);
      }
    }

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
        process.env.SERVICE_ID!,
        "template_fy1kysa",
        {
          name: allDataObject.name,
          phone: allDataObject.phone,
          email: allDataObject.email,
          createdPdf: doc,
        },
        process.env.PUBLIC_KEY!
      )
      .then(
        () => {
          setFormState("accepted");
        },
        () => {
          setFormState("refused");
        }
      );
  }

  function setPriceByCity(city: string){
    trasy.map((e: any) => (
     e.attributes.mesta.map((en:any) => (
        en.mesto.map((env:any) => {
          if(env.mesto === city){
            setCityPrice(en.cena);
          }
        })
      ))
    ))
  }


  return (
    <Wrapper size="base" as={"section"} className="mb-16">
      <div className="mt-12">
        <Heading level={2} size={"lg"}>
          Objednávkový formulář
        </Heading>
        <p className="mt-10 max-w-prose text-gray-600">
          Pole označená hvězdičkou jsou nutné vyplnit. Veškeré informace
          týkající se zájezdu naleznete zde nad formulářem
        </p>
        <Customer
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
        />
        <Passengers
          passengers={passengers}
          setPassengers={setPassengers}
          allDataObject={allDataObject}
          requiredArray={requiredArray}
          formState={formState}
        />
        <div className="mt-10 flex flex-col">
          <span className="text-lg font-semibold text-rich">Celková cena:</span>
          <span className="text-3xl font-bold text-rich">
            {numberWithSpaces(calculatedPrice)}
            {" Kč"}
          </span>
        </div>
      </div>

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
          isLoading={formState === "verifying" ? true : false}
        >
          Odeslat objednávku
        </Button>
      </div>
      {formState === "accepted" && (
        <Alert
          status="success"
          title="Úspěch!"
          text="Vaši objednávku zpracováváme a potvrdíme ji do 48hodin"
        />
      )}
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
