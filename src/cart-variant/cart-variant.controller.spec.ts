import { Test, TestingModule } from '@nestjs/testing';
import { CartVariantController } from './cart-variant.controller';
import { CartVariantService } from './cart-variant.service';

describe('CartVariantController', () => {
  let controller: CartVariantController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartVariantController],
      providers: [CartVariantService],
    }).compile();

    controller = module.get<CartVariantController>(CartVariantController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
