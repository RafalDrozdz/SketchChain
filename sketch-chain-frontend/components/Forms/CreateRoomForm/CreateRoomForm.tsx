"use client";

import { BaseInput, BaseButton, BaseLoader } from "@/components/Base";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "next-intl";
import { FormEvent, useState } from "react";

interface Props {
  onSubmit: (nick: string) => void;
  loading?: boolean;
}

export default function CreateRoomForm({ onSubmit, loading = false }: Props) {
  const t = useTranslations();

  const [nick, setNick] = useState("");
  const handleNickInput = (event: FormEvent<HTMLInputElement>) => {
    setNick(event.currentTarget.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit(nick);
  };

  const loader = loading ? (
    <BaseLoader className="w-5" />
  ) : (
    <FontAwesomeIcon
      icon={faPlay}
      className="w-5"
    />
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full p-4">
      <BaseInput
        className="!w-full"
        placeholder={t("enterYourNick")}
        value={nick}
        onChange={handleNickInput}
      />
      <BaseButton
        id="create-game-btn"
        className="w-full">
        <span className="flex items-center justify-center gap-2">
          {loader}
          {t("start")}
        </span>
      </BaseButton>
    </form>
  );
}
