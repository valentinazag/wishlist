CREATE TABLE IF NOT EXISTS wishlist (
  id SERIAL PRIMARY KEY,
  id_user INT NOT NULL,
  id_product NOT NULL,
);
