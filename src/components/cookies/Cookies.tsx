"use client";

import Button from "@components/bricks/Button";
import Checkbox from "@components/forms/Checkbox";
import { CookiePreferences, useCookieConsent } from "./CookieConsent";

// Object to store information about each cookie category

export type CookieData = {
  name: string;
  owner: string;
  category: keyof CookiePreferences;
  expiry: string;
};

type Props = {
  cookies: CookieData[];
};

const cookieCategories = ["analytics", "marketing", "functional", "necessary"] as const;

const cookiesDescriptions = {
  "analytics": {
    "label": "Analytika",
    "description": "Analytické cookies nám pomáhají měřit výkon webu a porozumět chování uživatelů, aby se zlepšil váš zážitek."
  },
  "marketing": {
    "label": "Marketing",
    "description": "Marketingové cookies sledují vaši aktivitu, aby nám pomohly poskytovat personalizované reklamy a hodnotit účinnost kampaní."
  },
  "functional": {
    "label": "Funkční",
    "description": "Funkční cookies umožňují další funkce, jako je živý chat nebo uložení vašich preferencí, pro vylepšení vašeho zážitku."
  },
  "necessary": {
    "label": "Nezbytné",
    "description": "Nezbytné cookies jsou klíčové pro základní funkčnost webu, jako je zabezpečení a správa relací."
  }
};

function Cookies({ cookies }: Props) {

  return (
    <>
      <CookiesInfo />
      <div className="mb-4">
        <p>Používáme cookies ke zlepšení vašeho zážitku. Níže můžete vidět informace o cookies používaných na našem webu.</p>
      </div>
      {/* Table of cookies */}
      <table className="w-full table-auto text-left">
        <thead>
          <tr>
            <th className="py-2 pr-6">Název cookie</th>
            <th className="py-2 pr-6">Vlastník</th>
            <th className="py-2 pr-6">Kategorie</th>
            <th className="py-2 pr-6">Datum vypršení</th>
          </tr>
        </thead>
        <tbody>
          {cookieCategories.map((category) =>
            cookies
              .filter((cookie) => cookie.category === category)
              .map((cookie, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{cookie.name}</td>
                  <td className="border px-4 py-2">{cookie.owner}</td>
                  <td className="border px-4 py-2">{cookiesDescriptions[category].label}</td>
                  <td className="border px-4 py-2">{cookie.expiry}</td>
                </tr>
              ))
          )}
        </tbody>
      </table>
      <CookieSettings />
    </>
  );
}

function CookiesInfo() {
  return (
    <div className="text-formatter">
      {cookieCategories.map((category) => (
        <div key={category}>
          <h2>{cookiesDescriptions[category].label}</h2>
          <p>{cookiesDescriptions[category].description}</p>
        </div>
      ))}
    </div>
  );
}

function CookieSettings() {
  const { preferences, setPreferences, onCookieSubmit } = useCookieConsent();

  const handleCheckboxChange = (id: keyof CookiePreferences, isSelected: boolean) => {
    setPreferences({
      ...preferences,
      [id]: isSelected,
    });
  };
  return (
    <>
      <form className="flex gap-6 py-6">
        <Checkbox checked isDisabled label={"Nezbytné"} name="necessary" />
        <Checkbox
          name="analytics"
          checked={preferences.analytics}
          onChange={(isSelected: boolean) =>
            handleCheckboxChange && handleCheckboxChange("analytics", isSelected)
          }
          label="Analytika"
        />
        <Checkbox
          name="marketing"
          checked={preferences.marketing}
          onChange={(isSelected: boolean) =>
            handleCheckboxChange && handleCheckboxChange("marketing", isSelected)
          }
          label="Marketing"
        />
        <Checkbox
          name="functional"
          checked={preferences.functional}
          onChange={(isSelected: boolean) =>
            handleCheckboxChange && handleCheckboxChange("functional", isSelected)
          }
          label="Funkční"
        />
      </form>
      <Button type="submit" onPress={() => onCookieSubmit()}>
        Uložit preference
      </Button>
    </>
  );
}

export default Cookies;
