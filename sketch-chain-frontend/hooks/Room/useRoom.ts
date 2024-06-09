import { gameService } from "@/services";

interface State {
  data: Room | null;
  isError: boolean;
}

const useRoom = () => {
  "use sever";

  const state: State = {
    data: null,
    isError: false,
  };

  const fetch = async (id: string): Promise<Room | undefined> => {
    try {
      state.isError = false;
      const { data } = await gameService.get<Room>(`rooms/${id}`);
      state.data = data;
      return state.data;
    } catch (error) {
      state.isError = true;
    }
  };

  return { fetch, ...state };
};

export default useRoom;
