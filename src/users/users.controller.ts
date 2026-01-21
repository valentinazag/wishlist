import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


    @Get(':id_user')
    getUserWishlist(@Param('id_user') id_user: number){
        return this.usersService.getUserWishlist(id_user);
    }
}
