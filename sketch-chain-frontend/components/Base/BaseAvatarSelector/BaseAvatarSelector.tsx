"use client";

import { AMOUNT_OF_AVATARS } from "@/constants";
import classnames from "classnames";
import { random } from "lodash";
import BaseAvatar from "../BaseAvatar/BaseAvatar";
import BaseAvatarImage from "../BaseAvatar/BaseAvatarImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

interface Props {
  className?: string;
  onClickLeft: () => void;
  onClickRight: () => void;
  src: string;
}

export default function BaseAvatarSelector({
  className,
  onClickLeft,
  onClickRight,
  src,
}: Props) {
  return (
    <div className={classnames("flex items-center ", className)}>
      <button
        type="button"
        className="block bg-background aspect-square rounded-full border-2 w-7"
        onClick={onClickLeft}>
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>
      <BaseAvatar>
        <BaseAvatarImage src={src} />
      </BaseAvatar>
      <button
        type="button"
        className="block bg-background aspect-square rounded-full border-2 w-7"
        onClick={onClickRight}>
        <FontAwesomeIcon icon={faAngleRight} />
      </button>
    </div>
  );
}
