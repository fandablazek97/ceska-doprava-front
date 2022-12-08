import Heading from '@components/bricks/Heading';
import Wrapper from '@components/bricks/Wrapper';
import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi";
import Image from "next/image";



type Category = {
  kategorie: string;
}

type Props = {
  country: string;
  name: string;
  perex: string;
  price?: number;
  code: string;
  location: string;
  categories: Category[];
  imageSrc: string;
  imageAlt: string;
}

export default function Hero({ 
  country, 
  name, 
  perex, 
  price, 
  code, 
  location, 
  categories,
  imageSrc,
  imageAlt
}: Props) {
  return (
    <Wrapper
      size='base'
      className='pt-32 grid grid-cols-1 md:grid-cols-2 gap-x-20'
      as={"header"}
    >
      <div className='flex flex-col'>
        <Link href="/zajezdy"><a className="flex flex-row items-center gap-2 text-gray-600 font-semibold"><HiArrowLeft /> Zpět</a></Link>
        <div className="flex flex-row flex-wrap gap-3 md:gap-5 mt-8">
          {categories.map((categories, key) => {
            if (key <= 2) {
              return (
              <span
                className="bg-primary text-white rounded-lg w-fit px-2 tracking-[2px]"
                key={key}
              >
                {categories.kategorie}
              </span>
            )
          }
        })}
      </div>
      <Heading level={1} size={"xl"} className="mt-12">{country} - {name}</Heading>
      <p className="text-lg text-gray-600 font-semibold mt-16 md:w-3/5">{perex}</p>
      <div className="flex flex-col md:flex-row mt-28 gap-x-8">
        <div className="flex flex-row justify-between">
          <span className="text-primary font-bold text-xl pr-5 shrink-0">Od {price},-</span>
          <span className="text-primary font-bold text-xl px-5 shrink-0">Kód zájezdu: {code}</span>
        </div>
      </div>
      <div className="relative aspect-[11/12] mt-10 md:mt-0">
        <Image
          src={imageSrc}
          alt={imageAlt}
          layout="fill"
          objectFit="cover"
          loading="eager"
          priority={true}
          className="rounded-lg"
        />
        </div>
    </Wrapper>
  )
}