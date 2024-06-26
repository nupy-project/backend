import { Test, TestingModule } from '@nestjs/testing';
import { ContractManagerService } from './contract-manager.service';

describe('ContractManagerService', () => {
  let service: ContractManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContractManagerService],
    }).compile();

    service = module.get<ContractManagerService>(ContractManagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
