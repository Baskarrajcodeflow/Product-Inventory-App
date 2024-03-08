/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { HttpStatus, Injectable } from '@nestjs/common';
import { responseInterface } from 'src/Interface/response.interface';
import { dbConnection } from 'src/app.module';

@Injectable()
export class GenerateInvoiceService {
  //--------------------------Generate User Products Invoice Service-----------------------------//
  GenerateInvoice = async (
    GeneratedInvoiceDetails: any,
    user_id: number,
  ): Promise<responseInterface> => {
    try {
      const dbName = `server_db`;
      const tableName = `user_generated_invoice_table`;
      const user_inventory_table = `user_inventory_table`;

      const selectMaximumData = await dbConnection.query(`
      SELECT * FROM  ${dbName}.${tableName};
      `);
      for (let i = 0; i < GeneratedInvoiceDetails.length; i++) {
        dbConnection.query(`
        INSERT INTO ${dbName}.${tableName}
        (
        invoice_id,
        product_name,
        product_description,
        product_quantity,
        product_price,
        total_price,
        user_id
            )
        VALUES
        (
        ${selectMaximumData.length + 1},
        '${GeneratedInvoiceDetails?.[i]['product_name']}',
        '${GeneratedInvoiceDetails?.[i]['product_description']}',
        '${GeneratedInvoiceDetails?.[i]['total_product_quantity']}',
        ${GeneratedInvoiceDetails?.[i]['product_price']},
        ${GeneratedInvoiceDetails?.[i]['total_price']},
        ${user_id}
        )
`);

        dbConnection.query(`
        UPDATE  ${dbName}.${user_inventory_table} 
        SET 
        product_quantity = ${GeneratedInvoiceDetails[i]['updated_Quantity']}
        WHERE id = ${GeneratedInvoiceDetails[i]['id']}
        `);
      }

      return {
        statusCode: HttpStatus.OK,
        message: 'Post Successful',
      };
    } catch (error) {
      console.log(error);

      throw error;
    }
  };
  //--------------------------Get Generated User Products Invoice Service-----------------------------//
  GetGenerateInvoiceDetailRecords = async (user_id: number) => {
    try {
      const GeneratedInvoiceDetailsArray: any[] = [];
      const dbName = `server_db`;
      const tableName = `user_generated_invoice_table`;
      const result = await dbConnection.query(`SELECT invoice_id
        FROM ${dbName}.${tableName}
        WHERE user_id = ${user_id}
        GROUP BY invoice_id
        `);

      if (result) {
        for (let i = 0; i < result.length; i++) {
          const res = await dbConnection.query(`SELECT *
                FROM ${dbName}.${tableName}
             WHERE invoice_id = ${result[i]?.invoice_id}
             
                `);
          console.log(res);
          GeneratedInvoiceDetailsArray.push(res);
        }
        return {
          statusCode: HttpStatus.OK,
          data: GeneratedInvoiceDetailsArray,
        };
      }
    } catch (error) {
      throw error;
    }
  };
}
