"use client";

import { RoomPlayer } from "@/components";
import { Player } from "@/types/room.type";

interface Props {
  players: Player[];
}

export default function RoomPlayers({ players }: Props) {
  const playersComponents = players.map((player) => (
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
