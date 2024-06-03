import { RoomPlayer } from "@/components";

interface Props {
  players: Player[];
  hostId: string;
}

export default async function RoomPlayers({ players, hostId }: Props) {
  const playersComponents = players.map((player) => (
    <RoomPlayer
      {...player}
      host={hostId === player.id}
      key={player.id}
    />
  ));
  return (
    <div className="flex py-6 w-[calc(100%+2rem)] h-min overflow-y-auto backdrop-blur">
      {playersComponents}
    </div>
  );
}
