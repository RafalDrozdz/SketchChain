import { Room } from './room.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlayerService } from 'src/player/player.service';
import { ModifyPlayerDto } from '../player/dto/modify-player.dto';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
    private readonly playerService: PlayerService,
  ) {}

  async create(modifyPlayerDto: ModifyPlayerDto, playerId: string) {
    const host = await this.playerService.start(modifyPlayerDto, playerId);
    const createdRoom = this.roomRepository.create({
      host,
      players: [host],
    });
    return this.roomRepository.save(createdRoom);
  }
}
