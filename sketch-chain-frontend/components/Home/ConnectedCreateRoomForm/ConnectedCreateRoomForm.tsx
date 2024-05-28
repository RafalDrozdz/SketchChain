"use client";

import { CreateRoomForm } from "@/components/Forms";
import { useCreateRoom } from "@/hooks";

export default function ConnectedCreateRoomForm() {
  const { create, data, isError, isLoading } = useCreateRoom();

  return (
    <div>
      <CreateRoomForm
        onSubmit={create}
        loading={isLoading}
      />
    </div>
  );
}
