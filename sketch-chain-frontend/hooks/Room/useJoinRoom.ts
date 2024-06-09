import { gameService } from "@/services";
import { useState } from "react";

interface State {
  data: Room | null;
  isError: boolean;
  isLoading: boolean;
}

const useJoinRoom = (id: string) => {
  const [state, setState] = useState<State>({
    data: null,
    isError: false,
    isLoading: false,
  });
  const join = async (nick: string): Promise<Room | undefined> => {
    try {
      setState({ ...state, isError: false, isLoading: false });
      const { data } = await gameService.post<Room>(`rooms/${id}`, {
        nick,
      });
      setState({ ...state, data, isLoading: false });
      return data;
    } catch (error) {
      setState({ ...state, isError: true, isLoading: false });
      state.isError = true;
    }
  };

  return { join, ...state };
};

export default useJoinRoom;
