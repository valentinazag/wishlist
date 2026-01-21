import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import  request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Products e2e', ()=>{
    let app: INestApplication;

    beforeEach(async()=>{
        const moduleFixture = await Test.createTestingModule({
            imports:[AppModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        await app.init();
    })

    it("should return the correct product", async ()=>{
        const product = await request(app.getHttpServer())
        .get('/products/p-1020')
        .expect(200)
        expect(product.body).toEqual({"id": "p-1020",
            "title": "Pesa Pro 020",
            "category": "Jardín",
            "price": 67980,
            "currency": "ARS",
            "stock": 226,
            "rating": 9.0,
            "imageUrl": "https://example.invalid/images/p-1020.jpg",
            "createdAt": "2025-01-01T00:00:00Z"})
        }
    )
    
    it('should throw a 404 when the products doesnt exist', async () => {
        const product = await request(app.getHttpServer())
        .get('/products/abc');
        expect(product.status).toBe(404);
        expect(product.body.message).toBe("producto no encontrado")
  });
        
})

