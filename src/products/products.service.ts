import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Product } from 'src/interface/product.interface';
import axios from 'axios';

@Injectable()
export class ProductsService {
  private readonly catalogUrl: string;

  constructor(private configService: ConfigService) {
    this.catalogUrl = this.configService.getOrThrow<string>('CATALOG_SERVICE_URL');
  }

  async findAll(): Promise<Product[]> {
    try {
      const response = await axios.get(this.catalogUrl);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string): Promise<Product> {
    try {
      const response = await axios.get(`${this.catalogUrl}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
