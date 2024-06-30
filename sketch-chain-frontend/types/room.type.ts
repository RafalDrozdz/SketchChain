export type RoomStatus = "WAITING_FOR_START" | "IN_PROGRESS" | "COMPLETED";

export interface Player {
  id: string;
  nick: string;
  avatarId: number;
  host: boolean;
}

export interface Room {
  id: string;
  host: Player;
  status: RoomStatus;
  players: Player[];
}

export interface RoomFormDto {
  nick: string;
  avatarId: number;
}
