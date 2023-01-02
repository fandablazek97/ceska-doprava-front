import { HiMail, HiPhone } from "react-icons/hi";

import Button from "@components/bricks/Button";
import { ctaMenu } from "@configs/routes";
import Wrapper from "./Wrapper";
import Heading from "./Heading";

type Props = {
  heading: string;
  text: string;
};

export default function BasicContact({ heading, text }: Props) {
  return (
    <section>
      <Wrapper
        size="full"
        paddedContent="sm"
        className="mb-20 flex flex-col items-center justify-center rounded-md bg-primary bg-gradient-to-tl from-black/60 px-5 md:min-h-[700px]"
      >
        <Heading level={3} size="xl" color="white" className="text-center">
          {heading}
        </Heading>
        <p className="mt-5 max-w-lg text-center text-white">{text}</p>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <a href={ctaMenu[0].link}>
            <Button
              color="light"
              variant="filled"
              className="w-full"
              leftIcon={<HiPhone />}
            >
              {ctaMenu[0].label}
            </Button>
          </a>
          <a href={ctaMenu[1].link}>
            <Button
              color="light"
              variant="filled"
              className="w-full"
              leftIcon={<HiMail className="mr-3" />}
            >
              {ctaMenu[1].label}
            </Button>
          </a>
        </div>
      </Wrapper>
    </section>
  );
}
