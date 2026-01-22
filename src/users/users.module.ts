import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { WishlistRepository } from './users.repository';
import { ProductsModule } from 'src/products/products.module';
import { ErrorHandlerService } from 'src/common/errors/error-handler.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, WishlistRepository, ErrorHandlerService],
  imports:[ProductsModule]
})
export class UsersModule {}
