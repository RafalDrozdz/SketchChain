import { useState } from "react";
import { socket } from "@/socket";
import { Room } from "@/types/room.type";
import { checkIsBackendError } from "@/utils/error.utils";

function useStartGame() {
  const [data, setData] = useState<Room | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const startGame = async (): Promise<Room> => {
    setIsError(false);
    setIsLoading(true);
    const data = await socket.emitWithAck("start_game");
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
