import { Test, TestingModule } from '@nestjs/testing';
import { ShortyController } from './shorty.controller';

describe('ShortyController', () => {
  let controller: ShortyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShortyController],
    }).compile();

    controller = module.get<ShortyController>(ShortyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
