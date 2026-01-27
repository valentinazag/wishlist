import { Controller,Get, Param} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDto } from 'src/dto/product.dto';

@Controller('products')
export class ProductsController {
    constructor(
        private readonly productsService: ProductsService
    ){}
    
    @Get()
    async findAll():Promise<ProductDto[]>
    {
        return await this.productsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string):Promise<ProductDto>
    {
        return await this.productsService.findOne(id);
    }
}
