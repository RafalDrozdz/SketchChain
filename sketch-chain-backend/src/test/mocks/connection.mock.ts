import { Connection } from 'src/connection/connection.entity';
import { playerIdMock } from './player.mock';
import { roomIdMock } from './room.mock';
import { CreateConnectionDto } from 'src/connection/dto/create-connection.dto';

export const socketIdMock = '1d01f2e1-1061-4e82-8177-fdb6bfe7f687';

export const createConnectionDtoMock: CreateConnectionDto = {
  socketId: socketIdMock,
  playerId: playerIdMock,
  roomId: roomIdMock,
};

export const connectionMock: Connection = {
  socketId: socketIdMock,
  playerId: playerIdMock,
  roomId: roomIdMock,
};
