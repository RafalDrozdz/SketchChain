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
import { StartGameDto } from './dto/start-game.dto';
import { JoinRoomDto } from './dto/join-room.dto';
import { CreateRoomDto } from './dto/create-room.dto';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
    private readonly playerService: PlayerService,
  ) {}

  async create(createRoomDto: CreateRoomDto): Promise<Room> {
    const host = await this.playerService.start(createRoomDto);
    const createdRoom = this.roomRepository.create({
      host,
      players: [host],
    });

    return this.roomRepository.save(createdRoom);
  }

  async join(joinRoomDto: JoinRoomDto): Promise<Room> {
    const { roomId, ...modifyPlayerDto } = joinRoomDto;

    const createdPlayer = await this.playerService.start(modifyPlayerDto);
    const room = await this.findOne(roomId);

    const isPlayerAlready: boolean = room.players.some(
      (player) => player.id === createdPlayer.id,
    );

    if (!isPlayerAlready) room.players.push(createdPlayer);
    else {
      throw new ConflictException(
        `Player #${createdPlayer.id} already in room #${roomId}`,
      );
    }

    return this.roomRepository.save(room);
  }

  async leave(roomId: string, playerId: string) {
    const room = await this.findOne(roomId);

    const player = room.players.find((player) => player.id === playerId);

    room.players = room.players.filter((player) => player.id !== playerId);

    if (!room.players.length) {
      return this.roomRepository.remove(room);
    } else if (player.id === room.host.id) {
      room.host = room.players[0];
    }

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
    const room = await this.findOne(roomId);

    room.status = 'IN_PROGRESS';

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
