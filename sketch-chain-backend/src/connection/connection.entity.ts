import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('connections')
export class Connection {
  @PrimaryColumn()
  socketId: string;

  @Column()
  playerId: string;

  @Column()
  roomId: string;
}
