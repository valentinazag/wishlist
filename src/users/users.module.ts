import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { WishlistRepository } from './users.repository';
import { ProductsModule } from '../products/products.module';
import { ErrorHandlerService } from '../common/errors/error-handler.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, WishlistRepository, ErrorHandlerService],
  imports:[ProductsModule]
})
export class UsersModule {}
