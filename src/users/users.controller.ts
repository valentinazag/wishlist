import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { WishlistDto } from '../dto/wishlist.dto';
import { ErrorHandlerService } from '../common/errors/error-handler.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService,
              private readonly errorHandler: ErrorHandlerService
  ) {}


    @Get(':idUser/wishlist')
    async getUserWishlist(@Param('idUser') idUser: number){
        try {
            return await this.usersService.getUserWishlist(idUser)
        }
        catch(error){
            this.errorHandler.handleError(error);
        }
    }

    @Post(':idUser/wishlist')
    async AddItemWishlist (
        @Param('idUser') idUser: string,
        @Body() newProduct: WishlistDto){
        const idUserParsed = Number(idUser)
       try{
        return await this.usersService.AddItemWishlist (idUserParsed, newProduct)
       }
      catch(error){
         this.errorHandler.handleError(error);
      }
    }

    @Delete(':idUser/wishlist/:idProduct')
    async deleteItemWishlist(
        @Param('idUser') idUser: string,
        @Param('idProduct') idProduct: string){
        const idUserParsed = Number(idUser)
       try{
        return await this.usersService.deleteItemWishlist(idUserParsed, idProduct)
       }
      catch(error){
         this.errorHandler.handleError(error);
      }
    }

}
