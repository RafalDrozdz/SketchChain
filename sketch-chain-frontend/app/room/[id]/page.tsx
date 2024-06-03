import { RoomContainer } from "@/components/Room";
import useJoinRoom from "@/hooks/Room/useJoinRoom";

interface Params {
  id: string;
}

interface Props {
  params: Params;
}

export default async function Room({ params: { id } }: Props) {
  const { join } = useJoinRoom();
  const data = await join(id);

  return <RoomContainer {...data!} />;
}
