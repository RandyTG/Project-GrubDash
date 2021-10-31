# Project-GrubDash

Server API for managing GrubDash requests

## Links

* [Live App]()
* [App documentation](https://github.com/Thinkful-Ed/starter-grub-dash-front-end)

## Technology

### Built With:
* Node.js
   * Express server framework
   * CORS for safer request headers  
* Testing on Mocha framework using Chai and Supertest

## Installation

1. Run `npm install` to install project dependencies.
1. Run `npm run start` to start your server.

The deafult server locations will be `http://localhost:5000`.

## API Documentation

All get requests return JSON response.
All post requests require application/json body, and return JSON response.

### Endpoints for data entries:

**GET Dishes:** `GET /api/dishes`
* Returns an array of objects containing all of the dishes.
* Adding URL parameter `/:dishId` will return the dish with the corresponding ID or an error if none is found.

**GET Orders:** `GET /api/orders`
* Returns a list of orders with their respective dishes.
* Adding URL parameter `/:orderId` will return the order with the corresponding ID or an error if none is found.

### Enpoints for data management:

**POST Dishes:** `POST /api/dishes`
* Creates a new dish. The request body must have
    * `name`: string
    * `description`: string
    * `image_url`: string
    * `price`: number greater than 0
        
**POST Orders:** `POST /api/orders`
* Creates a new order. The request body must have
    * `deliveryTo`: string containing address for delivery
    * `mobileNumber`: string
    * `dishes`: array containing objects of dishes in order. Order MUST have a non zero integer of quantity of dish ordered.
        
**PUT Dishes:** `PUT /api/dishes/:dishId`
* Updates the dish specified by the given URL parameter if it exists. The request body has the same requirenments for creating a dish.

**PUT Orders:** `PUT /api/orders/:orderId`
* Updates the order specified by the given URL parameter if it exists. The request body has the same requirenments for creating a order.

**DELETE Orders:** `DELETE /api/orders/:orderId`
* Deletes corresponding order if it exists only if the status of the order is pending
