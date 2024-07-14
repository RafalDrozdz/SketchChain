import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Drawing } from './drawing.entity';
import { Repository } from 'typeorm';
import { CreateDrawingDto } from './dto/create-drawing.dto';

@Injectable()
export class DrawingService {
  constructor(
    @InjectRepository(Drawing)
    private readonly drawingRepository: Repository<Drawing>,
  ) {}

  async create({ playerId }: CreateDrawingDto): Promise<Drawing> {
    const createdDrawing = this.drawingRepository.create({
      player: { id: playerId },
    });
    return this.drawingRepository.save(createdDrawing);
  }
}
