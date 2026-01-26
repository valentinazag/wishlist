import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { WishlistRepository } from './users.repository';
import { ProductsModule } from '../products/products.module';
import { ErrorHandlerUser } from '../common/errors/error-handler.user';

@Module({
  controllers: [UsersController],
  providers: [UsersService, WishlistRepository, ErrorHandlerUser],
  imports:[ProductsModule]
})
export class UsersModule {}
