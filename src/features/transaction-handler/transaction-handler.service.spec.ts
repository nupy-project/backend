import { Test, TestingModule } from '@nestjs/testing';
import { TransactionHandlerService } from './transaction-handler.service';

describe('TransactionHandlerService', () => {
  let service: TransactionHandlerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionHandlerService],
    }).compile();

    service = module.get<TransactionHandlerService>(TransactionHandlerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
