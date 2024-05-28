import classnames from "classnames";
import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<any> {
  className?: string;
}

export default function BaseInput({
  className,
  type = "text",
  ...props
}: Props) {
  return (
    <div
      className={classnames(
        "relative w-min h-min after:content-[''] after:absolute after:w-full after:h-full after:top-0 after:left-0 after:rounded-3xl after:shadow-input",
        className
      )}>
      <input
        type={type}
        {...props}
        className="relative w-full py-2 px-4 rounded-3xl bg-background border-2 transition focus:translate-y-1 z-10"
      />
    </div>
  );
}
