"use client";

import { CreateRoomForm } from "@/components";
import useCreateRoom from "@/hooks/Room/useCreateRoom";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ConnectedCreateRoomForm() {
  const t = useTranslations();
  const router = useRouter();
  const { create, isLoading, data } = useCreateRoom();

  const createRoom = async (nick: string) => {
    try {
      const { id } = await create(nick);
      router.push(`/room/${id}`);
    } catch (error) {
      toast.error(t("roomCreationFailed"), {
        position: "top-center",
      });
    }
  };

  return (
    <>
      <CreateRoomForm
        onSubmit={createRoom}
        loading={isLoading}
      />
    </>
  );
}
