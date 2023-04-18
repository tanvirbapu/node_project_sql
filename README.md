# Node_Boilerplate

Node version : v16.17.0
NPM version : 8.15.0

> npm install : will install all dependencies

> SQL Dump : contains the schema creation sql script

> npm start : to start the server on post 81

## Database config

data/database-config.js: Contains database configurations

DB name : demo

Username : root

Password : 1234

## Project Structure

```
src\
 |--config\          # Environment variables and configuration related things
 |--controllers\     # Route controllers (controller layer)
 |--data\            # Data layer
    |--data-access\  # SQL function calls
    |--models\       # Sequelize models
 |--routes\          # Routes
 |--utils\           # Utility functions
    |--validators\   # Express route validators
 |--validations\     # Request data validation schemas
 |--app.js           # Express app and App entry point
```

**Routes**:\
`POST /sign-up` - register\
`POST /login` - login\
`POST /get-otp` - get OTP on email or mobile\
`POST /verify-otp` - verify requested OTP\
`POST /update-password` - update password after forgot password\
`POST /logout` - logout\
`POST /get-users` - get all users list\
`POST /get-user-details` - get specific user details\
`POST /delete-user` - delete user

## Logging

Morgan is used for logging and .log is created with rotating functionality where limit is 10MB

## Project structure inspired by:
https://github.com/binitghetiya/express-sequelize-api-boilerplate
