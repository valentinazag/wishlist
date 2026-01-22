import { Injectable } from '@nestjs/common';
import { pool } from './db';
import { Wishlist } from '../domain/Wishlist';


@Injectable()
export class WishlistRepository {

  async findWishlistProducts (idUser) {
    const result = await pool.query(
      `SELECT * FROM wishlist WHERE idUser = $1`,
      [idUser],
    );
    return result.rows.map(row => new Wishlist(row));
  }

  async AddItemWishlist (dataWishlist: { idUser: number; idProduct: string }) {
    const result = await pool.query(
      `INSERT INTO wishlist (idUser, idProduct)
       VALUES ($1, $2)
       RETURNING *`,
      [dataWishlist.idUser, dataWishlist.idProduct],
    );
    return await new Wishlist(result.rows[0]);
  }
}
