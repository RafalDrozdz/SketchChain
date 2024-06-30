import { JoinRoomDto } from 'src/room/dto/join-room.dto';
import { Room } from 'src/room/room.entity';
import {
  modifyPlayerDtoMock,
  playerMock,
  secondModifyPlayerDtoMock,
  secondPlayerMock,
} from 'src/test/mocks/player.mock';

export const roomIdMock = '04abb85f-b7ce-4df5-b273-7e9491f18267';

export const roomMock: Room = {
  id: roomIdMock,
  status: 'WAITING_FOR_START',
  players: [playerMock, secondPlayerMock],
  host: playerMock,
  createdDate: new Date(),
  updatedDate: new Date(),
};

export const roomInProgressMock: Room = {
  id: roomIdMock,
  status: 'IN_PROGRESS',
  players: [playerMock],
  host: playerMock,
  createdDate: new Date(),
  updatedDate: new Date(),
};

export const joinRoomDtoMock: JoinRoomDto = {
  ...modifyPlayerDtoMock,
  roomId: roomIdMock,
};

export const secondJoinRoomDtoMock: JoinRoomDto = {
  ...secondModifyPlayerDtoMock,
  roomId: roomIdMock,
};
