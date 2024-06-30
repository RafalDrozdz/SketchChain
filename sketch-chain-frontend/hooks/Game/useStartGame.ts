import { PLAYER_ID_COOKIE_NAME } from "@/constants";
import { useState } from "react";
import { useCookies } from "next-client-cookies";
import { socket } from "@/socket";
import { Room } from "@/types/room.type";
import { checkIsBackendError } from "@/utils/error.utils";

function useStartGame() {
  const [data, setData] = useState<Room | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const { get: getCookie } = useCookies();

  const startGame = async (roomId: string): Promise<Room> => {
    const playerId = getCookie(PLAYER_ID_COOKIE_NAME);

    setIsError(false);
    setIsLoading(true);
    const data = await socket.emitWithAck("start_game", { roomId, playerId });
    setData(data);
    setIsLoading(false);

    if (checkIsBackendError(data)) {
      setIsError(true);
      throw data;
    }

    return data!;
  };

  return { startGame, data, isLoading, isError };
}

export default useStartGame;
