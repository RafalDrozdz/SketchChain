import { Test, TestingModule } from '@nestjs/testing';
import { RoomService } from './room.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Player } from 'src/player/player.entity';
import { DataSource } from 'typeorm';
import { PlayerService } from 'src/player/player.service';
import { createMockRepository, MockRepository } from 'src/test/helpers';
import { Room } from './room.entity';
import { ModifyPlayerDto } from '../player/dto/modify-player.dto';

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
      const modifyPlayerDto: ModifyPlayerDto = { nick: 'Random Name' };
      const expectedRoom = {
        id: '04abb85f-b7ce-4df5-b273-7e9491f18267',
        players: [
          {
            id: '2c00f729-7001-4892-909b-69e09e6207fe',
            nick: 'Random Name',
            createdDate: new Date(),
            updatedDate: new Date(),
          },
        ],
        host: {
          id: '2c00f729-7001-4892-909b-69e09e6207fe',
          nick: 'Random Name',
          createdDate: new Date(),
          updatedDate: new Date(),
        },
        createdDate: new Date(),
        updatedDate: new Date(),
      };

      roomRepository.save.mockResolvedValue(expectedRoom);

      const room = await service.create(modifyPlayerDto);
      expect(roomRepository.save).toBeCalled();
      expect(playerRepository.create).toBeCalledWith(modifyPlayerDto);
      expect(room).toEqual(expectedRoom);
    });

    it('should create a room with updated user', async () => {
      const modifyPlayerDto: ModifyPlayerDto = { nick: 'Random Name' };
      const playerId = '2c00f729-7001-4892-909b-69e09e6207fe';
      const expectedRoom = {
        id: '04abb85f-b7ce-4df5-b273-7e9491f18267',
        players: [
          {
            id: playerId,
            nick: 'Random Name',
            createdDate: new Date(),
            updatedDate: new Date(),
          },
        ],
        host: {
          id: playerId,
          nick: 'Random Name',
          createdDate: new Date(),
          updatedDate: new Date(),
        },
        createdDate: new Date(),
        updatedDate: new Date(),
      };

      roomRepository.save.mockResolvedValue(expectedRoom);

      const room = await service.create(modifyPlayerDto, playerId);
      expect(roomRepository.save).toBeCalled();
      expect(playerRepository.create).toBeCalledWith(modifyPlayerDto);
      expect(room).toEqual(expectedRoom);
    });
  });
});
