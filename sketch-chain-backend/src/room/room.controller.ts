import { Controller, Get, Param } from '@nestjs/common';
import { RoomService } from './room.service';
import { plainToInstance } from 'class-transformer';
import { ResponseRoomDto } from './dto/response-room.dto';

@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get(':id')
  async get(@Param('id') roomId: string) {
    const room = await this.roomService.findOne(roomId);
    return plainToInstance(ResponseRoomDto, room);
  }
}
