import { Module } from '@nestjs/common';
import { ConnectionService } from './connection.service';
import { Connection } from './connection.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Connection])],

  providers: [ConnectionService],
  exports: [ConnectionService],
})
export class ConnectionModule {}
