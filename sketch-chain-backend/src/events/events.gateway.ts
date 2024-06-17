import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ServerToClientEvents } from './types/event.types';
import { RoomService } from 'src/room/room.service';
import { StartGameDto } from '../room/dto/start-game.dto';
import { JoinRoomDto } from 'src/room/dto/join-room.dto';
import { ConnectionService } from 'src/connection/connection.service';
import { CreateRoomDto } from 'src/room/dto/create-room.dto';
import { plainToInstance } from 'class-transformer';
import { ResponseRoomDto } from 'src/room/dto/response-room.dto';
import { ResponsePlayerDto } from 'src/player/dto/response-player.dto';

@WebSocketGateway({ namespace: 'events', cors: true })
export class EventsGateway {
  @WebSocketServer()
  server: Server<unknown, ServerToClientEvents>;

  constructor(
    private readonly roomService: RoomService,
    private readonly connectionService: ConnectionService,
  ) {}

  @SubscribeMessage('create_room')
  async createRoom(
    client: Socket,
    payload: CreateRoomDto,
  ): Promise<ResponseRoomDto> {
    const room = await this.roomService.create(payload);

    await this.connectionService.create({
      socketId: client.id,
      playerId: room.host.id,
      roomId: room.id,
    });

    client.join(room.id);

    const websocketRoom = this.server.to(room.id);
    const responseRoomDto = plainToInstance(ResponseRoomDto, room);

    websocketRoom.emit('created_room', responseRoomDto);
    client.on('disconnecting', () => this.handleDisconnectFromRoom(client.id));

    return responseRoomDto;
  }

  @SubscribeMessage('join_room')
  async joinRoom(
    client: Socket,
    payload: JoinRoomDto,
  ): Promise<ResponseRoomDto> {
    const { roomId } = payload;
    try {
      const room = await this.roomService.join(payload);
      console.log(room);
      const createdPlayer = room.players.at(-1);

      await this.connectionService.create({
        socketId: client.id,
        playerId: room.players.at(-1).id,
        roomId: room.id,
      });

      client.join(room.id);

      const websocketRoom = this.server.to(roomId);

      websocketRoom.emit(
        'joined_room',
        plainToInstance(ResponsePlayerDto, createdPlayer),
      );

      client.on('disconnecting', () =>
        this.handleDisconnectFromRoom(client.id),
      );

      return plainToInstance(ResponseRoomDto, room);
    } catch (error) {
      return error;
    }
  }

  @SubscribeMessage('start_game')
  async startGame(_client: Socket, payload: StartGameDto): Promise<void> {
    const { roomId } = payload;
    const websocketRoom = this.server.to(roomId);
    await this.roomService.startGame(payload);
    websocketRoom.emit('game_started');
  }

  async handleDisconnectFromRoom(socketId: string): Promise<void> {
    const { playerId, roomId } = await this.connectionService.findOne(socketId);
    const room = await this.roomService.leave(roomId, playerId);
    const websocketRoom = this.server.to(roomId);
    websocketRoom.emit('left_room', playerId);
    websocketRoom.emit('host', room.host.id);
  }
}
