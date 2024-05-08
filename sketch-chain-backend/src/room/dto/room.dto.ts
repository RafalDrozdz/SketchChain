import { Player } from 'src/player/player.entity';
import { Room } from '../room.entity';
import { PlayerDto } from 'src/player/dto/player.dto';

export class RoomDto {
  id: string;
  players: PlayerDto[];
  player: PlayerDto;

  constructor(room: Room) {
    this.id = room.id;
    this.players = room.players.map((player) => new PlayerDto(player));
    this.player = new PlayerDto(room.host);

    return this;
  }
}
