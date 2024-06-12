import { RoomContainer } from "@/components";
import useRoom from "@/hooks/Room/useRoom";

interface Params {
  id: string;
}

interface Props {
  params: Params;
}

export default async function Room({ params: { id } }: Props) {
  const { fetch: fetchRoom } = useRoom();
  const room = await fetchRoom(id);

  return <RoomContainer {...room!} />;
}
