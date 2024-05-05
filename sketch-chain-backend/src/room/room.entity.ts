import { Player } from 'src/player/player.entity';
import { Step } from 'src/step/step.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('rooms')
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @JoinColumn()
  @OneToOne(() => Player)
  host: Player;

  @JoinTable()
  @OneToMany(() => Player, (player) => player.room)
  players: Player[];

  @JoinTable()
  @OneToMany(() => Step, (step) => step.room)
  steps: Step[];

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdDate: Date;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedDate: Date;
}
