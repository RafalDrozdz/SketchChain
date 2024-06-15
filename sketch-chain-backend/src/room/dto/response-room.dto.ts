import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { ResponsePlayerDto } from 'src/player/dto/response-player.dto';

export class PlayerCollection extends Array<ResponsePlayerDto> {}

@Exclude()
export class ResponseRoomDto {
  @Expose()
  id: string;

  @Expose()
  status: string;

  @Expose()
  @Type(() => ResponsePlayerDto)
  @Transform(({ obj, value }) => {
    return value.map((player) => ({
      ...player,
      host: obj.host.id === player.id,
    }));
  })
  players: ResponsePlayerDto[];
}
