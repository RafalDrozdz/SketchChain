import { HtmlHTMLAttributes } from "react";
import classnames from "classnames";

interface Props extends HtmlHTMLAttributes<any> {
  children?: React.ReactNode;
  className?: string;
}

export default function BaseAvatar({ children, className, ...props }: Props) {
  return (
    <span
      className={classnames(
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}>
      {children}
    </span>
  );
}
