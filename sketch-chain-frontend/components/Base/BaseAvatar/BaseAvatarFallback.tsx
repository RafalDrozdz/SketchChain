import { HtmlHTMLAttributes } from "react";
import classnames from "classnames";

interface Props extends HtmlHTMLAttributes<any> {
  children?: React.ReactNode;
  className?: string;
}

export default function BaseAvatarFallback({
  children,
  className,
  ...props
}: Props) {
  return (
    <span
      className={classnames(
        "flex items-center justify-center font-semibold h-full w-full bg-[blue] text-background",
        className
      )}
      {...props}>
      {children}
    </span>
  );
}
