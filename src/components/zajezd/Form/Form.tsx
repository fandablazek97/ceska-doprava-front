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
  name: string;
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
  name,
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
      name={name}
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
  allDeparturePoints: string[];
};

function FormStater({
  country,
  code,
  name,
  dateAndPrice,
  trasy,
  allDataObject,
  requiredArray,
  allDeparturePoints
}: FormStaterProps) {
  const [formState, setFormState] = useState<
    "waiting" | "verifying" | "refused" | "accepted"
  >("waiting");
  const [seats, setSeats] = useState(false);
  const [passengers, setPassengers] = useState<number>(1);
  const [price, setPrice] = useState<number>(0);
  const [cityPrice, setCityPrice] = useState<number>(0);
  const [calculatedPrice, setCalculatedPrice] = useState<number>(0);

  useEffect(() => {
    allDataObject.country = country;

    allDeparturePoints = trasy !== null &&
      trasy.map((e: any, i: number) => {
        e.attributes.mesta.map(
          (en: any) => {
            en.mesto.map((env: any) => {
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
    setCalculatedPrice((price + cityPrice) * passengers + (seats ? passengers * 200 : 0));
  }, [price, cityPrice, passengers, seats])

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
          mistenka: allDataObject.mistanka ? "Ano" : "Ne",
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
          nar8: allDataObject.births && allDataObject.births.births8 && allDataObject.births.births8
        },
        "user_2tNsUaIQSULo6wFXKZVCs"
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
          text="Děkujeme za vaši objednávku. Data zpracováváme a potvrdíme do 2 pracovních dnů."
        />
      )}
      {formState === "refused" && (
        <Alert
          status="error"
          title="Chyba!"
          text="Zapoměli jste vypnit některá pole"
          onClose={() => setFormState("waiting")}
        />
      )}
    </Wrapper>
  );
}
