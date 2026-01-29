import { Injectable } from '@nestjs/common';
import { WishlistRepository } from './users.repository';
import { WishlistDto } from '../dto/wishlist.dto';
import { ProductsService } from '../products/products.service';
import { Wishlist } from 'src/domain/Wishlist';
import { Product } from 'src/interface/product.interface';


@Injectable()
export class UsersService {
  private readonly catalogUrl: string;

  constructor(private readonly wishlistRepository: WishlistRepository,
              private readonly productsService: ProductsService
  ) {}

    async getUserWishlist(idUser: number): Promise<Product[]>{
        const wishlist = await this.wishlistRepository.findWishlistProducts(idUser);
        const productdIds = wishlist.map(wishlist => wishlist.idProduct);
        if(productdIds.length === 0){
          return [];
        }
        const wishlistProducts = await Promise.all(
          productdIds.map(productId => this.productsService.findOne(productId))
        )
        return wishlistProducts;
    }

    async AddItemWishlist (idUser: number, newProduct: WishlistDto): Promise<Wishlist | string> {
    await this.productsService.findOne(newProduct.idProduct);
    const result = await this.wishlistRepository.AddItemWishlist ({idUser, idProduct : newProduct.idProduct});
      if(result === 'ALREADY_EXIST'){
        throw 'ALREADY_EXIST';
      }
    return result;
  }

  async deleteItemWishlist(idUser: number, idProduct: string): Promise<Wishlist | string> {
    const result = await this.wishlistRepository.deleteItemWishlist({idUser, idProduct});
    if(result === 'NOT_FOUND'){
      throw 'NOT_FOUND'
    }
    return result;
  }
}
