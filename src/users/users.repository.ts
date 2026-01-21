import { pool } from "./db.js";
import { Wishlist } from "../domain/Wishlist.js";

export const wishlistRepository = {
    
    createWishlist: async (wishlistData) => {
    const { id_user, id_product } = wishlistData;
    const result = await pool.query(
      `INSERT INTO wishlist (id_user, id_product)
       VALUES ($1, $2)
       RETURNING *`,
      [ id_user, id_product]
    );
    return new Wishlist(result.rows[0])
    },
}
