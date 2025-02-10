import { IsString } from 'class-validator';

export class CreateShortyResponse {
  @IsString()
  shortUrl: string;
}
