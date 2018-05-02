# Bamazon Node App

## Overview
Amazon-like storefront with the MySQL.

## App Specifications
### Bamazon Customer
* App displays all products
* App asks users what product they want to buy and how many.
* App updates store quantity and informs user the total cost of purchase

### Bamazon Manager
* App gives the user the following options:
  * View Products for Sale
  * View Low Inventory
  * Add to Inventory
  * Add New Product

## NPM Packages Used
* inquirer
* mysql
* cli-table

## How to Run
* Download repository
* Run bamazon.sql to create and populate bamazon tables on your database (if not already created)
*Install npm packages
* Run applications:
  * "node bamazonCustomer.js"
  * "node bamazonManager.js"

### Examples
## Screenshots
Customer - Buy Product

![bamazoncustomer](https://user-images.githubusercontent.com/32913276/39552680-3c1b52fe-4e38-11e8-80ef-14f380a886bd.png)

Manager - Options

![bamazonmanager_actions](https://user-images.githubusercontent.com/32913276/39554175-4fe00530-4e3f-11e8-96b3-c31f55bbec0f.png)

Manager - List Products

![bamazonmanager_list](https://user-images.githubusercontent.com/32913276/39554178-5035425c-4e3f-11e8-9d8a-bb8574f5e5f9.png)

Manager - Show Low Inventory

![bamazonmanager_low](https://user-images.githubusercontent.com/32913276/39554179-5048e83e-4e3f-11e8-9cd8-ddbcee422124.png)

Manager - Add Inventory

![bamazonmanager_addquantity](https://user-images.githubusercontent.com/32913276/39554177-5025cdae-4e3f-11e8-95cb-0a3b0c42d9a0.png)

Manager - Add New Product

![bamazonmanager_addproduct](https://user-images.githubusercontent.com/32913276/39554176-50118d62-4e3f-11e8-98eb-b200c11532a7.png)