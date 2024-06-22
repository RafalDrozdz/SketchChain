import { useEffect, useState } from "react";
import { Player } from "@/types/room.type";
import { socket } from "@/socket";
export default function useRoomPlayers(players: Player[] = []) {
  const [allPlayers, setAllPlayers] = useState<Player[]>(players);

  useEffect(() => {
    socket.on("joined_room", (player: Player) => {
      setAllPlayers((prev) => [...prev, player]);
    });

    socket.on("host", (playerId: string) => {
      setAllPlayers((prev) =>
        prev.map((player) => ({ ...player, host: player.id === playerId }))
      );
    });

    socket.on("left_room", (playerId: string) => {
      setAllPlayers((prev) => prev.filter((player) => player.id !== playerId));
    });

    return () => {
      socket.removeListener("joined_room");
      socket.removeListener("left_room");
    };
  }, []);

  return { allPlayers };
}
