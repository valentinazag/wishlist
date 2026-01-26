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

    it("should return the correct product for the user", async ()=>{
        const product = await request(app.getHttpServer())
        .get('/users/10/wishlist')
        .expect(200)
        expect(product.body).toEqual([{ "id": "p-1044",
            "title": "Pesa Pro 044",
            "category": "Jardín",
            "price": 33860,
            "currency": "ARS",
            "stock": 106,
            "rating": 9.0,
            "imageUrl": "https://example.invalid/images/p-1044.jpg",
            "createdAt": "2025-01-01T00:00:00Z"}])
        }
    );
   
    it('should throw a 404 when the products doesnt exist in the user´s wishlist', async () => {
          const product = await request(app.getHttpServer())
          .delete('/users/10/wishlist/p-1002');
          expect(product.status).toBe(404);
          expect(product.body.message).toBe("el producto no esta en la wishlist")
    });

  afterAll(async () => {
    await app.close();
  });
})

