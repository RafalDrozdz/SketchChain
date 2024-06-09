import { RoomPlayers } from "@/components";
import RoomFooter from "../RoomFooter/RoomFooter";

export default async function RoomContainer({ id, host, players }: Room) {
  return (
    <main className="flex flex-col gap-6 p-4 items-center w-full min-h-[100vh] backdrop-blur md:w-[800px] md:h-[600px] md:min-h-[auto] md:bg-background-secondary xl:w-[1200px] xl:h-[800px] md:border-2 md:rounded-xl md:bg-opacity-60">
      <RoomPlayers
        players={players}
        hostId={host.id}
      />
      <RoomFooter id={id} />
    </main>
  );
}
