import { JoinRoomForm } from "@/components";
import { ConnectedJoinRoomForm, RoomContainer } from "@/components/Room";
import { HOST_COOKIE_NAME, PLAYER_ID_COOKIE_NAME } from "@/constants";
import useJoinRoom from "@/hooks/Room/useJoinRoom";
import useRoom from "@/hooks/Room/useRoom";
import { cookies } from "next/headers";

interface Params {
  id: string;
}

interface Props {
  params: Params;
}

export default async function Room({ params: { id } }: Props) {
  const { fetch: fetchRoom } = useRoom();

  const cookieStore = cookies();
  const isHost = cookieStore.get(HOST_COOKIE_NAME)?.value === "true";
  const isJoined = !!cookieStore.get(PLAYER_ID_COOKIE_NAME)?.value;

  let data: Room | undefined;

  console.log(isJoined);

  if ([isHost, isJoined].includes(true)) {
    data = await fetchRoom(id);
  } else {
    return <ConnectedJoinRoomForm id={id} />;
  }

  return <RoomContainer {...data!} />;
}
``;
