import {Injectable } from '@nestjs/common';
import { pool } from '../common/utils/db';
import { Wishlist } from '../domain/Wishlist';


@Injectable()
export class WishlistRepository {
private mappingtoDomain(row: any): Wishlist {
    return new Wishlist({
      id: row.id,
      idUser: row.id_user,
      idProduct: row.id_product,
      isActive: row.is_active,
    });
  }

  async findWishlistProducts (idUser : number): Promise<Wishlist[]>{
    const result = await pool.query(
      `SELECT id, id_user, id_product, is_active FROM wishlist 
      WHERE id_user = $1 
      AND is_active IS TRUE`,
      [idUser],
    );
      return result.rows.map(row =>
      this.mappingtoDomain(row)
   );
  }
  
  
  async findWishlistItem (dataWishlist: { idUser: number; idProduct: string }):Promise<Wishlist | null>{
    const result = await pool.query(
    `SELECT id, id_user, id_product, is_active
     FROM wishlist
     WHERE id_user = $1 AND id_product = $2`,
    [dataWishlist.idUser, dataWishlist.idProduct],
  );
  if (result.rows.length === 0) {
    return null;
  }
  return this.mappingtoDomain(result.rows[0])
}

  async AddItemWishlist (dataWishlist: { idUser: number; idProduct: string }):Promise<Wishlist | string> {
   const itemExist  = await this.findWishlistItem(dataWishlist);

   if(itemExist?.isActive){
     throw 'ALREADY_EXIST'
   }

   if(!itemExist){
     const result = await pool.query(
      `INSERT INTO wishlist (id_user, id_product)
       VALUES ($1, $2)
       RETURNING *`,
      [dataWishlist.idUser, dataWishlist.idProduct],
    );
    return this.mappingtoDomain(result.rows[0])
   }

  
    const result = await pool.query( 
      `UPDATE wishlist
       SET is_active = TRUE,
       update_date = CURRENT_TIMESTAMP
       WHERE id_user = $1 AND id_product = $2
       RETURNING *`,
    [dataWishlist.idUser, dataWishlist.idProduct],
  );
   return this.mappingtoDomain(result.rows[0])
}


  async deleteItemWishlist(dataWishlist: { idUser: number; idProduct: string }):Promise<Wishlist | string> {
    const itemExist  = await this.findWishlistItem(dataWishlist)

    if(!itemExist){
       throw 'NOT_FOUND'
    }

    const result = await pool.query(
        `UPDATE wishlist SET is_active = FALSE,
         update_date = CURRENT_TIMESTAMP 
         WHERE id_user = $1 AND id_product = $2 AND is_active = TRUE
         RETURNING *`,
       [dataWishlist.idUser, dataWishlist.idProduct]
    );
    return this.mappingtoDomain(result.rows[0])
  }
}
