import { Player } from 'src/player/player.entity';
import { Step } from 'src/step/step.entity';
import {
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('rooms')
export class Room {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Player, (player) => player.hostedRooms)
  host: Player;

  @ManyToMany(() => Player, (player) => player.rooms)
  @JoinTable()
  players: Player[];

  @OneToMany(() => Step, (step) => step.room)
  steps: Step[];

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
