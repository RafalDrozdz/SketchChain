import { Body, Controller, Post } from '@nestjs/common';
import { PlayerId } from './player-id.decorator';
import { PlayerService } from './player.service';
import { ModifyPlayerDto } from './dto/modify-player.dto';

@Controller('players')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post()
  start(@Body() playerDto: ModifyPlayerDto, @PlayerId() playerId: string) {
    return this.playerService.start(playerDto, playerId);
  }
}
