import { IsUUID } from 'class-validator';

export class CreateDrawingDto {
  @IsUUID()
  readonly playerId: string;
}
