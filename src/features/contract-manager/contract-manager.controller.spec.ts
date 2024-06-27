import { Test, TestingModule } from '@nestjs/testing';
import { ContractManagerController } from './contract-manager.controller';
import { ContractManagerService } from './contract-manager.service';

describe('ContractManagerController', () => {
  let controller: ContractManagerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContractManagerController],
      providers: [ContractManagerService],
    }).compile();

    controller = module.get<ContractManagerController>(ContractManagerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
