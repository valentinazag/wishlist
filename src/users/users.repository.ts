import { Injectable } from '@nestjs/common';
import { pool } from './db';
import { Wishlist } from '../domain/Wishlist';


@Injectable()
export class WishlistRepository {

  async findWishlistProducts (id_user) {
    const result = await pool.query(
      `SELECT * FROM wishlist WHERE id_user = $1`,
      [id_user],
    );
    return result.rows.map(row => new Wishlist(row));
  }

  async createWishlist(dataWishlist: { id_user: number; id_product: string }) {
    const result = await pool.query(
      `INSERT INTO wishlist (id_user, id_product)
       VALUES ($1, $2)
       RETURNING *`,
      [dataWishlist.id_user, dataWishlist.id_product],
    );
    return new Wishlist(result.rows[0]);
  }
}
