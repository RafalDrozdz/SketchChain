import { Module } from '@nestjs/common';
import { Step } from './step.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Step])],
})
export class StepModule {}
