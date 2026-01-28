import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ErrorHandlerCommon } from '../common/errors/error-handler.common';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports:[HttpModule],
  controllers: [ProductsController],
  providers: [ProductsService, ErrorHandlerCommon],
  exports:[ProductsService]
})
export class ProductsModule {}