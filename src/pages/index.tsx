import ParallaxImage from "@components/bricks/ParallaxImage";
import Aftermovie from "@components/home/Aftermovie";
import Croatia from "@components/home/Croatia";
import Hero from "@components/home/Hero";
import NearestDepartures from "@components/home/NearestDepartures";
import OtherServices from "@components/home/OtherServices";
import Reviews from "@components/home/Reviews";
import TripsAndParallax from "@components/home/TripsAndParallax";
import Seo from "@components/root/seo/Seo";
import { ipToFetch } from "@configs/globalConfig";

type Props = {
  trips: any;
  reviews: any;
};

export default function Home({ trips, reviews }: Props) {
  return (
    <>
      <Seo
        title="Moje česká doprava – Autobusová a kamionová doprava po celé Evropě"
        description="Jsme Český dopravce zajišťující autobusovou a nákladní přepravu. Každý rok přepravíme tisíce spokojených cestujících. Doprava nás Baví!"
      />

      <Hero />

      {/* Nejbližší odjezdy */}
      <NearestDepartures data={trips} />

      {/* Aftermovie */}
      <Aftermovie />

      {/* Zajezdy */}
      <TripsAndParallax />

      {/* Recenze */}
      <Reviews reviews={reviews} />

      {/* Obrázek */}
      <ParallaxImage
        className="aspect-[7/3] w-screen"
        containerClass="w-screen aspect-[6/3]"
        speed={-8}
        animOnPhone={false}
        priority={true}
        src="/images/home/chorvatsko.jpg"
      />

      {/* Chorvatsko */}
      <Croatia />

      {/* Další služby */}
      <OtherServices />
    </>
  );
}

export async function getStaticProps() {
  const populateQuery =
    "?populate[uvodniFoto][fields][0]=url&populate[terminACena][fields][1]=datumOd&populate[terminACena][fields][2]=datumDo";
  const filtersQuery =
    "&filters[vybrany]=true&filters[terminACena][datumOd][$gte]=" +
    new Date().toISOString().slice(0, 10);
  const fieldsQuery = "&fields[0]=nazev&fields[1]=stat";
  const paginationQuery = "&pagination[pageSize]=4";
  const tripsRes =
    await fetch(
      ipToFetch +
      "/api/zajezds" +
      populateQuery +
      filtersQuery +
      fieldsQuery +
      paginationQuery
    )
  const tripsDataAndMeta = await tripsRes.json();
  const tripsData = tripsDataAndMeta.data;

  const reviewsRes = await fetch(
    ipToFetch +
    "/api/recenzes?populate[fotka][fields][0]=url"
  );
  const reviewsDataAndMeta = await reviewsRes.json();
  const reviewsRata = reviewsDataAndMeta.data;


  return {
    props: {
      trips: tripsData,
      reviews: reviewsRata
    },
  };
}
