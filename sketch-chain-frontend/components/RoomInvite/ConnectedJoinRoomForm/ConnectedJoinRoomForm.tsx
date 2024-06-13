"use client";

import RoomForm from "@/components/Forms/RoomForm/RoomForm";
import useJoinRoom from "@/hooks/Room/useJoinRoom";
import { RoomFormDto } from "@/types/room.type";
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

  const joinRoom = async (form: RoomFormDto): Promise<void> => {
    try {
      await join(form);
      router.push(`/room/${id}`);
    } catch (error) {
      toast.error(t("roomJoiningFailed"), {
        position: "top-center",
      });
    }
  };

  return (
    <RoomForm
      onSubmit={joinRoom}
      loading={isLoading}>
      {t("join")}
    </RoomForm>
  );
}
