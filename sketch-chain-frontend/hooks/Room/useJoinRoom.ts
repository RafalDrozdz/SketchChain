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
  const { set: setCookies } = useCookies();

  const [state, setState] = useState<State>({
    data: null,
    isError: false,
    isLoading: false,
  });
  const join = async (form: RoomFormDto): Promise<Room | undefined> => {
    try {
      setState({ ...state, isError: false, isLoading: true });
      const data = await socket.emitWithAck("join_room", { ...form, roomId });
      setState({ ...state, data, isLoading: false });
      setCookies("player_id", data.players.at(-1).id);
      return data;
    } catch (error) {
      setState({ ...state, isError: true, isLoading: false });
      state.isError = true;
    }
  };

  return { join, ...state };
};

export default useJoinRoom;
