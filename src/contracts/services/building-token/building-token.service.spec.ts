import { Test, TestingModule } from '@nestjs/testing';
import { BuildingTokenService } from './building-token.service';

describe('BuildingTokenService', () => {
  let service: BuildingTokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BuildingTokenService],
    }).compile();

    service = module.get<BuildingTokenService>(BuildingTokenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
