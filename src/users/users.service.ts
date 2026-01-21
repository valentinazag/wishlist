import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Wishlist } from 'src/domain/Wishlist';
import { Product } from 'src/interface/product.interface';
import { WishlistRepository } from './users.repository';
import { WishlistDto } from 'src/dto/wishlist.dto';
import { ProductsService } from 'src/products/products.service';
import { error } from 'console';

@Injectable()
export class UsersService {
  private readonly catalogUrl: string;

  constructor(private readonly wishlitRepository: WishlistRepository,
              private readonly productsService: ProductsService
  ) {}

    getUserWishlist(id_user: number){
        return this.wishlitRepository.findWishlistProducts(id_user);
    }


    createWishlist(id_user, id_product) {
    const service = this.productsService.findOne( id_product);
    if (!service){
        throw error;
    }
    return this.wishlitRepository.createWishlist({id_user, id_product});
  }
}
