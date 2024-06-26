import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from './player.entity';
import { PlayerService } from './player.service';

@Module({
  imports: [TypeOrmModule.forFeature([Player])],
  controllers: [],
  providers: [PlayerService],
  exports: [PlayerService],
})
export class PlayerModule {}
