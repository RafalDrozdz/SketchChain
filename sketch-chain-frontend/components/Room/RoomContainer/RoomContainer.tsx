import { RoomPlayers } from "@/components";
import RoomStartGameBtn from "../RoomStartGameBtn/RoomStartGameBtn";

export default async function RoomContainer({ id, host, players }: Room) {
  return (
    <main className="flex flex-col gap-6 p-4 items-center w-full min-h-[100vh] backdrop-blur">
      <RoomPlayers
        players={players}
        hostId={host.id}
      />
      <RoomStartGameBtn id={id} />
    </main>
  );
}
