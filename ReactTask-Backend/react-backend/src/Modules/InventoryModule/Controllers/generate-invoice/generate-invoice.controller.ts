/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { GenerateInvoiceService } from '../../Services/generate-invoice/generate-invoice.service';
import { GeneratedInvoiceDetailsDTO } from 'src/Dto/user-registration.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthService } from '../../AuthService/auth-service.service';

@ApiTags('Generate Invoice')
@Controller('generate-invoice')
export class GenerateInvoiceController {
  constructor(
    private readonly generateInvoiceService: GenerateInvoiceService,
    private _authService: AuthService,
  ) {}
  //--------------------------Generated Product Details-----------------------------//
  @ApiBearerAuth('JWT-auth')
  @Post('GeneratedProductDetails')
  async GeneratedProductDetails(
    @Req() request: Request,
    @Body() inventoryDetails: GeneratedInvoiceDetailsDTO,
  ) {
    try {
      const token = String(request.headers.header).replace('Bearer', '');
      const extractedToken = token.split(' ')[2];
      const decodeToken = await this._authService
        .verifyJwt(extractedToken)
        .then((data) => data);
      const { user_id } = decodeToken;
      const GeneratedProductDetails =
        await this.generateInvoiceService.GenerateInvoice(
          inventoryDetails,
          user_id,
        );
      return GeneratedProductDetails;
    } catch (error) {
      throw error;
    }
  }
  //--------------------------Get Generate Invoice Detail Records-----------------------------//
  @ApiBearerAuth('JWT-auth')
  @Get('GetGenerateInvoiceDetailRecords')
  async GetGenerateInvoiceDetailRecords(@Req() request: Request) {
    try {
      const token = String(request.headers.header).replace('Bearer', '');
      const extractedToken = token.split(' ')[2];
      const decodeToken = await this._authService
        .verifyJwt(extractedToken)
        .then((data) => data);
      const { user_id } = decodeToken;
      const GetGenerateInvoiceDetailRecords =
        await this.generateInvoiceService.GetGenerateInvoiceDetailRecords(
          user_id,
        );
      return GetGenerateInvoiceDetailRecords;
    } catch (error) {
      throw error;
    }
  }
}
