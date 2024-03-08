/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { HttpStatus, Injectable } from '@nestjs/common';
import {
  productQuantityDto,
  userInventoryDTO,
} from 'src/Dto/user-registration.dto';
import { responseInterface } from 'src/Interface/response.interface';
import { dbConnection } from 'src/app.module';

@Injectable()
export class InventoryProductsDetailsService {
  //--------------------------Insert User Inventory Products Service-----------------------------//
  insertInventoryDetails = async (
    inventoryDetails: userInventoryDTO,
    user_id: number,
  ): Promise<responseInterface> => {
    try {
      const dbName = `server_db`;
      const tableName = `user_inventory_table`;
      dbConnection.query(`
            INSERT INTO ${dbName}.${tableName} 
            (product_name,
            product_description,
            product_quantity,
            product_price,
            user_id
            )
            VALUES
            (
            '${inventoryDetails?.['product_name']}',
            '${inventoryDetails?.['product_description']}',
            '${inventoryDetails?.['product_quantity']}',
            '${inventoryDetails?.['product_price']}',
            ${user_id}
            )
            `);
      return {
        statusCode: HttpStatus.OK,
        message: 'Post Successful',
      };
    } catch (error) {
      throw error;
    }
  };
  //--------------------------Update User Inventory Products Service-----------------------------//
  updateInventoryDetails = async (productQuantity: productQuantityDto) => {
    try {
      const dbName = `server_db`;
      const tableName = `user_inventory_table`;
      await dbConnection.query(`
       UPDATE ${dbName}.${tableName} 
       SET
       product_quantity = ${productQuantity?.['product_quantity']}
       WHERE
       id = ${productQuantity?.['id']}
       `);
      return {
        statusCode: HttpStatus.OK,
        message: 'Update Successful',
      };
    } catch (error) {
      console.log(error);

      throw error;
    }
  };
  //--------------------------Get User Inventory Products Service-----------------------------//
  getInventoryDetails = async (user_id: number): Promise<any> => {
    try {
      const dbName = `server_db`;
      const tableName = `user_inventory_table`;
      const getInventoryDetails = await dbConnection.query(`
      SELECT * FROM ${dbName}.${tableName} WHERE user_id = ${user_id}
      `);
      return {
        statusCode: HttpStatus.OK,
        message: 'Data Received',
        responseData: getInventoryDetails,
      };
    } catch (error) {
      throw error;
    }
  };
}
