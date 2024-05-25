import { IsUUID } from 'class-validator';

export class StartGameDto {
  @IsUUID()
  readonly roomId: string;

  @IsUUID()
  readonly playerId: string;
}
