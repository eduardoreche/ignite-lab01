import { UseGuards } from '@nestjs/common';
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { PurchasesService } from '../../../services/purchases.service';
import { AuthorizationGuard } from '../../../http/auth/authorization.guard';
import { Purchase } from '../models/purchase';
import { Product } from '../models/product';
import { ProductsService } from 'src/services/products.service';

@Resolver(() => Purchase)
export class PurchasesResolver {
  constructor(
    private purchasesService: PurchasesService,
    private productsService: ProductsService,
  ) {}

  // @UseGuards(AuthorizationGuard)
  @Query(() => [Purchase])
  purchases() {
    return this.purchasesService.listAllPurchases();
  }

  @ResolveField()
  product(@Parent() purchase: Purchase) {
    return this.productsService.findProductById(purchase.productId);
  }
}
