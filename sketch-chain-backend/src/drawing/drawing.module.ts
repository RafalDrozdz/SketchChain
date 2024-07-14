import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Drawing } from './drawing.entity';
import { DrawingService } from './drawing.service';

@Module({
  imports: [TypeOrmModule.forFeature([Drawing])],
  providers: [DrawingService],
  exports: [DrawingService],
})
export class DrawingModule {}
