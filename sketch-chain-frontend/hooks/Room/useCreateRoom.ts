import { PLAYER_ID_COOKIE_NAME } from "@/constants";
import { useState } from "react";
import { useCookies } from "next-client-cookies";
import { socket } from "@/socket";
import { Room, RoomFormDto } from "@/types/room.type";

const useCreateRoom = () => {
  const [data, setData] = useState<Room | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const { set: setCookie, get: getCookie } = useCookies();

  const create = async (form: RoomFormDto): Promise<Room> => {
    let data: Room | null = null;
    const playerId = getCookie(PLAYER_ID_COOKIE_NAME);

    try {
      setIsError(false);
      setIsLoading(false);
      data = await socket.emitWithAck("create_room", { ...form, playerId });
      setData(data);
      setCookie(PLAYER_ID_COOKIE_NAME, data?.players.at(-1)?.id ?? "");
    } catch (error) {
      setIsError(true);
      throw new Error();
    } finally {
      setIsLoading(false);
    }

    return data!;
  };

  return { create, data, isLoading, isError };
};

export default useCreateRoom;
