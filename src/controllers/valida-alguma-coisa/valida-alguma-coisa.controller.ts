import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class ValidaAlgumaCoisaController {
  @MessagePattern('valida-alguma-coisa')
  validaAlgumaCoisa(@Payload() message){
    console.log(message.value)
    return {
      response: 'Respondi a bagaceira'
    }
  }
}
