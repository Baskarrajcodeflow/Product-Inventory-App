/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { RegistrationService } from '../../Services/registeration/registeration.service';
import { userRegistrationDto } from 'src/Dto/user-registration.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@ApiTags('User Registration Detail Api')
@Controller('UserRegistrationDetailApi')
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) {}
  //--------------------------User Registration Controller-----------------------------//
  @Post('addUser')
  async addUser(@Body() registrationData: userRegistrationDto) {
    await this.registrationService.registerUserDetails(registrationData);
  }
  //--------------------------Check User Registration Controller-----------------------------//
  @ApiBearerAuth('JWT-auth')
  @Get('checkUserLoginCredentials')
  async checkUserLoginCredentials(
    @Query('user_name') user_name: string,
    @Query('user_password') user_password: string,
  ) {
    const checkUserLoginCredentials =
      await this.registrationService.checkUserLoginCredentials(
        user_name,
        user_password,
      );
    return checkUserLoginCredentials;
  }
}
