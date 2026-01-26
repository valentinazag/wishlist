import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import  request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Users e2e', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        await app.init();
    });

    describe('GET /users/:idUser/wishlist', () => {
        it('should return the wishlist for a user', async () => {
            const product = await request(app.getHttpServer())
                .get('/users/10/wishlist')
                .expect(200);
            
            expect(product.body).toEqual([{
                "id": "p-1044",
                "title": "Pesa Pro 044",
                "category": "Jardín",
                "price": 33860,
                "currency": "ARS",
                "stock": 106,
                "rating": 9.0,
                "imageUrl": "https://example.invalid/images/p-1044.jpg",
                "createdAt": "2025-01-01T00:00:00Z"
            }]);
        });

        it('should return an empty array when user has no wishlist items', async () => {
            const response = await request(app.getHttpServer())
                .get('/users/999/wishlist')
                .expect(200);
            
            expect(response.body).toEqual([]);
        });
    });

    describe('POST /users/:idUser/wishlist', () => {
        it('should add a product to the wishlist', async () => {
            const newProduct = {
                idProduct: 'p-1020'
            };

            const response = await request(app.getHttpServer())
                .post('/users/1/wishlist')
                .send(newProduct)
                .expect(201);
            
            expect(response.body).toHaveProperty('id');
            expect(response.body.idUser).toBe(1);
            expect(response.body.idProduct).toBe('p-1020');
            expect(response.body.isActive).toBe(true);
        });

        it('should return 404 when product does not exist', async () => {
            const newProduct = {
                idProduct: 'invalid-product'
            };

            const response = await request(app.getHttpServer())
                .post('/users/1/wishlist')
                .send(newProduct);
            
            expect(response.status).toBe(404);
            expect(response.body.message).toBe('producto no encontrado');
        });

        it('should return 409 when product is already in the wishlist', async () => {
            const newProduct = {
                idProduct: 'p-1020'
            };

            // Agregar producto
            await request(app.getHttpServer())
                .post('/users/2/wishlist')
                .send(newProduct)
                .expect(201);

            // Intentar agregarlo devuelta
            const response = await request(app.getHttpServer())
                .post('/users/2/wishlist')
                .send(newProduct);
            
            expect(response.status).toBe(409);
            expect(response.body.message).toContain('el producto ya está en la wishlist');
        });
    });

    describe('DELETE /users/:idUser/wishlist/:idProduct', () => {
        it('should soft delete a product from the wishlist', async () => {
            // Agregar un producto
            const newProduct = {
                idProduct: 'p-1021'
            };

            await request(app.getHttpServer())
                .post('/users/3/wishlist')
                .send(newProduct)
                .expect(201);

            // Borrar el producto
            const response = await request(app.getHttpServer())
                .delete('/users/3/wishlist/p-1021')
                .expect(200);
            
            expect(response.body).toHaveProperty('id');
            expect(response.body.isActive).toBe(false);
        });

        it('should return 404 when trying to delete a product not in wishlist', async () => {
            const product = await request(app.getHttpServer())
                .delete('/users/10/wishlist/p-1002');
            
            expect(product.status).toBe(404);
            expect(product.body.message).toBe("el producto no esta en la wishlist");
        });
    });

    afterAll(async () => {
        await app.close();
    });
})

