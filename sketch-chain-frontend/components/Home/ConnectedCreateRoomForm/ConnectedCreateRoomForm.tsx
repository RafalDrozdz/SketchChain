"use client";

import { CreateRoomForm } from "@/components/Forms";

export default function ConnectedCreateRoomForm() {
  const handleSubmit = (nick: string) => {};

  return <CreateRoomForm onSubmit={handleSubmit} />;
}
