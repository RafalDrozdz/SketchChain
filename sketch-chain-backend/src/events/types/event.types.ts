import { Room } from 'src/room/room.entity';

export interface ServerToClientEvents {
  message: (payload: string) => void;
  joined_room: (payload: Room) => void;
  game_started: () => void;
}
