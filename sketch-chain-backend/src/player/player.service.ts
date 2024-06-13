import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Player } from './player.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ModifyPlayerDto } from './dto/modify-player.dto';
import { modifyPlayerDtoMock } from '../test/mocks/player.mock';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
  ) {}

  async start(playerDto: ModifyPlayerDto, id?: string): Promise<Player> {
    let player: Player;

    if (id) {
      try {
        player = await this.update(id, playerDto);
      } catch (error) {}
    }
    if (!player) {
      player = await this.create(playerDto);
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
