import emailjs from "@emailjs/browser";
import jsPDF from "jspdf";
import { useState } from "react";

import Customer from "./Customer";
import Passengers from "./Passengers";
import Trip from "./Trip";

import Alert from "@components/bricks/Alert";
import Button from "@components/bricks/Button";
import Heading from "@components/bricks/Heading";
import Wrapper from "@components/bricks/Wrapper";
import Checkbox from "@components/forms/Checkbox";
import "public/fonts/DejaVuSans.js";
import { chorvatsko64 } from "public/images/pdfs/chorvatsko64";

type FormProps = {
  prices: Prices[];
  months: Months[];
  specialPrices: SpecialPrices[];
  departurePoints: departurePoints[];
};

interface Months {
  datumCr: [
    {
      datum: string;
    }
  ];
  datumHr: [
    {
      datum: string;
    }
  ];
}

interface Prices {
  oblast: string;
  zpatecni: string;
  jednosmerna: string;
}

interface SpecialPrices {
  cena: string;
  mesto: [
    {
      nazev: string;
    }
  ];
}

interface departurePoints {
  oblast: string;
  stat: string;
  mesto: [
    {
      nazev: string;
    }
  ];
}

export default function Form({
  prices,
  months,
  specialPrices,
  departurePoints,
}: FormProps) {
  let allDataObject: any = {};
  let requiredArray: any = [];

  return (
    <FormStater
      allDataObject={allDataObject}
      requiredArray={requiredArray}
      prices={prices}
      months={months}
      specialPrices={specialPrices}
      departurePoints={departurePoints}
    />
  );
}

type FormStaterProps = {
  allDataObject: object | any;
  requiredArray: string[] | object[];
  prices: Prices[];
  months: Months[];
  specialPrices: SpecialPrices[];
  departurePoints: any;
};

function FormStater({
  allDataObject,
  requiredArray,
  prices,
  months,
  specialPrices,
  departurePoints,
}: FormStaterProps) {
  const [formState, setFormState] = useState<
    "waiting" | "verifying" | "refused" | "accepted"
  >("waiting");
  const [passengers, setPassengers] = useState<number>(0);

  function verifying() {
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
        if (e[1].length !== 0) {
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
    doc.addImage(chorvatsko64, "JPEG", 0, 0, 210, 297);
    doc.setFontSize(10);

    /* Zájezd */

    doc.text("Česká Republika", 60, 65);
    doc.text("Chorvatsko - " + allDataObject.pointHr, 60, 70);
    doc.text(
      allDataObject.zpatecni === true ? "Zpáteční" : "Jednosměrná",
      60,
      75
    );
    doc.text(
      allDataObject.zpatecni === true
        ? "Od: " + allDataObject.dateCz + " / Do: " + allDataObject.dateHr
        : allDataObject.dateCz,
      60,
      80
    );
    doc.text(allDataObject.pointCz, 60, 85);

    /* Objednatel */
    doc.text(allDataObject.name, 42, 98);
    doc.text(allDataObject.birth, 160, 98);
    doc.text(allDataObject.phone, 28, 103);
    doc.text(allDataObject.email, 114, 103);

    /*Další cestující*/
    if (allDataObject.names !== undefined) {
      let fH: number = 115;
      for (let i = 1; i <= Object.values(allDataObject.names).length; i++) {
        doc.text(allDataObject.names["names" + i], 19, fH + 5 * i);
        doc.text(allDataObject.births["births" + i], 68, fH + 5 * i);
        doc.text(allDataObject.phones["phones" + i], 105, fH + 5 * i);
        doc.text(allDataObject.points["points" + i], 150, fH + 5 * i);
      }
    }

    doc.output("dataurlnewwindow");
    //sendEmail(doc.output('datauristring'))
    setFormState("accepted");
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

  return (
    <Wrapper size="sm" as="section" id="formular" paddedContent="base">
      <div className="mt-12">
        <Heading level={2} size={"lg"}>
          Objednávkový formulář
        </Heading>
        <p className="mt-10 max-w-sm text-gray-600">
          Pole označená hvězdičkou jsou nutné vyplnit. Veškeré informace
          týkající se zájezdu naleznete zde nad formulářem
        </p>
        <Customer
          allDataObject={allDataObject}
          requiredArray={requiredArray}
          formState={formState}
        />
        <Trip
          allDataObject={allDataObject}
          requiredArray={requiredArray}
          formState={formState}
          prices={prices}
          months={months}
          departurePoints={departurePoints}
        />
        <Passengers
          passengers={passengers}
          setPassengers={setPassengers}
          allDataObject={allDataObject}
          requiredArray={requiredArray}
          formState={formState}
          months={months}
          departurePoints={departurePoints}
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
        <Button
          className="my-8 w-fit"
          onClick={() => verifying()}
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
