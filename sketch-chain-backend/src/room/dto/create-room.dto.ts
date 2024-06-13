import { IsString, IsPositive, Max, IsInt } from 'class-validator';
import { AMOUNT_OF_AVATARS } from 'src/constants/room.constants';

export class CreateRoomDto {
  @IsString()
  readonly nick: string;

  @IsPositive()
  @Max(AMOUNT_OF_AVATARS)
  @IsInt()
  readonly avatarId: number;
}
