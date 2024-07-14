import { Module } from '@nestjs/common';
import { Step } from './step.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StepService } from './step.service';
import { GuessModule } from 'src/guess/guess.module';
import { DrawingModule } from 'src/drawing/drawing.module';

@Module({
  imports: [TypeOrmModule.forFeature([Step]), GuessModule, DrawingModule],
  providers: [StepService],
  exports: [StepService],
})
export class StepModule {}
