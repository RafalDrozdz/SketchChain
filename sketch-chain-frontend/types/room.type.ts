export interface Player {
  id: string;
  nick: string;
  avatarId: number;
  host: boolean;
}

export interface Room {
  id: string;
  players: Player[];
}

export interface RoomFormDto {
  nick: string;
  avatarId: number;
}
