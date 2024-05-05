import { Player } from 'src/player/player.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('guesses')
export class Guess {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  guess: string;

  @JoinTable()
  @ManyToOne(() => Player, (player) => player.guesses)
  player: Player;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdDate: Date;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedDate: Date;
}
