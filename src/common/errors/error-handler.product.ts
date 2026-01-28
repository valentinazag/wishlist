import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ErrorHandlerCommon } from "./error-handler.common";

@Injectable()
export class ErrorHandlerProducts extends ErrorHandlerCommon{
    handlerErrorProduct(error): never{ 
    const status = error?.response?.status;
    switch(status){
      case 404:
        throw new HttpException(
         "producto no encontrado",
        HttpStatus.NOT_FOUND,
    );
      case 500:
        throw new HttpException(
          "error servidor externo",
        HttpStatus.SERVICE_UNAVAILABLE,
    );
      default:
       super.handler(error);
  }
 }
}