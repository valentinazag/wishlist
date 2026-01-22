import { Injectable } from '@nestjs/common';
import { WishlistRepository } from './users.repository';
import { WishlistDto } from 'src/dto/wishlist.dto';
import { ProductsService } from 'src/products/products.service';


@Injectable()
export class UsersService {
  private readonly catalogUrl: string;

  constructor(private readonly wishlitRepository: WishlistRepository,
              private readonly productsService: ProductsService
  ) {}

    getUserWishlist(id_user: number){
        return this.wishlitRepository.findWishlistProducts(id_user);
    }


    async createWishlist(id_user: number, newProduct: WishlistDto) {
    await this.productsService.findOne(newProduct.id_product);
    return this.wishlitRepository.createWishlist({id_user, id_product : newProduct.id_product});
  }
}
