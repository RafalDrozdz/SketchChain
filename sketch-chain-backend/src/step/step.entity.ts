import { Drawing } from 'src/drawing/drawing.entity';
import { Guess } from 'src/guess/guess.entity';
import { Player } from 'src/player/player.entity';
import { Room } from 'src/room/room.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('steps')
export class Step {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  step: number;

  @JoinColumn()
  @OneToOne(() => Drawing)
  drawing: Drawing;

  @JoinColumn()
  @OneToOne(() => Guess)
  guess: Guess;

  @JoinTable()
  @ManyToOne(() => Room, (room) => room.steps, { onDelete: 'CASCADE' })
  room: Room;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdDate: Date;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedDate: Date;
}
