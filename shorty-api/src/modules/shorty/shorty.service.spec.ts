import { Test, TestingModule } from '@nestjs/testing';
import { ShortyService } from './shorty.service';

describe('ShortyService', () => {
  let service: ShortyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShortyService],
    }).compile();

    service = module.get<ShortyService>(ShortyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
