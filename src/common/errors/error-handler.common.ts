import { HttpException, HttpStatus } from "@nestjs/common";
export class ErrorHandlerCommon{
    handler(error): never{
        if(error instanceof HttpException){
            throw error;
        }

        throw new HttpException(
            error?.message || 'error interno',
            HttpStatus.INTERNAL_SERVER_ERROR
        )
    }
}