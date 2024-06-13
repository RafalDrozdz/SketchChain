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

@WebSocketGateway({ namespace: 'events', cors: true })
export class EventsGateway {
  @WebSocketServer()
  server: Server<unknown, ServerToClientEvents>;

  constructor(private readonly roomService: RoomService) {}

  @SubscribeMessage('create_room')
  async createRoom(client: Socket, payload: CreateRoomDto) {
    const room = await this.roomService.create(payload);
    client.join(room.id);
    const websocketRoom = this.server.to(room.id);
    websocketRoom.emit('created_room', room);
    return room;
  }

  @SubscribeMessage('join_room')
  async joinRoom(client: Socket, payload: JoinRoomDto) {
    const { nick, avatarId, roomId, playerId } = payload;
    client.join(roomId);
    const room = await this.roomService.join(
      { nick, avatarId },
      roomId,
      playerId,
    );
    const websocketRoom = this.server.to(roomId);
    websocketRoom.emit('joined_room', room.players.at(-1));
    return room;
  }

  @SubscribeMessage('start_game')
  async startGame(_client: Socket, payload: StartGameDto) {
    const { roomId } = payload;
    const websocketRoom = this.server.to(roomId);
    await this.roomService.startGame(payload);
    websocketRoom.emit('game_started');
  }
}
