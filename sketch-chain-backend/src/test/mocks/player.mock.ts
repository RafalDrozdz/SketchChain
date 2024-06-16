import { ModifyPlayerDto } from 'src/player/dto/modify-player.dto';
import { Player } from 'src/player/player.entity';

export const playerIdMock = '2c00f729-7001-4892-909b-69e09e6207fe';
export const playerAvatarId = 5;

export const secondPlayerIdMock = 'ec88af1f-ec0e-4f7a-b70e-ee49fcad9b88';
export const secondPlayerAvatarId = 8;

export const playerMock: Player = {
  id: playerIdMock,
  avatarId: playerAvatarId,
  nick: 'Random Name',
  createdDate: new Date(),
  updatedDate: new Date(),
};

export const secondPlayerMock: Player = {
  id: secondPlayerIdMock,
  avatarId: secondPlayerAvatarId,
  nick: 'Second Player',
  createdDate: new Date(),
  updatedDate: new Date(),
};

export const modifyPlayerDtoMock: ModifyPlayerDto = {
  nick: 'Random Name',
  avatarId: playerAvatarId,
  playerId: playerIdMock,
};
