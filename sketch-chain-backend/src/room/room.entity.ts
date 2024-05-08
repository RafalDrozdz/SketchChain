import { Player } from 'src/player/player.entity';
import { Step } from 'src/step/step.entity';
import {
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('rooms')
export class Room {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @JoinTable()
  @ManyToOne(() => Player, (player) => player.rooms, {
    cascade: true,
  })
  host: Player;

  @JoinTable()
  @OneToMany(() => Player, (player) => player.room)
  players: Player[];

  @JoinTable()
  @OneToMany(() => Step, (step) => step.room)
  steps: Step[];

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
