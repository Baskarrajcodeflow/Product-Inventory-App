/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { RegistrationController } from './Controllers/registeration/registeration.controller';
import { RegistrationService } from './Services/registeration/registeration.service';
import { InventoryProductsDetailsController } from './Controllers/inventory-products-details/inventory-products-details.controller';
import { InventoryProductsDetailsService } from './Services/inventory-products-details/inventory-products-details.service';
import { GenerateInvoiceService } from './Services/generate-invoice/generate-invoice.service';
import { GenerateInvoiceController } from './Controllers/generate-invoice/generate-invoice.controller';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './AuthService/auth-service.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret:
        '05b6b4a13eaaa8f6e4bf14b352fbf6dbaf102d1c1c25e4261faee6eae89a56ee', // Provide your secret key here
      // Other JWT configuration options
    }),
  ],
  controllers: [
    RegistrationController,
    InventoryProductsDetailsController,
    GenerateInvoiceController,
  ],
  providers: [
    RegistrationService,
    InventoryProductsDetailsService,
    GenerateInvoiceService,
    AuthService,
  ],
  exports: [],
})
export class InventoryAppModule {}
