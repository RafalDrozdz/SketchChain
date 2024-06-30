"use client";

import { Room } from "@/types/room.type";
import { RoomContent } from "../RoomContent";
import useGame from "@/hooks/Game/useGame";
import { GameContent } from "@/components/Game";
import useLeavePageConfirm from "@/hooks/useLeavePageConfirm";
import useRoomPlayers from "@/hooks/Room/useRoomPlayers";

export default function RoomContainer(room: Room) {
  useLeavePageConfirm();
  const { status } = useGame();
  const { players } = useRoomPlayers(room.players);

  const content =
    status === "IN_PROGRESS" ? (
      <GameContent />
    ) : (
      <RoomContent
        {...room}
        players={players}
      />
    );

  return (
    <main className="flex flex-col gap-6 p-4 items-center w-full min-h-[100vh] backdrop-blur md:w-[800px] md:h-[600px] md:min-h-[auto] md:bg-background-secondary xl:w-[1200px] xl:h-[800px] md:border-2 md:rounded-xl md:bg-opacity-60">
      {content}
    </main>
  );
}
