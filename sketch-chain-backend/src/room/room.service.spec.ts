import { Test, TestingModule } from '@nestjs/testing';
import { RoomService } from './room.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Player } from 'src/player/player.entity';
import { Step } from 'src/step/step.entity';
import { DataSource } from 'typeorm';
import { Room } from './room.entity';

describe('RoomService', () => {
  let service: RoomService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoomService,
        { provide: DataSource, useValue: {} },
        { provide: getRepositoryToken(Room), useValue: {} },
        { provide: getRepositoryToken(Player), useValue: {} },
        { provide: getRepositoryToken(Step), useValue: {} },
      ],
    }).compile();

    service = module.get<RoomService>(RoomService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a room', async () => {});

    it('should return an BadRequestError', async () => {});
  });
});
