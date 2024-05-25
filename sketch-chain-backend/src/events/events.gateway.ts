import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ServerToClientEvents } from './types/event.types';
import { RoomService } from 'src/room/room.service';
import { JoinRoomDto } from './dto/join-room.dto';
import { StartGameDto } from '../room/dto/start-game.dto';

@WebSocketGateway({ namespace: 'events' })
export class EventsGateway {
  @WebSocketServer()
  server: Server<unknown, ServerToClientEvents>;

  constructor(private readonly roomService: RoomService) {}

  @SubscribeMessage('join_room')
  async joinRoom(client: Socket, payload: JoinRoomDto) {
    const { nick, roomId, playerId } = payload;

    client.join(roomId);
    const room = await this.roomService.join({ nick }, roomId, playerId);
    const websocketRoom = this.server.to(roomId);
    websocketRoom.emit('joined_room', room);
  }

  @SubscribeMessage('start_game')
  async startGame(_client: Socket, payload: StartGameDto) {
    const { roomId } = payload;
    const websocketRoom = this.server.to(roomId);
    await this.roomService.startGame(payload);
    websocketRoom.emit('game_started');
  }
}
