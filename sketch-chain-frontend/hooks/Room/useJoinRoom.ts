import { socket } from "@/socket";
import { Room, RoomFormDto } from "@/types/room.type";
import { useCookies } from "next-client-cookies";
import { useState } from "react";

interface State {
  data: Room | null;
  isError: boolean;
  isLoading: boolean;
}

const useJoinRoom = (roomId: string) => {
  const [data, setData] = useState<Room | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const { set: setCookies } = useCookies();

  const join = async (form: RoomFormDto): Promise<Room | undefined> => {
    let data;

    try {
      setIsError(false);
      setIsLoading(true);
      data = await socket.emitWithAck("join_room", { ...form, roomId });
      setData(data);
      setCookies("player_id", data.players.at(-1).id);
    } catch (error) {
      setIsError(true);
      throw new Error();
    } finally {
      setIsLoading(false);
    }

    return data;
  };

  return { join, data, isLoading, isError };
};

export default useJoinRoom;
