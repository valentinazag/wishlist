import { Injectable } from '@nestjs/common';
import { WishlistRepository } from './users.repository';
import { WishlistDto } from '../dto/wishlist.dto';
import { ProductsService } from '../products/products.service';


@Injectable()
export class UsersService {
  private readonly catalogUrl: string;

  constructor(private readonly wishlitRepository: WishlistRepository,
              private readonly productsService: ProductsService
  ) {}

    async getUserWishlist(idUser: number){
        const wishlist = await this.wishlitRepository.findWishlistProducts(idUser);
        const productdIds = wishlist.map(wishlist => wishlist.idProduct);
        if(productdIds.length === 0){
          return [];
        }
        const wishlistProducts = await Promise.all(
          productdIds.map(productId => this.productsService.findOne(productId))
        )
        return wishlistProducts;
    }

    async AddItemWishlist (idUser: number, newProduct: WishlistDto) {
    await this.productsService.findOne(newProduct.idProduct);
    const result = await this.wishlitRepository.AddItemWishlist ({idUser, idProduct : newProduct.idProduct});
      if(result === 'ALREADY_EXIST'){
        throw 'ALREADY_EXIST';
      }
    return result;
  }

  async deleteItemWishlist(idUser: number, idProduct: string) {
    const result = await this.wishlitRepository.deleteItemWishlist({idUser, idProduct});
    if(result === 'NOT_FOUND'){
      throw 'NOT_FOUND'
    }
    return result;
  }
}
