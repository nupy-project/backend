import { Test, TestingModule } from '@nestjs/testing';
import { TransactionHandlerController } from './transaction-handler.controller';
import { TransactionHandlerService } from './transaction-handler.service';

describe('TransactionHandlerController', () => {
  let controller: TransactionHandlerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionHandlerController],
      providers: [TransactionHandlerService],
    }).compile();

    controller = module.get<TransactionHandlerController>(TransactionHandlerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
