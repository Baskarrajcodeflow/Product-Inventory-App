Commands To Set Up And Execute Frontend Project:
```
To create a new react Project - npx-create-react-app
To Run a react Project - npm start
```
Commands To Set Up And Execute Backend(Nest JS) Project:
```
To Install Nest JS - npm i -g @nestjs/cli
To create a new react Project - nest new project-name
To Run a Nest JS Project - npm run start:dev
```
Commands For Database(MYSQL):
```
Create Database:
Database Name - server_db(Can Chnage it according to the Organization needs)
Tables Used in Database:
1.user_registration_table
2.user_inventory_table
3.user_generated_invoice_table
```
Commands For Table(MYSQL):
1.user_registration_table
```
create table user_registration_table 
(
id int primary key auto_increment,
user_name varchar(50) not null,
user_email_id varchar(50) not null,
user_password int not null
)
```
2.user_inventory_table
```
CREATE TABLE user_inventory_table (
id int NOT NULL AUTO_INCREMENT,
product_name varchar(100) NOT NULL,
product_description varchar(100) NOT NULL,
product_quantity int NOT NULL,
product_price int NOT NULL,
user_id int NOT NULL,
PRIMARY KEY (id)
) 
```
3.user_generated_invoice_table
```
CREATE TABLE user_generated_invoice_table` (
user_id int NOT NULL,
product_name varchar(100) NOT NULL,
product_description varchar(100) NOT NULL,
product_quantity int NOT NULL,
product_price int NOT NULL,
total_price int NOT NULL,
invoice_id int NOT NULL
)
```
## ENV File For Backend (Nest JS)
```
# PORT
PORT=3001

# DATABASE CONFIGRATION VARIABLES
## DATABASE TYPE
DB_TYPE='mysql'
DB_PORT=3306
DB_HOST= 127.0.0.1
DB_USERNAME= root
DB_PASSWORD ='db@12345'
```
# Login Page
![Screenshot 2024-03-08 104214](https://github.com/Baskarrajcodeflow/Product-Inventory-App/assets/149696470/1b01e5f6-b8db-4f30-b37a-aeea1029873e)
# Sign Up Page
![Screenshot 2024-03-08 104423](https://github.com/Baskarrajcodeflow/Product-Inventory-App/assets/149696470/309cd476-df3c-40a7-96d4-9063a79dba8c)
# All User Inventory Product Details
![Screenshot 2024-03-08 105902](https://github.com/Baskarrajcodeflow/Product-Inventory-App/assets/149696470/09ab74f3-52ce-4b79-8806-0be6f728114c)
ts 
# Add User Inventory Product
![Screenshot 2024-03-08 105123](https://github.com/Baskarrajcodeflow/Product-Inventory-App/assets/149696470/72c2165a-1f0c-4fad-a7f7-870303d274ef)
# Update Product Quantity
![Screenshot 2024-03-08 110942](https://github.com/Baskarrajcodeflow/Product-Inventory-App/assets/149696470/f7146110-c0bc-4f5d-bf20-26fa4cf525fa)
# Add Products For Invoice
![Screenshot 2024-03-08 110032](https://github.com/Baskarrajcodeflow/Product-Inventory-App/assets/149696470/670a009e-16af-47c5-b2e2-5df99b00e12a)
# Generate Invoice For Selected Products
 ![Screenshot 2024-03-08 110135](https://github.com/Baskarrajcodeflow/Product-Inventory-App/assets/149696470/fc45d5ad-fded-4e3c-89f1-798b8094c207)
# Generated User Invoice Records
![Screenshot 2024-03-08 110703](https://github.com/Baskarrajcodeflow/Product-Inventory-App/assets/149696470/0e8829cb-915d-45b3-92c7-cfdf0053b826)
# Swagger For API Testing
![Screenshot 2024-03-08 114036](https://github.com/Baskarrajcodeflow/Product-Inventory-App/assets/149696470/82400c8a-0944-41c0-8faa-e2314c6c7c83)

