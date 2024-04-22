import { Inject, Injectable } from '@nestjs/common';
import { OrderDto } from './order.dto';
import { ClientProxy } from '@nestjs/microservices';
import { timeout } from 'rxjs';

@Injectable()
export class OrdersService {
  constructor(@Inject('ORDERS_SERVICE') private rabbitClient: ClientProxy) {}

  // Send new data to client
  placeOrder(order: OrderDto) {
    this.rabbitClient.emit('order-placed', order);

    return {
      message: 'Order has been placed!',
    };
  }

  getOrders() {
    return this.rabbitClient
      .send(
        {
          cmd: 'fetch-orders',
        },
        {},
      )
      .pipe(timeout(5000));
  }
}
