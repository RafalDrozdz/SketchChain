import { Player } from 'src/player/player.entity';

export class PlayerDto {
  id: string;
  nick: string;

  constructor(player?: Player) {
    this.id = player.id;
    this.nick = player.nick;

    return this;
  }
}
