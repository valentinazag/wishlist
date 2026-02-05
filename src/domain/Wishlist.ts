export class Wishlist {
  id: number;
  idUser: number;
  idProduct: string;
  isActive: boolean;

  constructor({ id, idUser, idProduct, isActive }: { id: number; idUser: number; idProduct: string; isActive: boolean }) {
    this.id = id;
    this.idUser = idUser;
    this.idProduct = idProduct;
    this.isActive = isActive;
  }
}