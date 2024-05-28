import { gameService } from "@/services";
import { useState } from "react";

const useCreateRoom = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState(null);

  const create = async (nick: string) => {
    try {
      setIsError(false);
      setIsLoading(true);
      const { data } = await gameService.post("rooms", { nick });
      setData(data);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, isError, data, create };
};

export default useCreateRoom;
