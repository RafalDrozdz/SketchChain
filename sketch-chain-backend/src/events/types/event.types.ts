import { ResponsePlayerDto } from 'src/player/dto/response-player.dto';
import { ResponseRoomDto } from 'src/room/dto/response-room.dto';

export interface ServerToClientEvents {
  message: (payload: string) => void;
  created_room: (payload: ResponseRoomDto) => void;
  joined_room: (payload: ResponsePlayerDto) => void;
  game_started: () => void;
  left_room: (playerId: string) => void;
  host: (playerId: string) => void;
  step: (payload: any) => void;
}
