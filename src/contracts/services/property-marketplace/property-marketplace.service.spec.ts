import { Test, TestingModule } from '@nestjs/testing';
import { PropertyMarketplaceService } from './property-marketplace.service';

describe('PropertyMarketplaceService', () => {
  let service: PropertyMarketplaceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PropertyMarketplaceService],
    }).compile();

    service = module.get<PropertyMarketplaceService>(PropertyMarketplaceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
