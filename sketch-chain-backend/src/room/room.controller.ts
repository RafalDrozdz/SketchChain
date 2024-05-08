import { Body, Controller, Post, Req } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { PlayerId } from 'src/player/player-id.decorator';

@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  create(@Body() body: CreateRoomDto, @PlayerId() id: string) {
    return this.roomService.create(body);
  }
}
