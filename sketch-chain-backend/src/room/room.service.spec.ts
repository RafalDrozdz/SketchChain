import { Test, TestingModule } from '@nestjs/testing';
import { RoomService } from './room.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Player } from 'src/player/player.entity';
import { DataSource } from 'typeorm';
import { PlayerService } from 'src/player/player.service';
import { createMockRepository, MockRepository } from 'src/test/helpers';
import { Room } from './room.entity';
import {
  modifyPlayerDtoMock,
  playerIdMock,
  playerMock,
  secondModifyPlayerDtoMock,
  secondPlayerIdMock,
  secondPlayerMock,
  thirdPlayerMock,
} from 'src/test/mocks/player.mock';
import {
  joinRoomDtoMock,
  roomIdMock,
  roomInProgressMock,
  roomMock,
  secondJoinRoomDtoMock,
} from 'src/test/mocks/room.mock';
import {
  ConflictException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { cloneDeep } from 'lodash';

describe('RoomService', () => {
  let service: RoomService;
  let roomRepository: MockRepository;
  let playerRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoomService,
        PlayerService,
        { provide: DataSource, useValue: {} },
        {
          provide: getRepositoryToken(Room),
          useValue: createMockRepository(),
        },
        {
          provide: getRepositoryToken(Player),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<RoomService>(RoomService);
    roomRepository = module.get<MockRepository>(getRepositoryToken(Room));
    playerRepository = module.get<MockRepository>(getRepositoryToken(Player));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a room with new user', async () => {
      const clonedRoomMock = cloneDeep(roomMock);

      roomRepository.save.mockResolvedValue(clonedRoomMock);

      const room = await service.create(cloneDeep(modifyPlayerDtoMock));
      expect(roomRepository.save).toBeCalled();
      expect(playerRepository.create).toBeCalledWith(
        cloneDeep(modifyPlayerDtoMock),
      );
      expect(room).toEqual(clonedRoomMock);
    });

    it('should create a room with updated user', async () => {
      const clonedRoomMock = cloneDeep(roomMock);

      roomRepository.save.mockResolvedValue(clonedRoomMock);

      const room = await service.create(cloneDeep(modifyPlayerDtoMock));
      expect(roomRepository.save).toBeCalled();
      expect(playerRepository.create).toBeCalledWith(
        cloneDeep(modifyPlayerDtoMock),
      );
      expect(room).toEqual(clonedRoomMock);
    });
  });

  describe('join', () => {
    it('should join a room', async () => {
      const clonedRoomMock = cloneDeep(roomMock);
      roomRepository.findOne.mockResolvedValue(clonedRoomMock);
      roomRepository.save.mockResolvedValue(clonedRoomMock);
      playerRepository.save.mockResolvedValue(cloneDeep(thirdPlayerMock));

      const room = await service.join(cloneDeep(secondJoinRoomDtoMock));
      expect(roomRepository.save).toBeCalled();
      expect(playerRepository.create).toBeCalledWith(
        cloneDeep(secondModifyPlayerDtoMock),
      );
      expect(room).toEqual(clonedRoomMock);
    });

    it('should throw NotFoundException', async () => {
      try {
        await service.join(cloneDeep(joinRoomDtoMock));
        expect(false).toBeTruthy();
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(`Room #${roomIdMock} not found`);
      }
    });

    it('should throw ConflictException', async () => {
      try {
        const clonedRoomMock = cloneDeep(roomMock);

        roomRepository.findOne.mockResolvedValue(clonedRoomMock);
        roomRepository.save.mockResolvedValue(clonedRoomMock);
        playerRepository.save.mockResolvedValue(playerMock);

        await service.join(joinRoomDtoMock);
        expect(false).toBeTruthy();
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException);
        expect(error.message).toEqual(
          `Player #${playerIdMock} already in room #${roomIdMock}`,
        );
      }
    });
  });

  describe('startGame', () => {
    const startGameDtoMock = {
      playerId: playerIdMock,
      roomId: roomIdMock,
    };

    it('should start a game', async () => {
      const clonedRoomInProgressMock = cloneDeep(roomInProgressMock);
      roomRepository.findOne.mockResolvedValue(clonedRoomInProgressMock);
      roomRepository.save.mockResolvedValue(clonedRoomInProgressMock);

      const room = await service.startGame(cloneDeep(startGameDtoMock));
      expect(roomRepository.save).toBeCalled();
      expect(roomRepository.save).toBeCalledWith(clonedRoomInProgressMock);
      expect(room).toEqual(clonedRoomInProgressMock);
    });

    it('should throw ForbiddenException', async () => {
      const unauthorisedPlayerId = '526946aa-7271-4490-b39b-3739ea5602a6';
      roomRepository.findOne.mockResolvedValue(cloneDeep(roomInProgressMock));
      roomRepository.save.mockResolvedValue(cloneDeep(roomInProgressMock));

      try {
        await service.startGame({
          ...cloneDeep(startGameDtoMock),
          playerId: unauthorisedPlayerId,
        });
        expect(false).toBeTruthy();
      } catch (error) {
        expect(error).toBeInstanceOf(ForbiddenException);
        expect(error.message).toEqual(
          `Player #${unauthorisedPlayerId} is not a host of #${startGameDtoMock.roomId} room`,
        );
      }
    });

    it('should throw NotFoundException', async () => {
      try {
        await service.startGame(cloneDeep(startGameDtoMock));
        expect(false).toBeTruthy();
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(`Room #${roomIdMock} not found`);
      }
    });
  });

  describe('leave', () => {
    it('should remove player from room', async () => {
      const clonedRoomMock = cloneDeep(roomMock);
      roomRepository.findOne.mockResolvedValue(clonedRoomMock);
      roomRepository.save.mockResolvedValue(clonedRoomMock);

      const room = await service.leave(roomIdMock, secondPlayerIdMock);
      const expectedResult: Room = {
        ...clonedRoomMock,
        players: [playerMock],
      };

      expect(roomRepository.save).toBeCalled();
      expect(roomRepository.save).toBeCalledWith(cloneDeep(expectedResult));
      expect(room).toEqual(expectedResult);
    });

    it('should remove player from room and set new host', async () => {
      const clonedRoomMock = cloneDeep(roomMock);

      roomRepository.findOne.mockResolvedValue(clonedRoomMock);
      roomRepository.save.mockResolvedValue(clonedRoomMock);

      const room = await service.leave(roomIdMock, playerIdMock);
      const expectedResult: Room = {
        ...clonedRoomMock,
        host: secondPlayerMock,
        players: [secondPlayerMock],
      };

      expect(roomRepository.save).toBeCalled();
      expect(roomRepository.save).toBeCalledWith(expectedResult);
      expect(room).toEqual(expectedResult);
    });

    it('should remove room', async () => {
      const clonedRoomMock = cloneDeep(roomMock);

      roomRepository.findOne.mockResolvedValue(clonedRoomMock);
      roomRepository.save.mockResolvedValue(clonedRoomMock);

      await service.leave(roomIdMock, playerIdMock);
      await service.leave(roomIdMock, secondPlayerIdMock);

      expect(roomRepository.remove).toBeCalled();
      expect(roomRepository.save).toBeCalled();
    });
  });
});
