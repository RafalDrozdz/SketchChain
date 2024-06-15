import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Player } from './player.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ModifyPlayerDto } from './dto/modify-player.dto';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
  ) {}

  async start(modifyPlayerDto: ModifyPlayerDto): Promise<Player> {
    const { playerId } = modifyPlayerDto;
    let player: Player;

    if (playerId) {
      try {
        player = await this.update(playerId, modifyPlayerDto);
      } catch (error) {}
    }
    if (!player) {
      player = await this.create(modifyPlayerDto);
    }

    return player;
  }

  async create(modifyPlayerDto: ModifyPlayerDto): Promise<Player> {
    const createdPlayer = await this.playerRepository.create(modifyPlayerDto);
    return this.playerRepository.save(createdPlayer);
  }

  async update(id: string, modifyPlayerDto: ModifyPlayerDto) {
    const player = await this.playerRepository.preload({
      id,
      ...modifyPlayerDto,
    });

    if (!player) {
      throw new NotFoundException(`Player #${id} not found`);
    }

    return this.playerRepository.save(player);
  }

  async findOne(id: string): Promise<Player> {
    const player = await this.playerRepository.findOne({ where: { id } });
    if (!player) {
      throw new NotFoundException(`Player #${id} not found`);
    }
    return player;
  }
}
