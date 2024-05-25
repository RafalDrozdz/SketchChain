import { Room } from 'src/room/room.entity';
import { playerMock } from './player.mock';

export const roomIdMock = '04abb85f-b7ce-4df5-b273-7e9491f18267';

export const roomMock: Room = {
  id: roomIdMock,
  status: 'waiting',
  players: [playerMock],
  host: playerMock,
  createdDate: new Date(),
  updatedDate: new Date(),
};

export const roomInProgressMock: Room = {
  id: roomIdMock,
  status: 'in-progress',
  players: [playerMock],
  host: playerMock,
  createdDate: new Date(),
  updatedDate: new Date(),
};
