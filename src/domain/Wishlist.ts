export class Wishlist {
  id: number;
  idUser: number;
  idProduct: string;

  constructor({ id, idUser, idProduct }: { id: number; idUser: number; idProduct: string }) {
    this.id = id;
    this.idUser = idUser;
    this.idProduct = idProduct;
  }
}