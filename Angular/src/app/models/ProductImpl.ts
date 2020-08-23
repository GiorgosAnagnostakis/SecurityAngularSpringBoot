import { Product, User } from 'src/swagger-generated';

export class ProductImpl implements Product {

    code?: string;
description?: string;
id?: number;
price?: string;
quantity?: number;
user?: User;
  
    constructor(product: Product) {
      this.code = product.code;
      this.id = product.id;
      this.description = product.description;
      this.price = product.price;
      this.quantity = product.quantity;
      this.user = product.user;
    }
  }
  
