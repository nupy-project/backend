import { Test, TestingModule } from '@nestjs/testing';
import { PropertyTokenService } from './property-token.service';

describe('PropertyTokenService', () => {
  let service: PropertyTokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PropertyTokenService],
    }).compile();

    service = module.get<PropertyTokenService>(PropertyTokenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
