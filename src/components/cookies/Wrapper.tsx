import clsx from "clsx";

export const styles = {
  base: "mx-auto block w-[calc(100%-2.5rem)] sm:w-[calc(100%-4rem)] lg:w-[calc(100%-6rem)] 2xl:sm:w-[calc(100%-8rem)]",
  variants: {
    size: {
      default: "max-w-[90rem]",
      prose: "max-w-prose",
      fluid: "",
    },
    whitespace: {
      none: "",
      sm: "py-12 sm:py-14 xl:py-24",
      md: "py-16 sm:py-24 xl:py-32",
      lg: "py-24 sm:py-36 xl:py-44",
      "-/sm": "pt-0 pb-12 sm:pt-0 sm:pb-14 xl:pt-0 xl:pb-24",
      "-/md": "pt-0 pb-16 sm:pt-0 sm:pb-24 xl:pt-0 xl:pb-36",
      "-/lg": "pt-0 pb-24 sm:pt-0 sm:pb-36 xl:pt-0 xl:pb-44",
      "sm/-": "pt-12 pb-0 sm:pt-14 sm:pb-0 xl:pt-24 xl:pb-0",
      "md/-": "pt-16 pb-0 sm:pt-24 sm:pb-0 xl:pt-36 xl:pb-0",
      "lg/-": "pt-24 pb-0 sm:pt-36 sm:pb-0 xl:pt-44 xl:pb-0",
      "sm/md": "pt-12 pb-16 sm:pt-14 sm:pb-24 xl:pt-24 xl:pb-36",
      "sm/lg": "pt-12 pb-24 sm:pt-14 sm:pb-36 xl:pt-24 xl:pb-44",
      "md/sm": "pt-16 pb-12 sm:pt-24 sm:pb-14 xl:pt-36 xl:pb-24",
      "md/lg": "pt-16 pb-24 sm:pt-24 sm:pb-36 xl:pt-36 xl:pb-44",
      "lg/sm": "pt-24 pb-12 sm:pt-36 sm:pb-14 xl:pt-44 xl:pb-24",
      "lg/md": "pt-24 pb-16 sm:pt-36 sm:pb-24 xl:pt-44 xl:pb-36",
    },
  },
};

type WrapperStyleProps = {
  size?: keyof typeof styles.variants.size;
  whitespace?: keyof typeof styles.variants.whitespace;
};

type WrapperProps<E extends React.ElementType = "div"> = WrapperStyleProps & {
  children: React.ReactNode;
  as?: E | keyof JSX.IntrinsicElements;
  className?: string;
};

type ElementTypeProps<E extends React.ElementType> = WrapperProps<E> &
  Omit<React.ComponentProps<E>, keyof WrapperProps<E>>;

export default function Wrapper<E extends React.ElementType = "div">({
  children,
  as,
  size = "default",
  whitespace = "none",
  className = "",
  ...props
}: ElementTypeProps<E>) {
  const AsElement = as || "div";

  return (
    <AsElement
      {...props}
      className={clsx(
        styles.base,
        styles.variants.size[size],
        styles.variants.whitespace[whitespace],
        className
      )}
    >
      {children}
    </AsElement>
  );
}
