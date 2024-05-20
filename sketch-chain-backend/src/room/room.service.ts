import { Room } from './room.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
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

  async create(
    modifyPlayerDto: ModifyPlayerDto,
    playerId?: string,
  ): Promise<Room> {
    const host = await this.playerService.start(modifyPlayerDto, playerId);
    const createdRoom = this.roomRepository.create({
      host,
      players: [host],
    });
    return this.roomRepository.save(createdRoom);
  }

  async join(
    modifyPlayerDto: ModifyPlayerDto,
    roomId: string,
    playerId?: string,
  ): Promise<Room> {
    const createdPlayer = await this.playerService.start(
      modifyPlayerDto,
      playerId,
    );
    const room = await this.findOne(roomId);
    const isPlayerAlready: boolean = room.players.some(
      (player) => player.id === createdPlayer.id,
    );

    if (!isPlayerAlready) {
      room.players.push(createdPlayer);
    }

    return this.roomRepository.save(room);
  }

  async findOne(id: string): Promise<Room> {
    const room = await this.roomRepository.findOne({
      where: { id },
      relations: ['players'],
    });
    if (!room) {
      throw new NotFoundException(`Room #${id} not found`);
    }
    return room;
  }
}
