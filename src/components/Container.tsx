import clsx from "clsx";

const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={clsx(
        "mx-auto max-w-6xl px-2 sm:px-3 md:px-4 lg:px-8 xl:px-12 py-3 sm:py-4 md:py-6 text-white",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Container;
