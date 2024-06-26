import { PLAYER_ID_COOKIE_NAME } from "@/constants";
import { useState } from "react";
import { useCookies } from "next-client-cookies";
import { socket } from "@/socket";
import { Room, RoomFormDto } from "@/types/room.type";
import { checkIsBackendError } from "@/utils/error.utils";

const useCreateRoom = () => {
  const [data, setData] = useState<Room | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const { set: setCookie, get: getCookie } = useCookies();

  const create = async (form: RoomFormDto): Promise<Room> => {
    const playerId = getCookie(PLAYER_ID_COOKIE_NAME);

    setIsError(false);
    setIsLoading(true);
    const data = await socket.emitWithAck("create_room", { ...form, playerId });
    setData(data);
    setIsLoading(false);

    if (checkIsBackendError(data)) {
      setIsError(true);
      throw data;
    } else setCookie(PLAYER_ID_COOKIE_NAME, data?.players.at(-1)?.id ?? "");

    return data!;
  };

  return { create, data, isLoading, isError };
};

export default useCreateRoom;
