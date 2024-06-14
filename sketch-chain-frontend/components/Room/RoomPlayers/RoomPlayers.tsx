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
  const [allPlayers, setAllPlayers] = useState<Player[]>(players);

  useEffect(() => {
    socket.on("joined_room", (player: Player) => {
      setAllPlayers((prev) => [...prev, player]);
    });

    socket.on("left_room", (playerId: string) => {
      setAllPlayers((prev) => prev.filter((player) => player.id !== playerId));
    });

    return () => {
      socket.removeListener("joined_room");
      socket.removeListener("left_room");
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
