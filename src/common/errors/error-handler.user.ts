import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

@Injectable()
export class ErrorHandlerUser{
    handlerErrorUser(error){
        // Si ya es una HttpException, re-lanzarla
        if(error instanceof HttpException){
            throw error;
        }

        // Si es un string de error personalizado
        switch(error){
            case 'ALREADY_EXIST':
                throw new HttpException('el producto ya esta en la wishlist', HttpStatus.BAD_REQUEST);
            case 'NOT_FOUND': 
                throw new HttpException('el producto no esta en la wishlist', HttpStatus.NOT_FOUND);
             case 'ALREADY_DELETED':
                throw new HttpException('el producto ya fue eliminado', HttpStatus.NOT_FOUND);
            default: throw new HttpException(error?.message || JSON.stringify(error) || 'Error desconocido', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
