import { Drawing } from 'src/drawing/drawing.entity';
import { Guess } from 'src/guess/guess.entity';
import { Room } from 'src/room/room.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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

  @JoinTable()
  @OneToMany(() => Room, (room: Room) => room.host)
  rooms: Room[];

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
