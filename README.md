# WISHLIST PROJECT

This project is a wishlist managment tool, **designed to help users** to add and delete products they like to their own list. 

Allows users to:
- Add products to their wishlist.
- Obtain their wishlist's products.
- Soft delete of products form the user's wishlist.

## Running the project
Steps to run the application:

### External service 
1) docker compose -f external-service/docker-compose.yml up
### Internal database
2) docker compose up -d

### Run project
3) npm install
4) npm run start:dev

### Run e2e tests
5) npm run test:e2e

## Tecnology used
- Nestjs
- PostgresSQL
- Docker










