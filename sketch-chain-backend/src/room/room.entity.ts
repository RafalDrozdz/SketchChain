import { Player } from 'src/player/player.entity';
import { Step } from 'src/step/step.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export type RoomStatus = 'waiting' | 'in-progress' | 'completed';

@Entity('rooms')
export class Room {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    enum: ['waiting', 'in-progress', 'completed'],
    default: 'waiting',
  })
  status: RoomStatus;

  @ManyToOne(() => Player, (player) => player.hostedRooms)
  host: Player;

  @ManyToMany(() => Player, (player) => player.rooms, {
    cascade: true,
  })
  @JoinTable()
  players?: Player[];

  @OneToMany(() => Step, (step) => step.room)
  steps?: Step[];

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
