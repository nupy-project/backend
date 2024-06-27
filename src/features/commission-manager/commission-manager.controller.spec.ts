import { Test, TestingModule } from '@nestjs/testing';
import { CommissionManagerController } from './commission-manager.controller';
import { CommissionManagerService } from './commission-manager.service';

describe('CommissionManagerController', () => {
  let controller: CommissionManagerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommissionManagerController],
      providers: [CommissionManagerService],
    }).compile();

    controller = module.get<CommissionManagerController>(CommissionManagerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
