import Image from "next/image";
import { Parallax, ParallaxProvider } from 'react-scroll-parallax';

type Props = {
  className?: string;
  speed?: number;
  src?: string;
  alt?: string;
  animOnPhone?: true | false;
  loading?: "eager" | "lazy";
  containerClass?: string;
  priority?: true | false;
}

export default function ParallaxImage({
  className,
  speed = 3,
  src = "/images/conf.jpg",
  alt = "image alt",
  animOnPhone = false,
  loading = "lazy",
  containerClass = "",
  priority=false
}: Props) {
  if (animOnPhone) {
    return (
      <div className={`overflow-hidden ${containerClass}`}>
        <ParallaxProvider>
          <Parallax speed={speed} className={`relative ${className}`}>
            <Image
              src={src}
              alt={alt}
              layout="fill"
              objectFit="cover"
              loading={priority ? "eager" : loading}
              priority={priority}
              sizes="(max-width: 768px) 100vw,
                (max-width: 1200px) 100vw,
                100vw"
            />
          </Parallax>
        </ParallaxProvider>
      </div>
    )
  }
  else {
    return (
      <>
        <div className={`hidden md:block overflow-hidden ${containerClass}`}>
          <ParallaxProvider>
            <Parallax speed={speed} className={`hidden md:block ${className}`}>
              <Image
                src={src}
                alt={alt}
                layout="fill"
                objectFit="cover"
                loading={priority ? "eager" : loading}
                priority={priority}
                sizes="(max-width: 768px) 100vw,
                  (max-width: 1200px) 100vw,
                  100vw"
              />
            </Parallax>
          </ParallaxProvider>
        </div>
        <div className={`relative block md:hidden ${className}`}>
          <Image
            src={src}
            alt={alt}
            layout="fill"
            objectFit="cover"
            loading={priority ? "eager" : loading}
            priority={priority}
            sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 100vw,
              100vw"
          />
        </div>
      </>
    )
  }
}