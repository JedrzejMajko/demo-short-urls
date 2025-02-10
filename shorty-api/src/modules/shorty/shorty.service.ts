import { randomInt } from 'crypto';
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ShortyDto } from './shorty.dto';
import { getShortChars } from './shorty.config';

@Injectable()
export class ShortyService {
  private prisma = new PrismaClient();

  async createShortUrl(originalUrl: string): Promise<ShortyDto> {
    const existingUrlDto: ShortyDto | null = await this.checkUrl(originalUrl);
    if (existingUrlDto !== null) {
      return existingUrlDto;
    }

    // Generate unique short code
    let shortCode: string;
    do {
      shortCode = this.generateRandomString(8);
    } while (await this.prisma.shorty.findUnique({ where: { shortCode } }));

    // Create new entry
    return this.prisma.shorty.create({
      data: {
        originalUrl: originalUrl,
        shortCode,
      },
    });
  }

  async checkUrl(url: string): Promise<ShortyDto | null> {
    // Check if URL  exists - rm when account are introduced
    const existing = await this.prisma.shorty.findUnique({
      where: { originalUrl: url },
    });

    if (existing) {
      return existing;
    }
    return null;
  }

  async checkShortCode(shortCode: string): Promise<ShortyDto | null> {
    const existing = await this.prisma.shorty.findUnique({
      where: { shortCode },
    });

    if (existing) {
      return existing;
    }
    return null;
  }
  // Unbiased + CSPRNG
  // 0 , O, 1, I removed for short url readability
  // -_+, added to extend vocabulary
  // 8 chars = 64^8 comb
  private generateRandomString(length: number = 8): string {
    const chars = getShortChars();
    const len = chars.length;
    return Array.from({ length }, () => {
      const randomIndex = randomInt(0, len);
      return chars[randomIndex];
    }).join('');
  }
}
