/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { HttpStatus, Injectable } from '@nestjs/common';
import { userRegistrationDto } from 'src/Dto/user-registration.dto';
import { responseInterface } from 'src/Interface/response.interface';
import { dbConnection } from 'src/app.module';
import { AuthService } from '../../AuthService/auth-service.service';

@Injectable()
export class RegistrationService {
  constructor(private authService: AuthService) {}
  //--------------------------User Registration Service-----------------------------//
  registerUserDetails = async (userRegistration: userRegistrationDto) => {
    try {
      const dbName = `server_db`;
      const tableName = `user_registration_table`;
      const registerUserDetails = dbConnection.query(`
        INSERT INTO ${dbName}.${tableName} 
        (user_name,
        user_email_id,
        user_password)
        VALUES
        (
        '${userRegistration?.['user_name']}',
        '${userRegistration?.['user_email_id']}',
        '${userRegistration?.['user_password']}'
        )
        `);
    } catch (error) {
      console.log(error);

      throw error;
    }
  };
  //--------------------------Check User Registration Service-----------------------------//
  checkUserLoginCredentials = async (
    user_name: string,
    user_password: string,
  ): Promise<responseInterface | any> => {
    try {
      const dbName = `server_db`;
      const tableName = `user_registration_table`;
      const loginUserNameCheck = await dbConnection.query(`
      SELECT * FROM ${dbName}.${tableName}
      WHERE
      user_name = '${user_name}'
      AND  user_password = '${user_password}'
      `);
      const loginUserPasswordCheck = await dbConnection.query(`
      SELECT * FROM ${dbName}.${tableName}
      WHERE
      user_password = '${user_password}'
      AND  user_name = '${user_name}'
      `);
      if (
        loginUserNameCheck?.length === 0 &&
        loginUserPasswordCheck?.length === 0
      ) {
        return {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Invalid Request, Please Try Again!',
        };
      } else if (loginUserNameCheck.length === 0) {
        return {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Invalid User Name Try Again!',
        };
      } else if (loginUserPasswordCheck.length === 0) {
        return {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Invalid Password Try Again!',
        };
      } else {
        const jwt = this.authService.login(
          user_name,
          user_password,
          loginUserPasswordCheck[0]?.id,
        );
        return {
          statusCode: HttpStatus.OK,
          message: 'Login Success!',
          jwt_token: await jwt.then((res) => res),
        };
      }
    } catch (error) {
      throw error;
    }
  };
}
