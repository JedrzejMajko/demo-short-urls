import { IsString, IsUrl } from 'class-validator';
import { isShortUrl } from './decorators/IsShortUrl';
import { ApiProperty } from '@nestjs/swagger';

export class ShortyDto {
  @IsString()
  @isShortUrl()
  shortCode: string;

  @ApiProperty({ type: 'string', format: 'url' })
  @IsUrl({}, { message: 'Invalid URL format' })
  originalUrl: string;
}
