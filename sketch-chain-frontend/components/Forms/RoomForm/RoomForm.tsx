"use client";

import {
  BaseInput,
  BaseButton,
  BaseLoader,
  BaseAvatarSelector,
} from "@/components";
import { AMOUNT_OF_AVATARS } from "@/constants";
import { RoomFormDto } from "@/types/room.type";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { random } from "lodash";
import { useTranslations } from "next-intl";
import { FormEvent, useState } from "react";

interface Props {
  onSubmit: (form: RoomFormDto) => void;
  loading?: boolean;
  children?: React.ReactNode;
}

export default function RoomForm({
  onSubmit,
  loading = false,
  children,
}: Props) {
  const t = useTranslations();

  const [form, setForm] = useState({
    nick: "",
    avatarId: 1,
  });

  const handleNickInput = (event: FormEvent<HTMLInputElement>) => {
    setForm({ ...form, nick: event.currentTarget.value });
  };

  const handleAvatarSelection = (avatarId: number) => {
    if (avatarId > AMOUNT_OF_AVATARS) avatarId = 1;
    else if (!avatarId) avatarId = AMOUNT_OF_AVATARS;

    setForm({ ...form, avatarId });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log("send", form);

    onSubmit(form);
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
      className="grid grid-cols-[max-content_1fr] gap-4 w-full p-4 items-center">
      <BaseAvatarSelector
        src={`/images/avatars/${form.avatarId}.svg`}
        onClickLeft={() => handleAvatarSelection(form.avatarId - 1)}
        onClickRight={() => handleAvatarSelection(form.avatarId + 1)}
      />
      <BaseInput
        id="nick-input"
        className="!w-full"
        placeholder={t("enterYourNick")}
        value={form.nick}
        onChange={handleNickInput}
      />
      <BaseButton
        id="game-btn"
        className="w-full col-span-2">
        <span className="flex items-center justify-center gap-2">
          {loader}
          {children}
        </span>
      </BaseButton>
    </form>
  );
}
