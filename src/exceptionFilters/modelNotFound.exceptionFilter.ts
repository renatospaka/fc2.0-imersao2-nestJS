import { ArgumentsHost, ExceptionFilter } from "@nestjs/common";
import { EntityNotFoundError} from 'typeorm/error/EntityNotFoundError'

export class ModelNotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: EntityNotFoundError, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>()
    
  }
}