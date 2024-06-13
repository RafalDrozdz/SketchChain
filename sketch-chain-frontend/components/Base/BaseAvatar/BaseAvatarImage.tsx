import { HtmlHTMLAttributes } from "react";
import classnames from "classnames";

interface Props extends HtmlHTMLAttributes<any> {
  src: string;
  className?: string;
}

export default function BaseAvatarImage({ src, className, ...props }: Props) {
  return (
    <span
      style={{ "--image-url": ` url(${src})` }}
      className={classnames(
        `absolute bg-[image:var(--image-url)] bg-center bg-no-repeat bg-contain h-full w-full top-0 left-0 z-`,
        className
      )}
      {...props}
    />
  );
}
