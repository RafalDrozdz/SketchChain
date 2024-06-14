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
import { CreateRoomDto } from 'src/room/dto/create-room.dto';
import { ConnectionService } from 'src/connection/connection.service';
import { Room } from 'src/room/room.entity';

@WebSocketGateway({ namespace: 'events', cors: true })
export class EventsGateway {
  @WebSocketServer()
  server: Server<unknown, ServerToClientEvents>;

  constructor(
    private readonly roomService: RoomService,
    private readonly connectionService: ConnectionService,
  ) {}

  @SubscribeMessage('create_room')
  async createRoom(client: Socket, payload: CreateRoomDto): Promise<Room> {
    const room = await this.roomService.create(payload);

    await this.connectionService.create({
      socketId: client.id,
      playerId: room.host.id,
      roomId: room.id,
    });

    client.join(room.id);
    const websocketRoom = this.server.to(room.id);
    websocketRoom.emit('created_room', room);

    client.on('disconnecting', () => {
      this.handleDisconnectFromRoom(client);
    });
    return room;
  }

  @SubscribeMessage('join_room')
  async joinRoom(client: Socket, payload: JoinRoomDto): Promise<Room> {
    const { nick, avatarId, roomId, playerId } = payload;
    const room = await this.roomService.join(
      { nick, avatarId },
      roomId,
      playerId,
    );

    await this.connectionService.create({
      socketId: client.id,
      playerId: room.players.at(-1).id,
      roomId: room.id,
    });

    client.join(room.id);
    const websocketRoom = this.server.to(roomId);
    websocketRoom.emit('joined_room', room.players.at(-1));

    client.on('disconnecting', () => {
      this.handleDisconnectFromRoom(client);
    });
    return room;
  }

  @SubscribeMessage('start_game')
  async startGame(_client: Socket, payload: StartGameDto): Promise<void> {
    const { roomId } = payload;
    const websocketRoom = this.server.to(roomId);
    await this.roomService.startGame(payload);
    websocketRoom.emit('game_started');
  }

  async handleDisconnectFromRoom(client: Socket): Promise<void> {
    const { playerId, roomId } = await this.connectionService.findOne(
      client.id,
    );
    await this.roomService.leave(roomId, playerId);
    const websocketRoom = this.server.to(roomId);
    websocketRoom.emit('left_room', playerId);
  }
}
