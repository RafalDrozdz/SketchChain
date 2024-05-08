import { IsString } from 'class-validator';

export class ModifyPlayerDto {
  @IsString()
  readonly nick: string;
}
