import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './room.entity';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { PlayerModule } from 'src/player/player.module';

@Module({
  imports: [TypeOrmModule.forFeature([Room]), PlayerModule],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
