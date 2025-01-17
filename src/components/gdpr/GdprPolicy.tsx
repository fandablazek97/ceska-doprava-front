import Heading from "@components/bricks/Heading";
import Link from "next/link";

type Props = {
  ownerName: string;
  ico: string;
  adress: string;
  email: string;
  phone: string;
  takesEffectDate: string;
};

export default function GdprPolicy({
  ownerName = "Jméno Příjmení",
  ico = "01234567",
  adress = "Ulice 123, 123 456 Město",
  email = "info@domena.cz",
  phone = "+420 123 456 789",
  takesEffectDate = "15. 10. 2021",
}: Props) {
  return (
    <section id="gdpr" className="text-formatter">
      <p>
        <strong className="text-xl leading-loose">
          Ochranu osobních údajů nebereme na lehkou váhu. V souladu s nařízením
          Evropského Parlamentu a Rady (EU) 2016/679 o ochraně fyzických osob v
          souvislosti se zpracováním osobních údajů a o volném pohybu těchto
          údajů (dále také „GDPR“) a o zrušení směrnice 95/46/ES (obecné
          nařízení o ochraně osobních údajů) předkládáme následující prohlášení.
        </strong>
      </p>

      <Heading level={2} size="lg" className="pt-20" align="center">
        Základní informace
      </Heading>
      <Heading level={3} size="base">
        Správce osobních údajů
      </Heading>
      <p>
        {ownerName}, {adress}, IČ: {ico} <br />
        (dále jen jako „Správce“)
      </p>

      <Heading level={4} size="sm">
        Kontaktní údaje správce
      </Heading>
      <ul>
        <li>Telefon: {phone}</li>
        <li>E-mail: {email}</li>
        <li>Adresa: {adress}</li>
      </ul>

      <p>
        Správce je povinen zajistit veškeré úsilí k tomu, aby bylo s osobními
        daty nakládáno v souladu se zákonem č. 110/2019 Sb.
      </p>

      <Heading level={2} size="lg">
        Zdroj osobních údajů
      </Heading>
      <p>
        Osobní údaje jsou získány na základě vzájemné komunikace, uzavřených
        smluv, či z vyplněných formulářů a pohybu po webových stránkách. Další
        osobní údaje pochází z veřejně dostupných zdrojů (rejstříků, evidencí,
        atd.).
      </p>

      <Heading level={2} size="lg">
        Seznam osobních údajů
      </Heading>

      <Heading level={3} size="base">
        Zpracováváme následující osobní údaje:
      </Heading>

      <ul>
        <li>Jméno a příjmení, E-mail, Telefon, Adresa</li>
        <li>Historii vzájemné komunikace</li>
      </ul>

      <Heading level={3} size="base">
        Osobní údaje z vyplněných formulářů z webových stránek:
      </Heading>
      <ul>
        <li>Jméno a příjmení, E-mail, Telefon, Adresa</li>
      </ul>

      <Heading level={3} size="base">
        Pro zlepšení našich služeb využíváme možnosti uložení cookies do vašeho
        prohlížeče.
      </Heading>
      <p>
        Pro více informací o cookies si přečtěte naše{" "}
        <Link href="/cookies">
          zásady používání cookies.
        </Link>
      </p>

      <Heading level={2} size="lg">
        Účel zpracování osobních údajů
      </Heading>
      <ul>
        <li>Naplnění závazků mezi správcem a subjektem údajů</li>
        <li>PR a Marketingové účely</li>
      </ul>

      <Heading level={2} size="lg">
        Doba zpracování
      </Heading>
      <p>
        Osobní údaje budou zpracovány po dobu nezbytně nutnou k daným účelům. Ne
        však po dobu delší než 30 let. Po uplynutí této doby budou osobní údaje
        odstraněny.
      </p>

      <Heading level={2} size="lg">
        Informování, editace, nebo výmaz osobních údajů
      </Heading>
      <p>
        Ze statutu nařízení máte právo ovlivnit způsob nakládání s vašimi
        osobními údaji. Zejména se jedná o:
      </p>

      <ul>
        <li>Právo na informace o zpracování vašich osobních údajů</li>
        <li>Právo na opravu osobních údajů</li>
        <li>Právo na odstranění (právo být zapomenut)</li>
      </ul>

      <p>
        <strong>
          Pro uplatnění tohoto práva využijte kontaktních údajů správce na
          začátku dokumentu.
        </strong>
      </p>

      <p className="mt-20 text-lg font-semibold">
        Tyto podmínky nabývají účinnosti dnem {takesEffectDate}.
      </p>
    </section>
  );
}
