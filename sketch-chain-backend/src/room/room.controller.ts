import { Body, Controller, Param, Post, Res } from '@nestjs/common';
import { RoomService } from './room.service';
import { PlayerId } from 'src/player/player-id.decorator';
import { ModifyPlayerDto } from 'src/player/dto/modify-player.dto';
import { Response } from 'express';
import { PLAYER_ID } from 'src/constants/cookies.constants';

@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  async create(
    @Body() modifyPlayerDto: ModifyPlayerDto,
    @PlayerId() playerId: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const room = await this.roomService.create(modifyPlayerDto, playerId);
    response.cookie(PLAYER_ID, room.host.id, { httpOnly: true });
    return room;
  }

  @Post(':id')
  async join(
    @Param('id') roomId: string,
    @Body() modifyPlayerDto: ModifyPlayerDto,
    @PlayerId() playerId: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const room = await this.roomService.join(modifyPlayerDto, roomId, playerId);
    response.cookie(PLAYER_ID, room.players.at(-1).id, {
      httpOnly: true,
    });
    return room;
  }
}
