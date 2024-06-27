import { Test, TestingModule } from '@nestjs/testing';
import { TokenFactoryController } from './token-factory.controller';
import { TokenFactoryService } from './token-factory.service';

describe('TokenFactoryController', () => {
  let controller: TokenFactoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TokenFactoryController],
      providers: [TokenFactoryService],
    }).compile();

    controller = module.get<TokenFactoryController>(TokenFactoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
