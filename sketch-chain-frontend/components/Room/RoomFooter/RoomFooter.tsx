"use client";

import { RoomInviteBtn, RoomStartGameBtn, RoomWaitMessage } from "@/components";
interface Props {
  id: string;
  host: boolean;
}

export default function RoomFooter({ id, host }: Props) {
  if (!host) return <RoomWaitMessage />;

  return (
    <div className="flex gap-6 w-full flex-grow items-end py-4">
      <RoomInviteBtn id={id} />
      <RoomStartGameBtn id={id} />
    </div>
  );
}
