import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Guess } from './guess.entity';
import { Repository } from 'typeorm';
import { CreateGuessDto } from './dto/create-guess.dto';

@Injectable()
export class GuessService {
  constructor(
    @InjectRepository(Guess)
    private readonly guessRepository: Repository<Guess>,
  ) {}

  async create({ playerId }: CreateGuessDto): Promise<Guess> {
    const createdDrawing = this.guessRepository.create({
      player: { id: playerId },
    });
    return this.guessRepository.save(createdDrawing);
  }
}
