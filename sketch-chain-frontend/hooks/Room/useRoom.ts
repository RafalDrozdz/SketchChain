import { gameService } from "@/services";
import { Room } from "@/types/room.type";
import { AxiosError } from "axios";

const useRoom = () => {
  "use sever";

  const fetch = async (id: string): Promise<Room | undefined> => {
    try {
      const { data } = await gameService.get(`rooms/${id}`);
      return data;
    } catch (error) {
      throw error;
    }
  };

  return { fetch };
};

export default useRoom;
