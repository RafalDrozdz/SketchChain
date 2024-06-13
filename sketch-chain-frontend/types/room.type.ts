export interface Player {
  id: string;
  nick: string;
  avatarId: number;
}

export interface Room {
  id: string;
  host: Player;
  players: Player[];
}

export interface RoomFormDto {
  nick: string;
  avatarId: number;
}
