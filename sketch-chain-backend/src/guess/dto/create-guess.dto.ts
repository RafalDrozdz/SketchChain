import { IsUUID } from 'class-validator';

export class CreateGuessDto {
  @IsUUID()
  readonly playerId: string;
}
