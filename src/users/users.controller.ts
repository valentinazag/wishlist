import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { WishlistDto } from 'src/dto/wishlist.dto';
import { ErrorHandlerService } from '../common/errors/error-handler.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService,
              private readonly errorHandler: ErrorHandlerService
  ) {}


    @Get(':id_user/wishlist')
    getUserWishlist(@Param('id_user') id_user: number){
        try {return this.usersService.getUserWishlist(id_user);}
        catch(error){
            this.errorHandler.handleError(error);
        }
    }

    @Post(':id_user/wishlist')
    createWishlist(
        @Param('id_user') id_user: number,
        @Body() newProduct: WishlistDto){
       try{
        return this.usersService.createWishlist(id_user, newProduct)
       }
      catch(error){
         this.errorHandler.handleError(error);
      }
    }

}
