import Wrapper from "@components/bricks/Wrapper";
import { GridCell, GridColumnLayout } from "@components/cookies/Grid";
import HeroUniversal from "@components/cookies/HeroUniversal";
import Cookies, { CookieData } from "../components/cookies/Cookies";

type CookieDataType = CookieData[];

const sampleData: CookieDataType = [
  {
    name: "_ga",
    owner: "Google",
    category: "marketing",
    expiry: "2 years",
  },
  {
    name: "_ga_*",
    owner: "Google",
    category: "marketing",
    expiry: "2 years",
  },
  {
    name: "cookiePreference",
    owner: "Our website",
    category: "functional",
    expiry: "1 year",
  },
];

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  return {
    title: "Cookies | Moje česká doprava",
    description: "Používáme cookies ke zlepšení vašeho zážitku. Více informací najdete v našich zásadách používání cookies.",
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function page() {
  return (
    <>
      <HeroUniversal heading="Cookie settings" />
      <Wrapper whitespace="-/lg">
        <GridColumnLayout>
          <GridCell colSpan="2" colShift="1" isFullOnMobile>
            <Cookies cookies={sampleData} />
          </GridCell>
        </GridColumnLayout>
      </Wrapper>
    </>
  );
}
