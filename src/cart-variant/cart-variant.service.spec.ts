import { Test, TestingModule } from '@nestjs/testing';
import { CartVariantService } from './cart-variant.service';

describe('CartVariantService', () => {
  let service: CartVariantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CartVariantService],
    }).compile();

    service = module.get<CartVariantService>(CartVariantService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
