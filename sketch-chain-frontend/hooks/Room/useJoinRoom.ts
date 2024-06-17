import { PLAYER_ID_COOKIE_NAME } from "@/constants";
import { socket } from "@/socket";
import { BackendError } from "@/types/error.type";
import { Room, RoomFormDto } from "@/types/room.type";
import { checkIsBackendError } from "@/utils/error.utils";
import { useCookies } from "next-client-cookies";
import { useState } from "react";

interface State {
  data: Room | null;
  isError: boolean;
  isLoading: boolean;
}

const useJoinRoom = (roomId: string) => {
  const [isLoading, setIsLoading] = useState(false);

  const { set: setCookie, get: getCookie } = useCookies();

  const join = async (form: RoomFormDto): Promise<Room | BackendError> => {
    setIsLoading(true);

    const playerId = getCookie(PLAYER_ID_COOKIE_NAME);
    const data: Room | BackendError = await socket.emitWithAck("join_room", {
      ...form,
      roomId,
      playerId,
    });

    setIsLoading(false);

    if (checkIsBackendError(data)) throw data;
    else setCookie(PLAYER_ID_COOKIE_NAME, data?.players.at(-1)?.id ?? "");

    return data!;
  };

  return { join, isLoading };
};

export default useJoinRoom;
