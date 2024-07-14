import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Guess } from './guess.entity';
import { GuessService } from './guess.service';

@Module({
  imports: [TypeOrmModule.forFeature([Guess])],
  providers: [GuessService],
  exports: [GuessService],
})
export class GuessModule {}
