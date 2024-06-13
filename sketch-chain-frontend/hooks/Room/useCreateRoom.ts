import { HOST_COOKIE_NAME } from "@/constants";
import { useState, useActionState } from "react";
import { useCookies } from "next-client-cookies";
import { socket } from "@/socket";
import { Room, RoomFormDto } from "@/types/room.type";

const useCreateRoom = () => {
  const [data, setData] = useState<Room | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const { set: setCookie } = useCookies();

  const create = async (form: RoomFormDto) => {
    let data;
    try {
      setIsError(false);
      setIsLoading(false);
      data = await socket.emitWithAck("create_room", form);
      setData(data);
      setCookie(HOST_COOKIE_NAME, "true");
    } catch (error) {
      setIsError(true);
      throw new Error();
    } finally {
      setIsLoading(false);
    }

    return data;
  };

  return { create, data, isLoading, isError };
};

export default useCreateRoom;
