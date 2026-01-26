import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import  request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Products e2e', ()=>{
    let app: INestApplication;

    beforeAll(async()=>{
        const moduleFixture = await Test.createTestingModule({
            imports:[AppModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        await app.init();
    })

    describe('GET /products', () => {
        it('should return all products', async () => {
            const response = await request(app.getHttpServer())
                .get('/products')
                .expect(200);
            
            expect(response.body).toBeInstanceOf(Array);
            expect(response.body.length).toBeGreaterThan(0);
            expect(response.body[0]).toHaveProperty('id');
            expect(response.body[0]).toHaveProperty('title');
            expect(response.body[0]).toHaveProperty('category');
            expect(response.body[0]).toHaveProperty('price');
        });
    });

    describe('GET /products/:id', () => {
        it("should return the correct product", async ()=>{
            const product = await request(app.getHttpServer())
                .get('/products/p-1020')
                .expect(200);
            
            expect(product.body).toEqual({
                "id": "p-1020",
                "title": "Pesa Pro 020",
                "category": "Jardín",
                "price": 67980,
                "currency": "ARS",
                "stock": 226,
                "rating": 9.0,
                "imageUrl": "https://example.invalid/images/p-1020.jpg",
                "createdAt": "2025-01-01T00:00:00Z"
            });
        });
        
        it('should throw a 404 when the product doesnt exist', async () => {
            const product = await request(app.getHttpServer())
                .get('/products/abc');
            
            expect(product.status).toBe(404);
            expect(product.body.message).toBe("producto no encontrado");
        });
    });

    afterAll(async () => {
        await app.close();
    });
})

