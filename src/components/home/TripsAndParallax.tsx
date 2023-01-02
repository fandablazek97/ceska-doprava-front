import Button from "@components/bricks/Button";
import Heading from "@components/bricks/Heading";
import ScrollReveal from "@components/bricks/ScrollReveal";
import Wrapper from "@components/bricks/Wrapper";
import Image from "next/image";
import Link from "next/link";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";

type JustParallaxProps = {
  className?: string;
};

function JustParallax({ className = "" }: JustParallaxProps) {
  return (
    <ParallaxProvider>
      <div
        className={`grid grid-cols-2 gap-6 py-20 md:grid-cols-4 xl:gap-16 ${className}`}
      >
        {/* 1 */}
        <Parallax
          speed={3}
          className="relative my-auto hidden aspect-[3/5] md:block"
        >
          <Image
            src="/images/home/parallax/1.jpg"
            alt="Obrázek"
            layout="fill"
            objectFit="cover"
            loading="lazy"
            className="rounded-3xl"
            sizes="(max-width: 768px) 0,
            (max-width: 1200px) 20vw,
            20vw"
          />
        </Parallax>

        {/* 2 */}
        <Parallax speed={-5} className="flex flex-col gap-6 xl:gap-16">
          <div className="relative aspect-[3/5]">
            <Image
              src="/images/home/parallax/2.jpg"
              alt="Obrázek"
              layout="fill"
              objectFit="cover"
              loading="lazy"
              className="rounded-3xl"
              sizes="(max-width: 768px) 50vw,
              (max-width: 1200px) 20vw,
              20vw"
            />
          </div>
          <div className="relative aspect-[3/5]">
            <Image
              src="/images/home/parallax/3.jpg"
              alt="Obrázek"
              layout="fill"
              objectFit="cover"
              loading="lazy"
              className="rounded-3xl"
              sizes="(max-width: 768px) 50vw,
              (max-width: 1200px) 20vw,
              20vw"
            />
          </div>
        </Parallax>

        {/* 2 */}
        <Parallax speed={5} className="flex flex-col gap-6 xl:gap-16">
          <div className="relative aspect-[3/5]">
            <Image
              src="/images/home/parallax/4.jpg"
              alt="Obrázek"
              layout="fill"
              objectFit="cover"
              loading="lazy"
              className="rounded-3xl"
              sizes="(max-width: 768px) 50vw,
              (max-width: 1200px) 20vw,
              20vw"
            />
          </div>
          <div className="relative aspect-[3/5]">
            <Image
              src="/images/home/parallax/5.jpg"
              alt="Obrázek"
              layout="fill"
              objectFit="cover"
              loading="lazy"
              className="rounded-3xl"
              sizes="(max-width: 768px) 50vw,
              (max-width: 1200px) 20vw,
              20vw"
            />
          </div>
        </Parallax>

        {/* 1 */}
        <Parallax
          speed={-3}
          className="relative my-auto hidden aspect-[3/5] md:block"
        >
          <Image
            src="/images/home/parallax/6.jpg"
            alt="Obrázek"
            layout="fill"
            objectFit="cover"
            loading="lazy"
            className="rounded-3xl"
            sizes="(max-width: 768px) 0,
            (max-width: 1200px) 20vw,
            20ww"
          />
        </Parallax>
      </div>
    </ParallaxProvider>
  );
}

export default function TripsAndParallax() {
  return (
    <>
      <Wrapper as={"section"} paddedContent="base">
        <ScrollReveal staggerChildren>
          <Heading level={2} size="lg" className="mb-10 max-w-lg">
            Pojeďte s námi na dovolenou po celé ČR i do zahraničí
          </Heading>
          <p className="mb-10 max-w-prose">
            Říká se, že zážitky vám nikdo nesebere, a v duchu tohoto hesla pro
            vás připravujeme jednodenní i vícedenní poznávací zájezdy a výlety
            za kulturou a odpočinkem. Najdete u nás také bohatou nabídku
            pobytových dovolených u moře. Jsme váš specialista na Čechy,
            Chorvatsko, Rakousko, Německo a Polsko
          </p>
          <div>
            <Link href="/zajezdy">
              <Button as="a">Zobrazit zájezdy</Button>
            </Link>
          </div>
        </ScrollReveal>
      </Wrapper>

      <Wrapper size="lg">
        <JustParallax />
      </Wrapper>
    </>
  );
}
