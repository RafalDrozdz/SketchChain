import { gameService } from "@/services";
import { useState } from "react";

const useCreateRoom = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const create = async (nick: string) => {
    try {
      setIsError(false);
      setIsLoading(true);
      const { data } = await gameService.post("rooms", { nick });
      return data;
    } catch (error) {
      setIsError(true);
      throw new Error();
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, isError, create };
};

export default useCreateRoom;
