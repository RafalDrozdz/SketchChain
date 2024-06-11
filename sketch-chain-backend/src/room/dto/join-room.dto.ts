import { IsUUID, IsString, IsOptional } from 'class-validator';

export class JoinRoomDto {
  @IsString()
  readonly nick: string;

  @IsUUID()
  readonly roomId: string;

  @IsUUID()
  @IsOptional()
  readonly playerId?: string;
}
