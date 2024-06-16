import { IsUUID } from 'class-validator';
import { ModifyPlayerDto } from 'src/player/dto/modify-player.dto';

export class JoinRoomDto extends ModifyPlayerDto {
  @IsUUID()
  readonly roomId: string;
}
