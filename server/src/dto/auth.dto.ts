import { IsString, MaxLength, MinLength } from 'class-validator';

export class AuthDto {
  @IsString()
  @MaxLength(50)
  @MinLength(3)
  userName: string;
}
