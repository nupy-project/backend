import { Test, TestingModule } from '@nestjs/testing';
import { BuildingTokenController } from './building-token.controller';
import { BuildingTokenService } from './building-token.service';

describe('BuildingTokenController', () => {
  let controller: BuildingTokenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BuildingTokenController],
      providers: [BuildingTokenService],
    }).compile();

    controller = module.get<BuildingTokenController>(BuildingTokenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
