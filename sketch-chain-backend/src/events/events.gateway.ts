import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ServerToClientEvents } from './types/event.types';
import { RoomService } from 'src/room/room.service';
import { JoinRoomDto } from 'src/room/dto/join-room.dto';
import { ConnectionService } from 'src/connection/connection.service';
import { CreateRoomDto } from 'src/room/dto/create-room.dto';
import { plainToInstance } from 'class-transformer';
import { ResponseRoomDto } from 'src/room/dto/response-room.dto';
import { ResponsePlayerDto } from 'src/player/dto/response-player.dto';
import { Room } from 'src/room/room.entity';
import { StepService } from 'src/step/step.service';

@WebSocketGateway({ namespace: 'events', cors: true })
export class EventsGateway {
  @WebSocketServer()
  server: Server<unknown, ServerToClientEvents>;

  constructor(
    private readonly roomService: RoomService,
    private readonly connectionService: ConnectionService,
    private readonly stepService: StepService,
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
    client.join(client.id);

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
      const createdPlayer = room.players.at(-1);

      await this.connectionService.create({
        socketId: client.id,
        playerId: room.players.at(-1).id,
        roomId: room.id,
      });

      client.join(room.id);
      client.join(client.id);

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
  async startGame(client: Socket): Promise<Room> {
    const { playerId, roomId } = await this.connectionService.findOne(
      client.id,
    );
    try {
      const websocketRoom = this.server.to(roomId);
      const room = await this.roomService.startGame({ roomId, playerId });
      const steps = await this.stepService.createAllStepsForRoom(room);
      console.log(steps);
      websocketRoom.emit('game_started');

      steps[0].forEach(({ step, guess, drawing }) => {
        const websocketClient = this.server.to(guess.player.id);

        websocketClient.emit('step', {
          type: 'guess',
          step,
          drawing,
        });
      });

      return room;
    } catch (error) {
      console.log(error);

      return error;
    }
  }

  // @SubscribeMessage('send_guess')
  // async sendGuess(client: Socket, { guess }: { guess: string }): Promise<void> {
  //   try {
  //     const { playerId, roomId } = await this.connectionService.findOne(
  //       client.id,
  //     );
  //     const room = await this.roomService.getLastStep(roomId);
  //   } catch (error) {
  //     return error;
  //   }
  // }

  // @SubscribeMessage('send_drawing')
  // async sendDrawing(
  //   client: Socket,
  //   { drawing }: { drawing: string },
  // ): Promise<void> {
  //   const { playerId, roomId } = await this.connectionService.findOne(
  //     client.id,
  //   );
  // }

  async handleDisconnectFromRoom(socketId: string): Promise<void> {
    const { playerId, roomId } = await this.connectionService.remove(socketId);
    const room = await this.roomService.leave(roomId, playerId);
    const websocketRoom = this.server.to(roomId);
    websocketRoom.emit('left_room', playerId);
    websocketRoom.emit('host', room.host.id);
  }
}
