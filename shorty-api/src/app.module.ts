import { Module } from '@nestjs/common';
import { ShortyModule } from './modules/shorty/shorty.module';

@Module({
  imports: [ShortyModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
