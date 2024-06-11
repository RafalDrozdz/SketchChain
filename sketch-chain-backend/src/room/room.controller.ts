import { Controller, Get, Param } from '@nestjs/common';
import { RoomService } from './room.service';

@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get(':id')
  get(@Param('id') roomId: string) {
    return this.roomService.findOne(roomId);
  }
}
