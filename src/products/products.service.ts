import { Injectable } from '@nestjs/common';
import { Product } from 'src/interface/product.interface';
import * as fs from 'fs';
import * as path from 'path';
@Injectable()
export class ProductsService {
private readonly products : Product[] =[];
  constructor() {
  const filePath = path.join(process.cwd(),'src','data','products.json',);
  const rawData = fs.readFileSync(filePath, 'utf-8');
  this.products = JSON.parse(rawData);
  }
  findAll(): Product[] {
    return this.products;
  }

  findOne(id: string):Product | undefined {
    return this.products.find(product => product.id === id)
  }



}
