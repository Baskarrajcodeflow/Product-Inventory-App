/* eslint-disable prettier/prettier */

import { ApiProperty } from '@nestjs/swagger';

export class userRegistrationDto {
  @ApiProperty()
  user_name: string;
  @ApiProperty()
  user_email_id: string;
  @ApiProperty()
  user_password: string;
}

export class userInventoryDTO {
  @ApiProperty()
  product_name: string;
  @ApiProperty()
  product_description: string;
  @ApiProperty()
  product_quantity: number;
  @ApiProperty()
  product_price: number;
}

export class productQuantityDto {
  @ApiProperty()
  product_quantity: number;
  @ApiProperty()
  id: number;
}

export class GeneratedInvoiceDetailsDTO {
  @ApiProperty()
  id: number;
  @ApiProperty()
  product_name: string;
  @ApiProperty()
  product_description: string;
  @ApiProperty()
  product_quantity: number;
  @ApiProperty()
  product_price: number;
  @ApiProperty()
  total_price: number;
}
