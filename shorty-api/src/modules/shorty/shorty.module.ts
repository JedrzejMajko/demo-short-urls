import { Module } from '@nestjs/common';
import { GoogleRecaptchaModule } from '@nestlab/google-recaptcha';
import { ShortyService } from './shorty.service';
import { ShortyController } from './shorty.controller';
import { IsShortUrlConstraint } from './decorators/IsShortUrl';

@Module({
  providers: [ShortyService, IsShortUrlConstraint],
  controllers: [ShortyController],
  imports: [
    GoogleRecaptchaModule.forRoot({
      secretKey: process.env.GOOGLE_RECAPTCHA_SECRET_KEY,
      response: (req: CaptchaRequest): string | Promise<string> =>
        req?.headers?.recaptcha,
      skipIf: false, //process.env.NODE_ENV !== 'production',
      actions: ['Create'],
      debug: false,
      score: 0.8,
    }),
  ],
})
export class ShortyModule {}
