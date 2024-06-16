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
  secondPlayerIdMock,
  secondPlayerMock,
} from 'src/test/mocks/player.mock';
import {
  joinRoomDtoMock,
  roomIdMock,
  roomInProgressMock,
  roomMock,
} from 'src/test/mocks/room.mock';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
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
      roomRepository.save.mockResolvedValue(roomMock);

      const room = await service.create(modifyPlayerDtoMock);
      expect(roomRepository.save).toBeCalled();
      expect(playerRepository.create).toBeCalledWith(modifyPlayerDtoMock);
      expect(room).toEqual(roomMock);
    });

    it('should create a room with updated user', async () => {
      roomRepository.save.mockResolvedValue(roomMock);

      const room = await service.create(modifyPlayerDtoMock);
      expect(roomRepository.save).toBeCalled();
      expect(playerRepository.create).toBeCalledWith(modifyPlayerDtoMock);
      expect(room).toEqual(roomMock);
    });
  });

  describe('join', () => {
    it('should join a room with new user', async () => {
      roomRepository.findOne.mockResolvedValue(roomMock);
      roomRepository.save.mockResolvedValue(roomMock);
      playerRepository.save.mockResolvedValue(playerMock);

      const room = await service.join(joinRoomDtoMock);
      expect(roomRepository.save).toBeCalled();
      expect(playerRepository.create).toBeCalledWith(modifyPlayerDtoMock);
      expect(room).toEqual(roomMock);
    });

    it('should join a room with updated user', async () => {
      roomRepository.findOne.mockResolvedValue(roomMock);
      roomRepository.save.mockResolvedValue(roomMock);
      playerRepository.save.mockResolvedValue(playerMock);

      const room = await service.join(joinRoomDtoMock);
      expect(roomRepository.save).toBeCalled();
      expect(playerRepository.create).toBeCalledWith(modifyPlayerDtoMock);
      expect(room).toEqual(roomMock);
    });

    it('should throw NotFoundException', async () => {
      try {
        await service.join(joinRoomDtoMock);
        expect(false).toBeTruthy();
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(`Room #${roomIdMock} not found`);
      }
    });
  });

  describe('startGame', () => {
    const startGameDtoMock = {
      playerId: playerIdMock,
      roomId: roomIdMock,
    };

    it('should start a game', async () => {
      roomRepository.preload.mockResolvedValue(roomInProgressMock);
      roomRepository.save.mockResolvedValue(roomInProgressMock);

      const room = await service.startGame(startGameDtoMock);
      expect(roomRepository.save).toBeCalled();
      expect(roomRepository.save).toBeCalledWith(roomInProgressMock);
      expect(room).toEqual(roomInProgressMock);
    });

    it('should throw ForbiddenException', async () => {
      const unauthorisedPlayerId = '526946aa-7271-4490-b39b-3739ea5602a6';
      roomRepository.preload.mockResolvedValue(roomInProgressMock);
      roomRepository.save.mockResolvedValue(roomInProgressMock);

      try {
        await service.startGame({
          ...startGameDtoMock,
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
        await service.startGame(startGameDtoMock);
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
      expect(roomRepository.save).toBeCalledWith(expectedResult);
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

    it('should remove players from room and remove room', async () => {
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
