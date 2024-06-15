import {
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  Max,
} from 'class-validator';
import { AMOUNT_OF_AVATARS } from 'src/constants/room.constants';

export class ModifyPlayerDto {
  @IsString()
  readonly nick: string;

  @IsPositive()
  @Max(AMOUNT_OF_AVATARS)
  @IsInt()
  readonly avatarId: number;

  @IsUUID()
  @IsOptional()
  readonly playerId?: string;
}
