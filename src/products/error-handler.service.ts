import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

@Injectable()
export class ErrorHandlerService{
    handleError(error){  
    if (error.response?.status === 404) {
        throw new HttpException(
          "producto no encontrado",
          HttpStatus.NOT_FOUND,
        );
    }
    else if(error.response?.status === 500){
         throw new HttpException(
        "error servidor externo",
        HttpStatus.SERVICE_UNAVAILABLE,
        );
    }
    else {throw new HttpException(
      "error interno",
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
 }
}