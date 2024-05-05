import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Drawing } from './drawing.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Drawing])],
})
export class DrawingModule {}
