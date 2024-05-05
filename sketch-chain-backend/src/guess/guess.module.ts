import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Guess } from './guess.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Guess])],
})
export class GuessModule {}
