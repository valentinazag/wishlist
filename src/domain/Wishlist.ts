export class Wishlist {
  id: number;
  id_user: number;
  id_producto: string;

  constructor({ id, id_user, id_producto }: { id: number; id_user: number; id_producto: string }) {
    this.id = id;
    this.id_user = id_user;
    this.id_producto = id_producto;
  }
}