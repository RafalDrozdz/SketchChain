"use client";

import { BaseButton, BaseLoader } from "@/components";
import useStartGame from "@/hooks/Game/useStartGame";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "next-intl";

export default function RoomStartGameBtn() {
  const t = useTranslations();
  const { startGame, isLoading } = useStartGame();

  const loader = isLoading ? (
    <BaseLoader className="w-5" />
  ) : (
    <FontAwesomeIcon
      icon={faPlay}
      className="w-5"
    />
  );

  return (
    <BaseButton
      id="create-game-btn"
      className="w-full"
      onClick={startGame}>
      <span className="flex items-center justify-center gap-2">
        {loader}
        {t("start")}
      </span>
    </BaseButton>
  );
}
