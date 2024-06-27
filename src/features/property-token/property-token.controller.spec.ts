import { Test, TestingModule } from '@nestjs/testing';
import { PropertyTokenController } from './property-token.controller';
import { PropertyTokenService } from './property-token.service';

describe('PropertyTokenController', () => {
  let controller: PropertyTokenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PropertyTokenController],
      providers: [PropertyTokenService],
    }).compile();

    controller = module.get<PropertyTokenController>(PropertyTokenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
