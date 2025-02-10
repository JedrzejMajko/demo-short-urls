import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateShortyRequest {
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  url: string;
}
