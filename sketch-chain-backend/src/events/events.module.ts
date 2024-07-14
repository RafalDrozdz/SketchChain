import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { RoomModule } from 'src/room/room.module';
import { ConnectionModule } from 'src/connection/connection.module';
import { StepModule } from 'src/step/step.module';

@Module({
  imports: [RoomModule, ConnectionModule, StepModule],
  providers: [EventsGateway],
})
export class EventsModule {}
