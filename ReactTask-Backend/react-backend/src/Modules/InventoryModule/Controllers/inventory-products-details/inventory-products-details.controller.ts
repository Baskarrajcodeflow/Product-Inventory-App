/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Put, Req } from '@nestjs/common';
import {
  productQuantityDto,
  userInventoryDTO,
} from 'src/Dto/user-registration.dto';
import { InventoryProductsDetailsService } from '../../Services/inventory-products-details/inventory-products-details.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../../AuthService/auth-service.service';
import { Request } from 'express';
@ApiTags('Inventory Product Details')
@Controller('inventory-products-details')
export class InventoryProductsDetailsController {
  constructor(
    private readonly inventoryService: InventoryProductsDetailsService,
    private _authService: AuthService,
  ) {}
  //--------------------------Add Inventory Product Details-----------------------------//
  @ApiBearerAuth('JWT-auth')
  @Post('addInventoryProductDetails')
  async addInventoryProductDetails(
    @Req() request: Request,
    @Body() inventoryDetails: userInventoryDTO,
  ) {
    try {
      const token = String(request.headers.header).replace('Bearer', '');
      const extractedToken = token.split(' ')[2];
      const decodeToken = await this._authService
        .verifyJwt(extractedToken)
        .then((data) => data);
      const { user_id } = decodeToken;
      const addInventoryProductDetails =
        await this.inventoryService.insertInventoryDetails(
          inventoryDetails,
          user_id,
        );
      return addInventoryProductDetails;
    } catch (error) {
      throw error;
    }
  }
  //--------------------------Update Inventory Product Details-----------------------------//
  @ApiBearerAuth('JWT-auth')
  @Put('updateInventoryProductDetails')
  async updateInventoryProductDetails(
    @Body() productQuantity: productQuantityDto,
  ) {
    try {
      const updateInventoryProductDetails =
        await this.inventoryService.updateInventoryDetails(productQuantity);
      return updateInventoryProductDetails;
    } catch (error) {
      throw error;
    }
  }
  //--------------------------Get Inventory Product Details-----------------------------//
  @ApiBearerAuth('JWT-auth')
  @Get('getInventoryProductDetails')
  async getInventoryProductDetails(@Req() request: Request) {
    try {
      const token = String(request.headers.header).replace('Bearer', '');
      const extractedToken = token.split(' ')[2];
      const decodeToken = await this._authService
        .verifyJwt(extractedToken)
        .then((data) => data);
      const { user_id } = decodeToken;

      const inventoryProductDetails =
        await this.inventoryService.getInventoryDetails(user_id);
      return inventoryProductDetails;
    } catch (error) {
      throw error;
    }
  }
}
