import { HOST_COOKIE_NAME } from "@/constants";
import { useState } from "react";
import { useCookies } from "next-client-cookies";
import { socket } from "@/socket";

interface State {
  data: Room | null;
  isError: boolean;
  isLoading: boolean;
}

const useCreateRoom = () => {
  const [state, setState] = useState<State>({
    data: null,
    isError: false,
    isLoading: false,
  });

  const { set: setCookie } = useCookies();

  const create = async (nick: string) => {
    try {
      setState({ ...state, isError: false, isLoading: true });
      const data = await socket.emitWithAck("create_room", { nick });
      setState({ ...state, data, isLoading: false });
      setCookie(HOST_COOKIE_NAME, "true");
      return data;
    } catch (error) {
      setState({ ...state, isError: true, isLoading: false });
      throw new Error();
    }
  };

  return { create, ...state };
};

export default useCreateRoom;
