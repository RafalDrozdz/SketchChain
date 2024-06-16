import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { RoomModule } from 'src/room/room.module';
import { ConnectionModule } from 'src/connection/connection.module';

@Module({
  imports: [RoomModule, ConnectionModule],
  providers: [EventsGateway],
})
export class EventsModule {}
