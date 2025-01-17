import clsx from "clsx";
import { IconProps } from "react-toastify";
import Wrapper, { styles as wrapperStyles } from "./Wrapper";

export function GridLinesBg(props: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div {...props} className={`relative ${props.className}`}>
      {/* Eight columns grid with every other dashed lines */}
      <div className="absolute inset-0 -z-10 size-full">
        <Wrapper className="relative grid h-full grid-cols-4 lg:grid-cols-8">
          <div className="absolute inset-y-0 left-0 h-full w-px -translate-x-px bg-grid transition-colors duration-700" />
          <div className="size-full transition-colors duration-700" />
          <div className="size-full border-l border-dashed border-grid opacity-90 transition-colors duration-700" />
          <div className="size-full -translate-x-px border-l border-grid transition-colors duration-700" />
          <div className="size-full border-l border-dashed border-grid opacity-90 transition-colors duration-700" />
          <div className="hidden size-full border-l border-grid transition-colors duration-700 lg:block" />
          <div className="hidden size-full border-l border-dashed border-grid opacity-90 transition-colors duration-700 lg:block" />
          <div className="hidden size-full border-l border-grid transition-colors duration-700 lg:block" />
          <div className="hidden size-full border-l border-dashed border-grid opacity-90 transition-colors duration-700 lg:block" />
          <div className="absolute inset-y-0 right-0 h-full w-px translate-x-px bg-grid transition-colors duration-700" />
        </Wrapper>
      </div>
      {props.children}
    </div>
  );
}

// Grid bg content
const contentGapY = {
  none: "",
  sm: "gap-y-10 lg:gap-y-16",
  md: "gap-y-12 lg:gap-y-20",
  lg: "gap-y-16 lg:gap-y-28",
  xl: "gap-y-24 lg:gap-y-36",
};

export function GridColumnLayout({
  isDisabledLayout = false,
  whitespance = "none",
  gapY = "none",
  ...props
}: React.ComponentPropsWithoutRef<"div"> & {
  isDisabledLayout?: boolean;
  whitespance?: keyof typeof wrapperStyles.variants.whitespace;
  gapY?: "none" | "sm" | "md" | "lg" | "xl";
}) {
  return (
    <div
      {...props}
      className={clsx(
        !isDisabledLayout && "grid grid-cols-4 gap-x-0.5 lg:grid-cols-8",
        wrapperStyles.variants.whitespace[whitespance],
        contentGapY[gapY],
        props.className
      )}
    >
      {props.children}
    </div>
  );
}

// Grid cell
const cellClasses = {
  colShift: {
    none: "",
    "1/2": "lg:col-start-2",
    "1": "lg:col-start-3",
    "1 + 1/2": "lg:col-start-4",
    "2": "lg:col-start-5",
    "2 + 1/2": "lg:col-start-6",
    "3": "lg:col-start-7",
    "3 + 1/2": "lg:col-start-8",
  },
  colSpan: {
    "1/2": "col-span-1",
    "1": "col-span-2",
    "1 + 1/2": "col-span-3",
    "2": "col-span-4",
    "2 + 1/2": "col-span-4 lg:col-span-5",
    "3": "col-span-4 lg:col-span-6",
    "3 + 1/2": "col-span-4 lg:col-span-7",
    "4": "col-span-4 lg:col-span-8",
  },
  colSpanWithMobileFull: {
    "1/2": "col-span-4 lg:col-span-1",
    "1": "col-span-4 lg:col-span-2",
    "1 + 1/2": "col-span-4 lg:col-span-3",
    "2": "col-span-4",
    "2 + 1/2": "col-span-4 lg:col-span-5",
    "3": "col-span-4 lg:col-span-6",
    "3 + 1/2": "col-span-4 lg:col-span-7",
    "4": "col-span-4 lg:col-span-8",
  },
};

export function GridCell({
  colShift = "none",
  colSpan = "1",
  isFullOnMobile = false,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & {
  colShift?: "none" | "1/2" | "1" | "1 + 1/2" | "2" | "2 + 1/2" | "3" | "3 + 1/2";
  colSpan?: "1/2" | "1" | "1 + 1/2" | "2" | "2 + 1/2" | "3" | "3 + 1/2" | "4";
  isFullOnMobile?: boolean;
}) {
  return (
    <div
      {...props}
      className={clsx(
        isFullOnMobile ? cellClasses.colSpanWithMobileFull[colSpan] : cellClasses.colSpan[colSpan],
        cellClasses.colShift[colShift],
        props.className
      )}
    >
      {props.children}
    </div>
  );
}

// Grid horizontal line
type GridHorizontalLineProps = React.ComponentPropsWithoutRef<"div"> & {
  isFullScreen?: boolean;
  children?: never;
};

export function GridHorizontalLine({ isFullScreen = false, ...props }: GridHorizontalLineProps) {
  return (
    <div
      {...props}
      className={clsx("h-px bg-grid", isFullScreen ? "w-screen" : "w-full", props.className)}
    />
  );
}

type GridCrossProps = Omit<
  IconProps & {
    placement: "top-left" | "top-right" | "bottom-left" | "bottom-right";
    className?: string;
  },
  "size"
>;

const placmentClasses = {
  "top-left": "top-0 left-0 -translate-x-2.5 -translate-y-2.5",
  "top-right": "top-0 right-0 translate-x-2.5 -translate-y-2.5",
  "bottom-left": "bottom-0 left-0 -translate-x-2.5 translate-y-2.5",
  "bottom-right": "bottom-0 right-0 translate-x-2.5 translate-y-2.5",
};

export function GridCross({ placement = "top-left", ...props }: GridCrossProps) {
  return (
    <svg
      className={clsx(
        "absolute z-10 origin-center text-rich/30",
        placmentClasses[placement],
        props.className
      )}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="10" x2="10" y2="20" />
      <line x1="20" y1="10" y2="10" />
    </svg>
  );
}
