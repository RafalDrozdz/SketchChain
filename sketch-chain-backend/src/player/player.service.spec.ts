import { Test, TestingModule } from '@nestjs/testing';
import { PlayerService } from './player.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { createMockRepository, MockRepository } from 'src/test/helpers';
import { DataSource } from 'typeorm';
import { Player } from './player.entity';
import {
  modifyPlayerDtoMock,
  playerIdMock,
  playerMock,
} from 'src/test/mocks/player.mock';
import { NotFoundException } from '@nestjs/common';

describe('PlayerService', () => {
  let service: PlayerService;
  let playerRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlayerService,
        {
          provide: DataSource,
          useValue: {},
        },
        {
          provide: getRepositoryToken(Player),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<PlayerService>(PlayerService);
    playerRepository = module.get<MockRepository>(getRepositoryToken(Player));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create new player', async () => {
      playerRepository.save.mockResolvedValue(playerMock);
      const player = await service.create(modifyPlayerDtoMock);
      expect(playerRepository.create).toBeCalledWith(modifyPlayerDtoMock);
      expect(playerRepository.save).toBeCalled();
      expect(player).toEqual(playerMock);
    });
  });

  describe('update', () => {
    it('should update player', async () => {
      playerRepository.preload.mockReturnValue(playerMock);
      playerRepository.save.mockResolvedValue(playerMock);
      const player = await service.update(playerIdMock, modifyPlayerDtoMock);
      expect(playerRepository.preload).toBeCalledWith({
        id: playerIdMock,
        ...modifyPlayerDtoMock,
      });
      expect(playerRepository.save).toBeCalled();
      expect(player).toEqual(playerMock);
    });

    it('should throw NotFoundException', async () => {
      try {
        await service.update(playerIdMock, modifyPlayerDtoMock);
        expect(false).toBeTruthy();
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(`Player #${playerIdMock} not found`);
      }
    });
  });

  describe('findOne', () => {
    it('should find player', async () => {
      playerRepository.findOne.mockReturnValue(playerMock);
      const player = await service.findOne(playerIdMock);
      expect(player).toEqual(playerMock);
    });

    it('should throw NotFoundException', async () => {
      try {
        await service.findOne(playerIdMock);
        expect(false).toBeTruthy();
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(`Player #${playerIdMock} not found`);
      }
    });
  });

  describe('start', () => {
    it('should create player', async () => {
      playerRepository.save.mockResolvedValue(playerMock);
      const player = await service.start(modifyPlayerDtoMock);
      expect(playerRepository.create).toBeCalledWith(modifyPlayerDtoMock);
      expect(playerRepository.save).toBeCalled();
      expect(player).toEqual(playerMock);
    });

    it('should update player', async () => {
      playerRepository.preload.mockReturnValue(playerMock);
      playerRepository.save.mockResolvedValue(playerMock);
      const player = await service.update(playerIdMock, modifyPlayerDtoMock);
      expect(playerRepository.preload).toBeCalledWith({
        id: playerIdMock,
        ...modifyPlayerDtoMock,
      });
      expect(playerRepository.save).toBeCalled();
      expect(player).toEqual(playerMock);
    });
  });
});
