"use client";

import { RoomForm } from "@/components";
import useCreateRoom from "@/hooks/Room/useCreateRoom";
import { RoomFormDto } from "@/types/room.type";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ConnectedCreateRoomForm() {
  const t = useTranslations();
  const router = useRouter();
  const { create, isLoading, data } = useCreateRoom();

  const createRoom = async (form: RoomFormDto) => {
    try {
      const { id } = await create(form);
      router.push(`/room/${id}`);
    } catch (error) {
      toast.error(t("roomCreationFailed"), {
        position: "top-center",
      });
    }
  };

  return (
    <RoomForm
      onSubmit={createRoom}
      loading={isLoading}>
      {t("start")}
    </RoomForm>
  );
}
