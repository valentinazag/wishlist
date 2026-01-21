import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ErrorHandlerService } from '../common/errors/error-handler.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports:[HttpModule],
  controllers: [ProductsController],
  providers: [ProductsService, ErrorHandlerService]
})
export class ProductsModule {}