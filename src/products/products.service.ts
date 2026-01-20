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
      throw new HttpException(
        'Error al obtener productos del servicio externo',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  async findOne(id: string): Promise<Product> {
    try {
      const response = await axios.get(`${this.catalogUrl}/${id}`);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new HttpException(
          `Producto con id ${id} no encontrado`,
          HttpStatus.NOT_FOUND,
        );
      }
      throw new HttpException(
        'Error al obtener producto del servicio externo',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }
}
