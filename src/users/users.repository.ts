import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { pool } from './db';
import { Wishlist } from '../domain/Wishlist';


@Injectable()
export class WishlistRepository {

  async findWishlistProducts (idUser) {
    const result = await pool.query(
      `SELECT id_product FROM wishlist WHERE id_user = $1 AND is_active IS TRUE`,
      [idUser],
    );
      return result.rows.map(row =>
      new Wishlist({
      id: row.id,
      idUser: row.id_user,
      idProduct: row.id_product,
      isActive: row.is_active
    }),
   );
  }
  

  async AddItemWishlist (dataWishlist: { idUser: number; idProduct: string }) {
    const result = await pool.query(
      `INSERT INTO wishlist (id_user, id_product)
       VALUES ($1, $2)
       RETURNING *`,
      [dataWishlist.idUser, dataWishlist.idProduct],
    );
    return await new Wishlist(result.rows[0]);
  }


  async deleteItemWishlist(dataWishlist: { idUser: number; idProduct: string }){
    const result = await pool.query(
       `UPDATE wishlist SET is_active = FALSE 
        WHERE id_user = $1 AND id_product = $2 AND is_active = TRUE
        RETURNING *`,
       [dataWishlist.idUser, dataWishlist.idProduct]
    );
    if (result.rows.length === 0) {
      throw new HttpException(
        `El producto ${dataWishlist.idProduct} no se encuentra en la Wishlist del usuario ${dataWishlist.idUser}`,
        HttpStatus.NOT_FOUND
      );
    }
    return new Wishlist(result.rows[0]);
  }
}
