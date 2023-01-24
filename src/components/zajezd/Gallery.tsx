import Image from "next/image";
import { useEffect, useState } from "react";
import { HiArrowLeft, HiArrowRight, HiX } from "react-icons/hi";
import { useSwipeable } from "react-swipeable";

type Props = {
  images: any;
};

export default function Gallery({ images }: Props) {
  const [imageIndex, setImageIndex] = useState<number | undefined>(undefined);
  let handlers: any;

  useEffect(() => {
    if (imageIndex !== undefined) {
      document.body.classList.add("helper-scroll-lock");
      document.getElementById("eZscroller")!.scrollLeft =
        document.getElementById("tiny" + imageIndex)!.offsetLeft -
        document.getElementById("tiny" + imageIndex)!.clientWidth / 2 -
        20;
    } else {
      document.body.classList.remove("helper-scroll-lock");
    }
  }, [imageIndex, setImageIndex]);

  handlers = useSwipeable({
    onSwipedLeft: () => {
      imageIndex !== undefined &&
        imageIndex < images.length - 1 &&
        setImageIndex(imageIndex + 1);
    },
    onSwipedRight: () => {
      imageIndex !== undefined &&
        imageIndex > 0 &&
        setImageIndex(imageIndex - 1);
    },
  });

  return (
    <div id="galerie" className="flex flex-col gap-1 pb-32">
      {/* Opened gallery */}
      {imageIndex !== undefined && (
        <div className="fixed inset-0 z-[130] h-screen w-screen bg-[#121215]/90 backdrop-blur-sm">
          <div className="relative flex h-3/4 w-full flex-row items-center justify-center px-5 md:gap-x-20">
            {/* Gallery arrow left */}
            <span
              onClick={() => imageIndex !== 0 && setImageIndex(imageIndex - 1)}
              className={`absolute top-0 left-0 z-[150] flex h-full w-1/4
                cursor-pointer justify-center rounded-md border-white text-3xl text-white opacity-50
                duration-150 hover:opacity-90 md:static md:h-10
                md:w-10 md:items-center
                `}
            >
              <HiArrowLeft className="hidden md:block" />
            </span>

            {/* Gallery close button */}
            <span
              onClick={() => setImageIndex(undefined)}
              className="absolute top-5 right-5 z-[160] flex cursor-pointer items-center justify-center
              rounded-md border-white text-3xl text-white opacity-50 duration-150 hover:opacity-90 md:h-10 md:w-10"
            >
              <HiX />
            </span>

            {/* Gallery main image */}
            <div
              className="relative z-[140] aspect-[16/9] w-full select-none md:w-3/5 lg:w-[55%]"
              {...handlers}
            >
              <Image
                src={images[imageIndex]}
                alt="#"
                layout="fill"
                objectFit="contain"
              />
            </div>

            {/* Gallery arrow right */}
            <span
              onClick={() =>
                imageIndex !== images.length - 1 &&
                setImageIndex(imageIndex + 1)
              }
              className={`absolute top-0 right-0 z-[150] flex h-full w-1/4
                cursor-pointer justify-center rounded-md border-white text-3xl text-white opacity-50
                duration-150 hover:opacity-90 md:static md:h-10
                md:w-10 md:items-center
                `}
            >
              <HiArrowRight className="hidden md:block" />
            </span>
          </div>

          {/* Gallery small images */}
          <div className="flex h-1/4 w-full items-center">
            <div
              id="eZscroller"
              className="scroll relative mx-5 flex flex-row items-center gap-x-3 overflow-auto md:mx-32"
            >
              {images &&
                images.map((imageSrc: any, index: number) => (
                  <span
                    id={"tiny" + index}
                    key={index}
                    onClick={() => setImageIndex(index)}
                    className={`
                       relative aspect-[4/3] min-w-[150px] cursor-pointer select-none duration-200 hover:shadow-md
                      ${
                        images.indexOf(imageSrc) === imageIndex
                          ? "scale-100"
                          : "scale-75 hover:scale-90"
                      }
                    `}
                  >
                    <Image
                      src={imageSrc}
                      alt="#"
                      layout="fill"
                      className="rounded-md"
                      objectFit="cover"
                      sizes="(max-width: 768px) 50vw,
                      (max-width: 1200px) 50vw,
                      50vw"
                    />
                  </span>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Closed gallery */}
      <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
        {images &&
          images.map((imageSrc: any, index: number) => (
            <span
              key={index}
              onClick={() => setImageIndex(index)}
              className=" relative aspect-[4/3] cursor-pointer overflow-hidden rounded-md bg-gray-200 select-none duration-200 hover:scale-105 hover:shadow-md"
            >
              <Image
                src={imageSrc}
                alt="#"
                layout="fill"
                className="object-cover"
                sizes="(max-width: 768px) 50vw,
                (max-width: 1200px) 33vw,
                33vw"
              />
            </span>
          ))}
      </div>
    </div>
  );
}
