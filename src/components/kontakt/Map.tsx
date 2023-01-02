import Heading from "@components/bricks/Heading";
import Wrapper from "@components/bricks/Wrapper";
import { globalConfig } from "@configs/globalConfig";

export default function Map() {
  return (
    <Wrapper size="lg" className="mb-12 md:mb-20">
      <div className="mx-auto max-w-prose">
        <Heading level={2} size="xl" className="text-center">
          Kde nás najdete?
        </Heading>
      </div>
      <div className="relative mt-20 aspect-[10/7] w-full bg-gray-100 md:aspect-[10/4]">
        <iframe
          src={globalConfig.googleAddress}
          allowFullScreen
          loading="lazy"
          className="h-full w-full"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </Wrapper>
  );
}
