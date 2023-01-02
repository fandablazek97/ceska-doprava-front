import Heading from "@components/bricks/Heading";
import ScrollReveal from "@components/bricks/ScrollReveal";
import Wrapper from "@components/bricks/Wrapper";
import { BiTask } from "react-icons/bi";
import { BsFillCalculatorFill } from "react-icons/bs";
import { FaQuestion } from "react-icons/fa";

type Props = {
  heading: string;
  textLeft: string;
  textRight: string;
  heading2: string;
  text2: string;
  c1heading: string;
  c1text: string;
  c2heading: string;
  c2text: string;
  c3heading: string;
  c3text: string;
};

export default function Information({
  heading,
  textLeft,
  textRight,
  heading2,
  text2,
  c1heading,
  c1text,
  c2heading,
  c2text,
  c3heading,
  c3text,
}: Props) {
  return (
    <div className="bg-body-100">
      <Wrapper as="section" size="base" paddedContent="sm" id="informace">
        <ScrollReveal>
          <Heading level={2} size="lg">
            {heading}
          </Heading>
          <div className="my-10 grid grid-cols-1 gap-5 md:grid-cols-2">
            <p>{textLeft}</p>
            <p>{textRight}</p>
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <Heading level={2} size={"lg"} className="mb-10 mt-32">
            {heading2}
          </Heading>
          <p className="max-w-xl">{text2}</p>
        </ScrollReveal>
        <ScrollReveal
          as={"div"}
          className="mt-24 grid grid-cols-1 gap-x-5 gap-y-20 md:grid-cols-3 lg:gap-x-10"
          animation="slide-up"
          staggerChildren
          staggerChildrenIncrement="200"
          duration="200"
        >
          <div className="relative flex flex-col items-center rounded-2xl bg-white px-5 py-10 shadow-lg shadow-gray-300">
            <span className="absolute left-1/2 top-0 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-2xl text-white">
              <FaQuestion />
            </span>
            <Heading level={3} size="sm" align="center">
              {c1heading}
            </Heading>
            <p className="mt-5 text-center text-sm">{c1text}</p>
          </div>
          <div className="relative flex flex-col items-center rounded-2xl bg-white px-5 py-10 shadow-lg shadow-gray-300">
            <span className="absolute left-1/2 top-0 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-2xl text-white">
              <BsFillCalculatorFill />
            </span>
            <Heading level={3} size="sm" align="center">
              {c2heading}
            </Heading>
            <p className="mt-5 text-center text-sm">{c2text}</p>
          </div>
          <div className="relative flex flex-col items-center rounded-2xl bg-white px-5 py-10 shadow-lg shadow-gray-300">
            <span className="absolute left-1/2 top-0 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-2xl text-white">
              <BiTask />
            </span>
            <Heading level={3} size="sm" align="center">
              {c3heading}
            </Heading>
            <p className="mt-5 text-center text-sm">{c3text}</p>
          </div>
        </ScrollReveal>
      </Wrapper>
    </div>
  );
}
