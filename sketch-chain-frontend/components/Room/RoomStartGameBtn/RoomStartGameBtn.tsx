"use client";

import { BaseButton } from "@/components";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "next-intl";

interface Props {
  id: string;
}

export default function RoomStartGameBtn({ id }: Props) {
  const t = useTranslations();
  return (
    <BaseButton
      id="create-game-btn"
      className="w-full">
      <span className="flex items-center justify-center gap-2">
        <FontAwesomeIcon
          icon={faPlay}
          className="w-5"
        />
        {t("start")}
      </span>
    </BaseButton>
  );
}
