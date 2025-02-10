import {
  Controller,
  Post,
  Get,
  Param,
  NotFoundException,
  Res,
  Body,
} from '@nestjs/common';
import { ShortyService } from './shorty.service';
import { ApiOperation, ApiParam } from '@nestjs/swagger';
import { CreateShortyResponse } from './responses/create.shorty.response';
import { isShortUrl } from './decorators/IsShortUrl';
import { Response } from 'express';
import { Recaptcha } from '@nestlab/google-recaptcha';
import { CreateShortyRequest } from './requests/create.shorty.request';

@Controller('')
export class ShortyController {
  constructor(private readonly shortyService: ShortyService) {}

  @Post()
  @Recaptcha({ action: 'Create' })
  @ApiParam({
    name: 'url',
    type: 'url',
    description: 'Full URL',
    required: true,
    allowEmptyValue: false,
  })
  @ApiOperation({ summary: 'Creates a short url based on input URL' })
  async createShorty(
    @Body() body: CreateShortyRequest,
  ): Promise<CreateShortyResponse> {
    const entry = await this.shortyService.createShortUrl(body.url);

    return {
      shortUrl: process.env.SHORT_PROTODOMAIN + `/r/${entry.shortCode}`,
    };
  }

  @Get('r/:shortCode')
  @ApiParam({
    name: 'shortCode',
    type: 'short-url',
    description: 'Retrieve short url',
  })
  async redirectToOriginal(
    @Res() res: Response,
    @Param('shortCode')
    @isShortUrl()
    shortCode: string,
  ): Promise<void> {
    const originalDto = await this.shortyService.checkShortCode(shortCode);

    if (!originalDto) {
      throw new NotFoundException('Short URL not found');
    }
    res.redirect(303, originalDto.originalUrl);
  }
}
