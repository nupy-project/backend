import { Test, TestingModule } from '@nestjs/testing';
import { TokenFactoryService } from './token-factory.service';

describe('TokenFactoryService', () => {
  let service: TokenFactoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TokenFactoryService],
    }).compile();

    service = module.get<TokenFactoryService>(TokenFactoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
