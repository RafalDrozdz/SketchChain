import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classnames from "classnames";

interface Props {
  className?: string;
}

export default function BaseLoader({ className }: Props) {
  return (
    <FontAwesomeIcon
      className={classnames("animate-spin", className)}
      icon={faSpinner}
    />
  );
}
