"use client";

import { RoomPlayer } from "@/components";
import { socket } from "@/socket";
import { Player } from "@/types/room.type";
import { useEffect, useState } from "react";

interface Props {
  players: Player[];
  hostId: string;
}

export default function RoomPlayers({ players, hostId }: Props) {
  const [allPlayers, setAddedPlayers] = useState<Player[]>(players);

  useEffect(() => {
    socket.on("joined_room", (player: Player) => {
      setAddedPlayers((prev) => [...prev, player]);
    });

    return () => {
      socket.removeListener("joined_room");
    };
  }, []);

  const playersComponents = allPlayers.map((player) => (
    <RoomPlayer
      {...player}
      host={hostId === player.id}
      key={player.id}
    />
  ));

  return (
    <div className="flex py-6 w-[calc(100%+2rem)] h-min overflow-y-auto">
      {playersComponents}
    </div>
  );
}
