import {
  IsUUID,
  IsString,
  IsOptional,
  IsPositive,
  Max,
  IsInt,
} from 'class-validator';
import { AMOUNT_OF_AVATARS } from 'src/constants/room.constants';

export class JoinRoomDto {
  @IsString()
  readonly nick: string;

  @IsUUID()
  readonly roomId: string;

  @IsPositive()
  @Max(AMOUNT_OF_AVATARS)
  @IsInt()
  readonly avatarId: number;

  @IsUUID()
  @IsOptional()
  readonly playerId?: string;
}
