import { Player } from 'src/player/player.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('drawings')
export class Drawing {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  drawing: string;

  @JoinTable()
  @ManyToOne(() => Player, (player) => player.drawings)
  player: Player;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdDate: Date;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedDate: Date;
}
