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
import Select from "@components/forms/Select";
import Textarea from "@components/forms/Textarea";
import { returnIsEmail, returnIsPhoneNumber } from "@components/zajezd/Form/Form";
import { useRouter } from "next/router";
import "public/fonts/DejaVuSans.js";
import { chorvatsko64 } from "public/images/pdfs/chorvatsko64";
import { getFridaysAndSaturdays } from "src/utils";

type FormProps = {
  prices: Prices[];
  specialPrices: SpecialPrices[];
  departurePoints: departurePoints[];
  year: string;
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
  specialPrices,
  departurePoints,
  year,
}: FormProps) {
  let allDataObject: any = {};
  let requiredArray: any = [];
  const months: any = getFridaysAndSaturdays(year);

  return (
    <FormStater
      allDataObject={allDataObject}
      requiredArray={requiredArray}
      prices={prices}
      specialPrices={specialPrices}
      departurePoints={departurePoints}
      months={months}
    />
  );
}

type FormStaterProps = {
  allDataObject: object | any;
  requiredArray: string[] | object[];
  prices: Prices[];
  specialPrices: SpecialPrices[];
  departurePoints: any;
  months: Months[];
};

function FormStater({
  allDataObject,
  requiredArray,
  prices,
  specialPrices,
  departurePoints,
  months,
}: FormStaterProps) {
  const [formState, setFormState] = useState<
    "waiting" | "verifying" | "refused" | "accepted" | "refused-email"
  >("waiting");
  const [passengers, setPassengers] = useState<number>(1);
  const [seats, setSeats] = useState(false);

  const router = useRouter();

  function verifying() {
    setFormState("verifying");
    let tempState = "verifying";
    Object.entries(requiredArray).map((e) => {
      if (typeof e[1] === "string") {
        if (e[1] === "gdpr") {
          if (!allDataObject[e[1]]) {
            tempState = "refused";
          }
        }
        if ((e[1] === "phone")) {
          if (!allDataObject[e[1]] || !returnIsPhoneNumber(allDataObject[e[1]])) {
            tempState = "refused";
          }
        }
        else if (e[1] === "email") {
          if (!allDataObject[e[1]] || !returnIsEmail(allDataObject[e[1]])) {
            tempState = "refused";
          }
        }
        else if (e[1] === "mistoComment") {
          if (allDataObject["mistoSelect"].startsWith("Ano") && !allDataObject[e[1]])
            tempState = "refused";
        }
        else {
          if (e[1] in allDataObject && !allDataObject[e[1]]) {
            tempState = "refused";
          }
        }
      } else if (typeof e[1] === "object" && e[1] !== null) {
        if (Object.keys(e[1]).length !== 0) {
          if (e[0] in allDataObject) {
            Object.entries(allDataObject[e[0]]).map((elem: any) => {
              if (!elem[1]) {
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
        "service_5ijykst",
        "template_hjkuvbf",
        {
          name: allDataObject.name,
          phone: allDataObject.phone,
          narozeni: allDataObject.birth,
          email: allDataObject.email,
          komentar: allDataObject.comment,
          zpatecni: allDataObject.zpatecni ? "Ano" : "Ne",
          mistoCr: allDataObject.pointCz && allDataObject.pointCz,
          mistoChor: allDataObject.zpatecni && allDataObject.pointHr,
          datumCr: allDataObject.dateCz && allDataObject.dateCz,
          datumChor: allDataObject.dateHr && allDataObject.dateHr,
          mistenka: allDataObject.mistoSelect,
          mistenkaKomentar: allDataObject.mistoComment,
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
          mist1: allDataObject.points && allDataObject.points.points1 && allDataObject.points.points1,
          mist2: allDataObject.points && allDataObject.points.points2 && allDataObject.points.points2,
          mist3: allDataObject.points && allDataObject.points.points3 && allDataObject.points.points3,
          mist4: allDataObject.points && allDataObject.points.points4 && allDataObject.points.points4,
          mist5: allDataObject.points && allDataObject.points.points5 && allDataObject.points.points5,
          mist6: allDataObject.points && allDataObject.points.points6 && allDataObject.points.points6,
          mist7: allDataObject.points && allDataObject.points.points7 && allDataObject.points.points7,
          mist8: allDataObject.points && allDataObject.points.points8 && allDataObject.points.points8,
          tel1: allDataObject.phones && allDataObject.phones.phones1 && allDataObject.phones.phones1,
          tel2: allDataObject.phones && allDataObject.phones.phones2 && allDataObject.phones.phones2,
          tel3: allDataObject.phones && allDataObject.phones.phones3 && allDataObject.phones.phones3,
          tel4: allDataObject.phones && allDataObject.phones.phones4 && allDataObject.phones.phones4,
          tel5: allDataObject.phones && allDataObject.phones.phones5 && allDataObject.phones.phones5,
          tel6: allDataObject.phones && allDataObject.phones.phones6 && allDataObject.phones.phones6,
          tel7: allDataObject.phones && allDataObject.phones.phones7 && allDataObject.phones.phones7,
          tel8: allDataObject.phones && allDataObject.phones.phones8 && allDataObject.phones.phones8,
          cestujicich: passengers
        },
        "peXEQ-b1oFp3uAQvI"
      )
      .then(
        () => {
          return router.push("/chorvatsko-uspech");
        },
        () => {
          setFormState("refused-email");
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
          departurePoints={departurePoints}
          months={months}
        />
        <Passengers
          passengers={passengers}
          setPassengers={setPassengers}
          allDataObject={allDataObject}
          requiredArray={requiredArray}
          formState={formState}
          departurePoints={departurePoints}
          months={months}
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
            "Ano (vyberu si místa sám) + 300 Kč / os",
            "Ne (je mi jedno, kde budeme sedět) - zdarma"].map((word: string, key: number) => (
              <option value={key === 0 ? "" : word} key={key}>
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
      </div>
      <div>
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
        </div>
      </div>
      <Alert isDismissable={false} className="mt-5" status="warning" title="Upozornění" text="Pokud vyplňujete tento formulář a jste zároveň jedním z cestujících, musíte být uvedení v seznamu cestujících. Seznam cestujících musí být kompletní seznam osob včetně objednavatele." />


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
      {formState === "refused-email" && (
        <Alert
          status="error"
          title="Chyba!"
          text="Objednávku se nepodařilo odeslat, prosím zkuste znovu později."
        />
      )}
    </Wrapper>
  );
}
