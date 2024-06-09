"use client";

import { JoinRoomForm } from "@/components";
import useJoinRoom from "@/hooks/Room/useJoinRoom";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Props {
  id: string;
}

export default function ConnectedJoinRoomForm({ id }: Props) {
  const t = useTranslations();
  const router = useRouter();

  const { join, isLoading } = useJoinRoom(id);

  const joinRoom = async (nick: string) => {
    try {
      await join(nick);
      router.push(`/room/${id}`);
    } catch (error) {
      toast.error(t("roomJoiningFailed"), {
        position: "top-center",
      });
    }
  };

  return (
    <JoinRoomForm
      onSubmit={joinRoom}
      loading={isLoading}
    />
  );
}
