import { Drawing } from 'src/drawing/drawing.entity';
import { Guess } from 'src/guess/guess.entity';
import { Room } from 'src/room/room.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('players')
export class Player {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nick: string;

  @JoinTable()
  @ManyToOne(() => Room, (room: Room) => room.players)
  room: Room;

  @JoinTable()
  @OneToMany(() => Guess, (guess: Guess) => guess.player)
  guesses: Guess[];

  @JoinTable()
  @OneToMany(() => Drawing, (drawing: Drawing) => drawing.player)
  drawings: Drawing[];

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdDate: Date;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedDate: Date;
}
