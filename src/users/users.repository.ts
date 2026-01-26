import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { pool } from '../common/utils/db';
import { Wishlist } from '../domain/Wishlist';


@Injectable()
export class WishlistRepository {

  async findWishlistProducts (idUser : number) {
    const result = await pool.query(
      `SELECT id, id_user, id_product, is_active FROM wishlist 
      WHERE id_user = $1 
      AND is_active IS TRUE`,
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
  
  
  async findWishlistItem (dataWishlist: { idUser: number; idProduct: string }) {
    const result = await pool.query(
    `SELECT id, id_user, id_product, is_active
     FROM wishlist
     WHERE id_user = $1 AND id_product = $2`,
    [dataWishlist.idUser, dataWishlist.idProduct],
  );
  if (result.rows.length === 0) {
    return null;
  }
  return new Wishlist({
    id: result.rows[0].id,
    idUser: result.rows[0].id_user,
    idProduct: result.rows[0].id_product,
    isActive: result.rows[0].is_active,
  });
}

  async AddItemWishlist (dataWishlist: { idUser: number; idProduct: string }) {
   const itemExist  = await this.findWishlistItem(dataWishlist)
   if(!itemExist){
     const result = await pool.query(
      `INSERT INTO wishlist (id_user, id_product)
       VALUES ($1, $2)
       RETURNING *`,
      [dataWishlist.idUser, dataWishlist.idProduct],
    );
    return await new Wishlist(result.rows[0]);
   }

   if(itemExist.isActive){
     return 'ALREADY_EXIST'
   }

    const result = await pool.query( 
      `UPDATE wishlist
       SET is_active = TRUE,
       update_date = CURRENT_TIMESTAMP
       WHERE id_user = $1 AND id_product = $2
       RETURNING *`,
    [dataWishlist.idUser, dataWishlist.idProduct],
  );
  return new Wishlist(result.rows[0]);
}


  async deleteItemWishlist(dataWishlist: { idUser: number; idProduct: string }){
    const itemExist  = await this.findWishlistItem(dataWishlist)

    if(!itemExist){
       return 'NOT_FOUND'
    }

    if(!itemExist.isActive){
       return 'ALREADY_DELETED'
    }

    const result = await pool.query(
        `UPDATE wishlist SET is_active = FALSE,
         update_date = CURRENT_TIMESTAMP 
         WHERE id_user = $1 AND id_product = $2 AND is_active = TRUE
         RETURNING *`,
       [dataWishlist.idUser, dataWishlist.idProduct]
    );
    return new Wishlist(result.rows[0]);
  }
}
