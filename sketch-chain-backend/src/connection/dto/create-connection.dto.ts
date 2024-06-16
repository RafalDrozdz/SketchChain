import { IsString, IsUUID } from 'class-validator';

export class CreateConnectionDto {
  @IsString()
  readonly socketId: string;

  @IsUUID()
  readonly playerId: string;

  @IsUUID()
  readonly roomId: string;
}
