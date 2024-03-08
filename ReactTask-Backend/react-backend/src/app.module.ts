import { Module } from '@nestjs/common';
import { InventoryAppModule } from './Modules/InventoryModule/inventory-app.module';
import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
import dbConfig from './config/db.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    InventoryAppModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

export const dbConnection = new DataSource(dbConfig());
dbConnection
  .initialize()
  .then(() => {
    //console.log(`Data Source has been initialized!`);
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
