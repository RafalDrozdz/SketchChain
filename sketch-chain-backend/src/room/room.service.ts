import { Room } from './room.entity';
import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlayerService } from 'src/player/player.service';
import { ModifyPlayerDto } from '../player/dto/modify-player.dto';
import { StartGameDto } from './dto/start-game.dto';

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

  async leave(roomId: string, playerId: string) {
    const room = await this.findOne(roomId);
    room.players = room.players.filter((player) => player.id !== playerId);
    return this.roomRepository.save(room);
  }

  async findOne(id: string): Promise<Room> {
    const room = await this.roomRepository.findOne({
      where: { id },
      relations: ['players', 'host'],
    });
    if (!room) {
      throw new NotFoundException(`Room #${id} not found`);
    }
    return room;
  }

  async startGame(startGameDto: StartGameDto): Promise<Room> {
    const { playerId, roomId } = startGameDto;
    const room = await this.roomRepository.preload({
      id: roomId,
      status: 'in-progress',
    });

    if (!room) {
      throw new NotFoundException(`Room #${roomId} not found`);
    }

    if (playerId !== room.host.id) {
      throw new ForbiddenException(
        `Player #${playerId} is not a host of #${room.id} room`,
      );
    }

    return this.roomRepository.save(room);
  }
}
