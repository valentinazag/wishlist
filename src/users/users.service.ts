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

    async getUserWishlist(idUser: number){
        return await this.wishlitRepository.findWishlistProducts(idUser);
    }


    async AddItemWishlist (idUser: number, newProduct: WishlistDto) {
    await this.productsService.findOne(newProduct.idProduct);
    return await this.wishlitRepository.AddItemWishlist ({idUser, idProduct : newProduct.idProduct});
  }
}
