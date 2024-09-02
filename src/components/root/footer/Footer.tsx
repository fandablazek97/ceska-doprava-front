import Heading from "@components/bricks/Heading";
import Wrapper from "@components/bricks/Wrapper";
import SocialLinks from "@components/root/socials/SocialLinks";
import { globalConfig } from "@configs/globalConfig";
import Link from "next/link";
import { ctaMenu, mainRoutes } from "../../../configs/routes";
import FooterAuthor from "./FooterAuthor";

export default function Footer() {
  return (
    <footer className="border-body-900 mt-16 border-t border-solid">
      <Wrapper
        size="lg"
        className="grid grid-cols-1 gap-y-12 gap-x-12 py-16 md:grid-cols-2 md:gap-y-20 md:py-24 lg:grid-cols-4"
      >
        {/* Logo + copyright + socky */}
        <div className="col-span-1 flex flex-col items-center justify-center gap-8 text-center md:items-start md:justify-start md:text-left">
          {/* <Heading level={3} size="base">
            {globalConfig.client.fullName}
          </Heading> */}
          <img
            src="/logos/logo.svg"
            alt="logo česká doprava"
            className="h-auto w-full max-w-[180px]"
          ></img>
          <div className="max-w-prose">
            Společnost působící v oblasti cestovního ruchu, osobní a autobusové
            dopravy ale i dopravy nákladní.
          </div>
          <SocialLinks />
        </div>

        {/* Kontakt */}
        <div className="col-span-1 flex flex-col items-center justify-center text-center md:items-start md:justify-start md:text-left">
          <Heading level={3} size="sm">
            Rychlý kontakt
          </Heading>
          <ul className="mt-2 space-y-1">
            <li>
              <a
                href={ctaMenu[0].link}
                className="c-link-3-a text-base font-medium text-primary outline-none focus-visible:ring-4 focus-visible:ring-primary/70"
              >
                {ctaMenu[0].label}
              </a>
            </li>
            <li>
              <a
                href={ctaMenu[1].link}
                className="c-link-3-a text-base font-medium text-primary outline-none focus-visible:ring-4 focus-visible:ring-primary/70"
              >
                {ctaMenu[1].label}
              </a>
            </li>
            <li>
              <span className="text-base font-medium text-muted">
                {globalConfig.client.adress}
              </span>
            </li>
          </ul>
        </div>

        {/* Navigace */}
        <div className="col-span-1 flex flex-col items-center justify-center text-center md:items-start md:justify-start md:text-left">
          <Heading level={3} size="sm">
            Navigace
          </Heading>
          <ul className="mt-2 space-y-1">
            {mainRoutes.map((route) => (
              <li key={route.label}>
                <Link href={route.path}>
                  <a className="c-link-3-a text-base font-medium text-muted outline-none focus-visible:ring-4 focus-visible:ring-primary/70">
                    {route.label}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Další odkazy */}
        <div className="col-span-1 flex flex-col items-center justify-center text-center md:items-start md:justify-start md:text-left">
          <Heading level={3} size="sm">
            Další odkazy
          </Heading>
          <ul className="mt-2 space-y-1">
            <li>
              <Link href="/cookies">
                <a className="c-link-3-a text-base font-medium text-muted outline-none focus-visible:ring-4 focus-visible:ring-primary/70">
                  Cookies
                </a>
              </Link>
            </li>
            <li>
              <Link href="/gdpr">
                <a className="c-link-3-a text-base font-medium text-muted outline-none focus-visible:ring-4 focus-visible:ring-primary/70">
                  Zpracování osobních údajů
                </a>
              </Link>
            </li>
            <li>
              <Link href="/zajezdy/vse/#keStazeni">
                <a className="c-link-3-a text-base font-medium text-muted outline-none focus-visible:ring-4 focus-visible:ring-primary/70">
                  Aktuální katalog
                </a>
              </Link>
            </li>
            <li>
              <Link href="/zajezdy/vse/#keStazeni">
                <a className="c-link-3-a text-base font-medium text-muted outline-none focus-visible:ring-4 focus-visible:ring-primary/70">
                  Obchodní podmínky
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </Wrapper>

      {/* Autor webu - podpis */}
      <Wrapper
        size="lg"
        className="flex items-center justify-center border-t border-solid border-body-100 py-10"
      >
        <FooterAuthor />
      </Wrapper>
    </footer>
  );
}
