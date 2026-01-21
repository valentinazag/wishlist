import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ErrorHandlerService } from './error-handler.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, ErrorHandlerService]
})
export class ProductsModule {}