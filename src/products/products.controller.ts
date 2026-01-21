import { Controller,Get, Param} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ErrorHandlerService } from './error-handler.service';


@Controller('products')
export class ProductsController {
    constructor(
        private readonly productsService: ProductsService,
        private readonly errorHandler: ErrorHandlerService
    ){}
    @Get()
    async findAll()
    {
        try{
            return await this.productsService.findAll();
        }
        catch(error){
            return this.errorHandler.handleError(error);
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: string)
    {
       try{ 
            return await this.productsService.findOne(id);
       }
       catch(error){
            return this.errorHandler.handleError(error);
       }
    }

    
}
