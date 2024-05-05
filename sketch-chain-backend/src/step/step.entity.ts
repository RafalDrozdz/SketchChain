import { Drawing } from 'src/drawing/drawing.entity';
import { Guess } from 'src/guess/guess.entity';
import { Room } from 'src/room/room.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('steps')
export class Step {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  step: number;

  @JoinColumn()
  @OneToOne(() => Drawing)
  drawing: Drawing;

  @JoinColumn()
  @OneToOne(() => Guess)
  guess: Guess;

  @JoinTable()
  @ManyToOne(() => Room, (room) => room.steps)
  room: Room;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdDate: Date;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedDate: Date;
}
