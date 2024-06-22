import useRoom from "@/hooks/Room/useRoom";

import { RoomContainer } from "@/components";
import { AxiosError } from "axios";
import { constants } from "http2";
import { notFound } from "next/navigation";

interface Params {
  id: string;
}

interface Props {
  params: Params;
}

export default async function Room({ params: { id } }: Props) {
  const { fetch: fetchRoom } = useRoom();
  try {
    const room = await fetchRoom(id);
    return <RoomContainer {...room!} />;
  } catch (error) {
    if (
      error instanceof AxiosError &&
      error.response?.status === constants.HTTP_STATUS_NOT_FOUND
    ) {
      notFound();
    }
  }
}
