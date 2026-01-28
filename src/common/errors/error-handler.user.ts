import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ErrorHandlerCommon } from "./error-handler.common";

@Injectable()
export class ErrorHandlerUser extends ErrorHandlerCommon{
    handlerErrorUser(error): never{
        if(error instanceof HttpException){
            throw error;
        }
        switch(error){
            case 'ALREADY_EXIST':
                throw new HttpException(
                 'el producto ya esta en la wishlist', 
                HttpStatus.BAD_REQUEST);
            case 'NOT_FOUND': 
                throw new HttpException(
                 'el producto no esta en la wishlist',
                HttpStatus.NOT_FOUND);
            default: super.handler(error)
        }
    }
}
