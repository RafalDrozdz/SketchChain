import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { RoomModule } from 'src/room/room.module';

@Module({
  providers: [EventsGateway],
  imports: [RoomModule],
})
export class EventsModule {}
