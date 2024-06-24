import { Injectable, NotFoundException } from '@nestjs/common';
import { Connection } from './connection.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateConnectionDto } from './dto/create-connection.dto';

@Injectable()
export class ConnectionService {
  constructor(
    @InjectRepository(Connection)
    private readonly connectionRepository: Repository<Connection>,
  ) {}

  async findOne(socketId: string): Promise<Connection> {
    const connection = await this.connectionRepository.findOne({
      where: { socketId },
    });
    if (!connection) {
      throw new NotFoundException(`Connection #${socketId} not found`);
    }
    return connection;
  }

  async create(createConnectionDto: CreateConnectionDto): Promise<Connection> {
    const createdConnection = await this.connectionRepository.create(
      createConnectionDto,
    );
    return this.connectionRepository.save(createdConnection);
  }

  async remove(socketId: string): Promise<Connection> {
    const connection = await this.findOne(socketId);
    return this.connectionRepository.remove(connection);
  }
}
