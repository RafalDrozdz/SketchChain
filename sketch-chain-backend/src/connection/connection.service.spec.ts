import { Test, TestingModule } from '@nestjs/testing';
import { ConnectionService } from './connection.service';
import { DataSource } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Connection } from './connection.entity';
import { createMockRepository, MockRepository } from 'src/test/helpers';
import {
  connectionMock,
  createConnectionDtoMock,
  socketIdMock,
} from 'src/test/mocks/connection.mock';
import { NotFoundException } from '@nestjs/common';

describe('ConnectionService', () => {
  let service: ConnectionService;
  let connectionRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConnectionService,
        { provide: DataSource, useValue: {} },
        {
          provide: getRepositoryToken(Connection),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<ConnectionService>(ConnectionService);
    connectionRepository = module.get<MockRepository>(
      getRepositoryToken(Connection),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should find connection', async () => {
      connectionRepository.findOne.mockResolvedValue(connectionMock);

      const connection = await service.findOne(socketIdMock);
      expect(connectionRepository.findOne).toBeCalled();
      expect(connectionRepository.findOne).toBeCalledWith({
        where: { socketId: socketIdMock },
      });
      expect(connection).toEqual(connectionMock);
    });

    it('should throw NotFoundException', async () => {
      try {
        await service.findOne(socketIdMock);
        expect(false).toBeTruthy();
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(`Connection #${socketIdMock} not found`);
      }
    });
  });

  describe('create', () => {
    it('should create connection', async () => {
      connectionRepository.save.mockResolvedValue(connectionMock);

      const connection = await service.create(createConnectionDtoMock);
      expect(connectionRepository.save).toBeCalled();
      expect(connectionRepository.create).toBeCalledWith(connectionMock);
      expect(connection).toEqual(connectionMock);
    });
  });
});
