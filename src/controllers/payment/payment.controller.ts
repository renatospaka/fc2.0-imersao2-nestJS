import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class PaymentController {
  @MessagePattern('pagamentos')
  consumePayment(@Payload() message) {
    console.log('payment', message)
  }
}
