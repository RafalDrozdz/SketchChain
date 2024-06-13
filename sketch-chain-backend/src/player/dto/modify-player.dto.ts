import { IsInt, IsPositive, IsString, Max } from 'class-validator';
import { AMOUNT_OF_AVATARS } from 'src/constants/room.constants';

export class ModifyPlayerDto {
  @IsString()
  readonly nick: string;

  @IsPositive()
  @Max(AMOUNT_OF_AVATARS)
  @IsInt()
  readonly avatarId: number;
}
