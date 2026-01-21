import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Product } from 'src/interface/product.interface';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';


@Injectable()
export class ProductsService {
  private readonly catalogUrl: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService){
    this.catalogUrl = this.configService.getOrThrow<string>('CATALOG_SERVICE_URL');
    }

  async findAll(): Promise<Product[]> {
      const response = await firstValueFrom(
        this.httpService.get<Product[]>(this.catalogUrl),
      );
      return response.data;
}

  async findOne(id: string): Promise<Product> {
      const response = await firstValueFrom(
        this.httpService.get<Product>(`${this.catalogUrl}/${id}`)
      )
      return response.data;
  }
}
