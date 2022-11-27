import BasicContact from '@components/bricks/BasicContact'
import BasicHero from '@components/bricks/BasicHero'
import Button from '@components/bricks/Button'
import ParallaxImage from "@components/bricks/ParallaxImage"
import Dates from '@components/chorvatsko/Dates'
import DeparturePoints from '@components/chorvatsko/DeparturePoints'
import Form from '@components/chorvatsko/form/Form'
import Informations from '@components/chorvatsko/Informations'
import Pricing from '@components/chorvatsko/Pricing'
import Questions from '@components/chorvatsko/Questions'
import Seo from '@components/root/seo/Seo'
import { ipToFetch } from '@configs/globalConfig'
import { HiArrowSmDown } from 'react-icons/hi'

type Props = {
  prices: any;
  months: any;
  swimming: any;
  departurePoints: DeparturePointsProps[];
  specialPrices: SpecialPricesProps[];
}


interface SpecialPricesProps {
  cena: string;
  mesto: [
    {
      nazev: string;
    }
  ]
}

interface DeparturePointsProps {
  oblast: string;
  stat: string;
  mesto: [{
    nazev: string;
  }];
}

export default function chorvatsko({ prices, swimming, months, departurePoints, specialPrices }: Props) {
  return (
    <>
      <Seo title="Česká doprava" description="" />
      <BasicHero
        heading="Autobusem do Chorvatska"
        text="Komfortní, přímá a cenově dostupná autobusová doprava z jihozápadních Čech do všech Chorvatských letovisek. Užijte si cestování. Vaše dovolená začíná už na palubě našich autobusů"
        imagePosition="right"
        imageAlt="Obrázek Chorvatsko"
        imageSrc="/images/chorvatsko/hero.png"
      >
        <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-5">
          <a href="#informace">
            <Button className="w-full sm:w-fit md:w-full lg:w-fit" rightIcon={<HiArrowSmDown />}>Více informací</Button>
          </a>
          <a href="#formular">
            <Button variant={"outlined"} className="w-full sm:w-fit md:w-full lg:w-fit">Objednávkový formulář</Button>
          </a>
        </div>
      </BasicHero>
      <Informations />
      <ParallaxImage 
        className="w-screen aspect-[8/3] bg-body-100" 
        containerClass='w-screen aspect-[6/3]'
        speed={-25} 
        src="/images/home/chorvatsko.jpg"
        />
      <DeparturePoints departurePoints={departurePoints} />
      <Dates months={months} />
      <Pricing prices={prices} specialPrices={specialPrices} swimming={swimming}/>
      <Form prices={prices} months={months} departurePoints={departurePoints} specialPrices={specialPrices} />
      <Questions />
      <BasicContact
        heading='Kontaktujte nás'
        text='Máte-li další dotazy k autobusové dopravě do Chorvatska, neváhejte nás kontaktovat.'
      />
    </>
  )
}

export async function getStaticProps() {
  const pricesQuery = "?populate[jizdne][populate][0]=x"
  const swimmingQuery = "&populate[koupani][populate][0]=X"
  const monthsQuery = "&populate[mesice][populate][0]=datumCr&populate[mesice][populate][1]=datumHr"
  const departurePointsQuery = "&populate[odjezdMista][populate][0]=mesto"
  const specialPricesQuery = "&populate[nastupniMista][populate][0]=mesto";

  const res = await fetch(ipToFetch + "/api/chorvatsko"
    + pricesQuery
    + swimmingQuery
    + monthsQuery
    + departurePointsQuery
    + specialPricesQuery
  )
  const dataAndMeta = await res.json()
  const data = dataAndMeta.data.attributes
  return {
    props: {
      prices: data.jizdne,
      swimming: data.koupani,
      months: data.mesice,
      departurePoints: data.odjezdMista,
      specialPrices: data.nastupniMista

    }
  }
}
