"use client";

import { BaseInput, BaseButton } from "@/components/Base";
import { useTranslations } from "next-intl";
import { FormEvent, useState } from "react";

interface Props {
  onSubmit: (nick: string) => void;
}

export default function CreateRoomForm({ onSubmit }: Props) {
  const t = useTranslations();

  const [nick, setNick] = useState("");
  const handleNickInput = (event: FormEvent<HTMLInputElement>) => {
    setNick(event.currentTarget.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit(nick);
  };

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
      <BaseButton className="w-full">{t("start")}</BaseButton>
    </form>
  );
}
