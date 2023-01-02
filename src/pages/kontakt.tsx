import Hero from "@components/kontakt/Hero";
import InfoAndForm from "@components/kontakt/InfoAndForm";
import Map from "@components/kontakt/Map";
import Seo from "@components/root/seo/Seo";
import React from "react";

export default function kontakt() {
  return (
    <>
      <Seo
        title="Kontakt – Neváhejte se na nás obrátit, rádi Vám pomůžeme"
        description="Máte jakýkoliv dotaz? Nonstop dispečink, rezervace zájezdů, změny objednávek, kamionová doprava a další."
      />
      <Hero />
      <InfoAndForm />
      <Map />
    </>
  );
}
