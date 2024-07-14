"use client";

import { RoomPlayers, RoomFooter } from "@/components";
import { PLAYER_ID_COOKIE_NAME } from "@/constants";
import { Room } from "@/types/room.type";
import { useCookies } from "next-client-cookies";

export default function RoomContent({ id, players }: Room) {
  const { get: getCookies } = useCookies();
  const playerId = getCookies(PLAYER_ID_COOKIE_NAME);
  const isHost = !!players.find((player) => player.id === playerId)?.host;

  return (
    <>
      <RoomPlayers players={players} />
      <RoomFooter
        id={id}
        host={isHost}
      />
    </>
  );
}
