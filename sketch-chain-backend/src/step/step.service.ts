import { Injectable } from '@nestjs/common';
import { Step } from './step.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStepDto } from './dto/create-step.dto';
import { Room } from 'src/room/room.entity';
import { Guess } from 'src/guess/guess.entity';
import { Drawing } from 'src/drawing/drawing.entity';
import { GuessService } from 'src/guess/guess.service';
import { DrawingService } from 'src/drawing/drawing.service';

@Injectable()
export class StepService {
  constructor(
    @InjectRepository(Step)
    private readonly stepRepository: Repository<Step>,
    private readonly guessService: GuessService,
    private readonly drawingService: DrawingService,
  ) {}

  async create({
    step,
    roomId,
    guessPlayerId,
    drawingPlayerId,
  }: CreateStepDto): Promise<Step> {
    const guess = await this.guessService.create({ playerId: guessPlayerId });
    const drawing = drawingPlayerId
      ? await this.drawingService.create({
          playerId: drawingPlayerId,
        })
      : null;

    const createdStep = this.stepRepository.create({
      room: { id: roomId },
      step,
      guess,
      drawing,
    });
    return this.stepRepository.save(createdStep);
  }

  async createAllStepsForRoom(room: Room): Promise<Step[][]> {
    const numberOfSteps = Math.ceil(room.players.length / 2);
    const promisedSteps: Promise<Step>[][] = [];

    for (let i = 0; i < numberOfSteps; i++) {
      promisedSteps.push(
        room.players.map((_player, index) =>
          this.create({
            roomId: room.id,
            guessPlayerId: room.players[(index + i) % room.players.length].id,
            drawingPlayerId:
              room.players.length % 2 === 1 && i === numberOfSteps - 1
                ? room.players[(index + i + 1) % room.players.length].id
                : null,
            step: i,
          }),
        ),
      );
    }

    return await Promise.all(promisedSteps.map((step) => Promise.all(step)));
  }

  // async setDrawing(id: number, createDrawingDto: CreateDrawingDto) {
  //   const player = await this.stepRepository.preload({
  //     id,
  //     drawing: createDrawingDto,
  //   });

  //   if (!player) {
  //     throw new NotFoundException(`Step #${id} not found`);
  //   }

  //   return this.stepRepository.save(player);
  // }
}
