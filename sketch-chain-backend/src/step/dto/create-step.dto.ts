import { IsInt, IsOptional, IsPositive, IsUUID } from 'class-validator';

export class CreateStepDto {
  @IsUUID()
  readonly roomId: string;

  @IsUUID()
  readonly guessPlayerId: string;

  @IsUUID()
  @IsOptional()
  readonly drawingPlayerId?: string;

  @IsPositive()
  @IsInt()
  @IsOptional()
  readonly step?: number;
}
