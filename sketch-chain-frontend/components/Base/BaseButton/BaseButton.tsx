import classnames from "classnames";
import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<any> {
  children?: React.ReactNode;
  loading?: boolean;
  className?: string;
}

export default function BaseButton({ children, className, ...props }: Props) {
  return (
    <button
      {...props}
      className={classnames(
        "group relative py-2 px-6 rounded-3xl text-background shadow-input after:content-[''] after:absolute after:w-full after:h-full after:bg-primary after:top-0 after:left-0 after:rounded-3xl after:active:translate-y-1 after:transition font-semibold",
        className
      )}>
      <span className="relative block z-10 group-active:translate-y-1 transition">
        {children}
      </span>
    </button>
  );
}
