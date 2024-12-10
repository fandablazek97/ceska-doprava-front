import clsx from "clsx";
import { motion } from "framer-motion";
import { GridCell, GridColumnLayout, GridHorizontalLine } from "./Grid";
import Wrapper from "./Wrapper";

export default function HeroUniversal({
  heading = "Elevating product development through design",
  primaryAction,
  secondaryAction,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & {
  heading?: string;
  primaryAction?: React.ReactNode;
  secondaryAction?: React.ReactNode;
}) {
  const noActions = !primaryAction && !secondaryAction;
  const isShortHeading = heading.length < 15;

  return (
    <div {...props} className={props.className}>
      <Wrapper className="border-y border-grid">
        <GridColumnLayout className="py-20 sm:py-28 lg:py-32 xl:py-40">
          <GridCell colSpan="4">
            {/* <MotionStaggeredWords
              as="h1"
              preset="hero"
              isCenterAligned
              overflowClip={false}
              className="text-center font-display text-xl leading-tight text-rich min-[450px]:text-2xl min-[450px]:leading-tight sm:text-3xl sm:leading-tight md:text-4xl md:leading-tight lg:text-5xl lg:leading-none xl:text-6xl xl:leading-none 2xl:text-[5.25rem] 2xl:leading-none"
            >
              {heading}
            </MotionStaggeredWords> */}
            <h1
              className={clsx(
                "text-center text-2xl font-semibold leading-tight text-rich min-[450px]:text-4xl min-[450px]:leading-tight sm:text-5xl sm:leading-tight md:text-6xl md:leading-tight lg:text-7xl lg:leading-none xl:text-8xl xl:leading-none 2xl:leading-none",
                isShortHeading ? "2xl:text-[10.5rem]" : "2xl:text-9xl"
              )}
            >
              {heading}
            </h1>
          </GridCell>
        </GridColumnLayout>
      </Wrapper>
      {!noActions && (
        <>
          <Wrapper>
            <GridColumnLayout>
              <GridCell colShift="3" colSpan="1" isFullOnMobile className="flex flex-col">
                {primaryAction && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 0.5, ease: "easeOut" }}
                  >
                    {primaryAction}
                  </motion.div>
                )}
                {secondaryAction && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.8, duration: 0.5, ease: "easeOut" }}
                  >
                    {secondaryAction}
                  </motion.div>
                )}
              </GridCell>
            </GridColumnLayout>
          </Wrapper>
          <GridHorizontalLine isFullScreen />
        </>
      )}
    </div>
  );
}
