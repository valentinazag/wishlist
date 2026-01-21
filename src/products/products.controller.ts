import { Controller,Get, Param} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ErrorHandlerService } from '../common/errors/error-handler.service';
import { ProductDto } from 'src/dto/product.dto';

@Controller('products')
export class ProductsController {
    constructor(
        private readonly productsService: ProductsService,
        private readonly errorHandler: ErrorHandlerService
    ){}
    @Get()
    async findAll():Promise<ProductDto[]>
    {
        try{
            return await this.productsService.findAll();
        }
        catch(error){
            this.errorHandler.handleError(error);
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: string):Promise<ProductDto>
    {
       try{ 
            return await this.productsService.findOne(id);
       }
       catch(error){
            this.errorHandler.handleError(error);
       }
    }

    
}
