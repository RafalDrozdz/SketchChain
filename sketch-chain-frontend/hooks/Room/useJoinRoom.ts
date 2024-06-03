import { gameService } from "@/services";
import { cookies } from "next/headers";

interface State {
  data: Room | null;
  isError: boolean;
}

const useJoinRoom = () => {
  const state: State = {
    data: null,
    isError: false,
  };

  const join = async (id: string) => {
    try {
      state.isError = false;
      const { data } = await gameService.post(`rooms/${id}`, {
        nick: "SnikSnikSnikSnik",
      });
      state.data = data;
      return state.data;
    } catch (error) {
      state.isError = true;
    }
  };

  return { join, ...state };
};

export default useJoinRoom;
