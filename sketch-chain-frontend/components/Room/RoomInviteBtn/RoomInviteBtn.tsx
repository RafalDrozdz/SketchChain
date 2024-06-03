"use client";

import { BaseButton, BaseLoader } from "@/components/Base";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

interface Props {
  id: string;
}

export default function RoomInviteBtn({ id }: Props) {
  const t = useTranslations();

  const copyLink = () => {
    const link = window.location.origin;
    const url = `${link}/room/${id}`;
    try {
      navigator.clipboard.writeText(url);
      toast.success(t("linkCopied"), {
        position: "top-center",
      });
    } catch (error) {
      toast.error(t("failedToCopyLink"), {
        position: "top-center",
      });
    }
  };

  return (
    <BaseButton
      id="create-game-btn"
      className="w-full"
      variant="ghost"
      onClick={copyLink}>
      <span className="flex items-center justify-center gap-2">
        <FontAwesomeIcon
          icon={faLink}
          className="w-5"
        />
        {t("invite")}
      </span>
    </BaseButton>
  );
}
