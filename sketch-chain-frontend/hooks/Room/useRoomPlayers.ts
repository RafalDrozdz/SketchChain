import { useEffect, useState } from "react";
import { Player } from "@/types/room.type";
import { socket } from "@/socket";
export default function useRoomPlayers(initialValue: Player[] = []) {
  const [players, setPlayers] = useState<Player[]>(initialValue);

  useEffect(() => {
    socket.on("joined_room", (player: Player) => {
      setPlayers((prev) => [...prev, player]);
    });

    socket.on("host", (playerId: string) => {
      setPlayers((prev) =>
        prev.map((player) => ({ ...player, host: player.id === playerId }))
      );
    });

    socket.on("left_room", (playerId: string) => {
      setPlayers((prev) => prev.filter((player) => player.id !== playerId));
    });

    return () => {
      socket.removeListener("joined_room");
      socket.removeListener("left_room");
    };
  }, []);

  return { players };
}
