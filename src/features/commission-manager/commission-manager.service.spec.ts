import { Test, TestingModule } from '@nestjs/testing';
import { CommissionManagerService } from './commission-manager.service';

describe('CommissionManagerService', () => {
  let service: CommissionManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommissionManagerService],
    }).compile();

    service = module.get<CommissionManagerService>(CommissionManagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
