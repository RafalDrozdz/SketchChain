import { useEffect, useState } from "react";
import { RoomStatus } from "@/types/room.type";
import { socket } from "@/socket";
export default function useGame() {
  const [status, setStatus] = useState<RoomStatus>("WAITING_FOR_START");

  useEffect(() => {
    socket.on("game_started", () => {
      setStatus("IN_PROGRESS");
    });

    return () => {
      socket.removeListener("game_started");
    };
  }, []);

  return { status };
}
