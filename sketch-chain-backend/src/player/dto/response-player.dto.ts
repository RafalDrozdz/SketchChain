import { Exclude, Expose, Transform } from 'class-transformer';

@Exclude()
export class ResponsePlayerDto {
  @Expose()
  id: string;

  @Expose()
  nick: string;

  @Expose()
  avatarId: string;

  @Expose()
  @Transform(({ value }) => {
    return value == null ? false : value;
  })
  host: boolean;
}
