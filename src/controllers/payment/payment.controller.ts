import { Controller, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';
  
@Controller()
export class PaymentController implements OnModuleInit {
  
  constructor(
    @Inject('KAFKA_SERVICE')
    private clientKafka: ClientKafka
  ) {}

  async onModuleInit() {
    await this.clientKafka.subscribeToResponseOf('valida-alguma-coisa')
  }

  @MessagePattern('pagamentos')
  consumePayment(@Payload() message) {
    console.log('payment', message)
    const result = this.clientKafka
      .send('valida-alguma-coisa', JSON.stringify({ key: 'valor' }))
      .subscribe(reply => console.log('reply', reply))
  }
}

//#1 - Checkout -> envia mensagem -> Pagamentos
//#2 - Pagamento recebe a mensagem e envia uma nova mensagem para outra aplicacao
//#3 - Pagamento fica esperando que a outra aplicação confirme que recebeu mensagem