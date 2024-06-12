import { Drawing } from 'src/drawing/drawing.entity';
import { Guess } from 'src/guess/guess.entity';
import { Room } from 'src/room/room.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
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

  @Column({
    type: 'smallint',
  })
  avatarId: number;

  @ManyToMany(() => Room, (room: Room) => room.players)
  rooms?: Room[];

  @OneToMany(() => Guess, (guess: Guess) => guess.player)
  guesses?: Guess[];

  @OneToMany(() => Drawing, (drawing: Drawing) => drawing.player)
  drawings?: Drawing[];

  @OneToMany(() => Room, (room: Room) => room.host, {
    cascade: true,
  })
  hostedRooms?: Room[];

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
