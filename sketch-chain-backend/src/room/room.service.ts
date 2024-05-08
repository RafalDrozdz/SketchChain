import { Room } from './room.entity';
import { Player } from 'src/player/player.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { RoomDto } from './dto/room.dto';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
    private readonly dataSource: DataSource,
  ) {}

  async create(playerId: string) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const createdHost = this.playerRepository.create({ nick });
      const host = await queryRunner.manager.save(createdHost);
      const createdRoom = this.roomRepository.create({
        host,
        players: [host],
      });
      const room = await queryRunner.manager.save(createdRoom);
      await queryRunner.commitTransaction();
      return new RoomDto(room);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return error;
    } finally {
      await queryRunner.release();
    }
  }
}
