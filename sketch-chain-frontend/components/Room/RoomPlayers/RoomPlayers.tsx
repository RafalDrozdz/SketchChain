"use client";

import { RoomPlayer } from "@/components";
import useRoomPlayers from "@/hooks/Room/useRoomPlayers";
import useLeavePageConfirm from "@/hooks/useLeavePageConfirm";
import { Player } from "@/types/room.type";

interface Props {
  players: Player[];
}

export default function RoomPlayers({ players }: Props) {
  useLeavePageConfirm();
  const { allPlayers } = useRoomPlayers(players);

  const playersComponents = allPlayers.map((player) => (
    <RoomPlayer
      {...player}
      key={player.id}
    />
  ));

  return (
    <div className="flex py-6 w-[calc(100%+2rem)] h-min overflow-y-auto">
      {playersComponents}
    </div>
  );
}
