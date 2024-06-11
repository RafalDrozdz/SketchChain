import { Player } from 'src/player/player.entity';
import { Room } from 'src/room/room.entity';

export interface ServerToClientEvents {
  message: (payload: string) => void;
  created_room: (payload: Room) => void;
  joined_room: (payload: Player) => void;
  game_started: () => void;
}
