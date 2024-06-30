"use client";

import { BaseButton, BaseLoader } from "@/components";
import useStartGame from "@/hooks/Game/useStartGame";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "next-intl";

interface Props {
  id: string;
}

export default function RoomStartGameBtn({ id }: Props) {
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
      onClick={() => startGame(id)}>
      <span className="flex items-center justify-center gap-2">
        {loader}
        {t("start")}
      </span>
    </BaseButton>
  );
}
