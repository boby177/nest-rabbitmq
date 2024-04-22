import { Injectable } from '@nestjs/common';
import { OrderDto } from './order.dto';

@Injectable()
export class AppService {
  // New data array of orders
  orders: OrderDto[] = [];

  handleOrderPlaced(order: OrderDto) {
    console.log(`Received a new order from email : ${order.email}`);
    this.orders.push(order);
    // We can send some email notifications on this endpoint
  }

  getOrders() {
    return this.orders;
  }
}
