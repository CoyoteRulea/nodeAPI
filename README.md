# nodeAPI
## Welcome to nodeAPI to test AUTH on nodeJS

### To execute this test please go into folder where you want to install and follow the next steps
1. Clone repo
`git clone https://github.com/CoyoteRulea/nodeAPI.git`

2. Install all dependencies and packages
`npm install`

3. Check if your config at **.env** is ok

4. Check if your config at **app/config/db.config.js** is ok

5. Run DB Update to create tables with
`npm run dbupdate`

This create tables and a default user with values at .env file.

6. Create listen server

Standard server
- without auth run `npm run start`
- with auth run `npm run authstart`

For dev mode
- without auth run `npm run dev`
- with auth run `npm run authdev`

7. Enjoy

### You are able to found the API request at
>https://www.postman.com/coyoterulea/workspace/nodeapi/overview

#### Request without AUTH
Those are located at nodeAPI requests
- Save Item

Add one item to inventory list and need to have following body request params like json
```
{
    "model"   : "Civic",
    "brand"   : "Honda",
    "type"    : "S",
    "wheels"  : 4,
    "power"   : "200 cc"
}
```
- Get Inventory List

Get the inventory list.

#### Request with AUTH
Those are located at AUTH nodeAPI requests

- Authenticate

Check if user/pass is valid in this API. You need to run this call first to obtain a valid refreshToken 
Inputs:
```
{
    "user_name" : "admin",
    "password"  : "admin123"
}
```
Outputs: accessToken, refreshToken

- Create User

Creates a new user with values assigned.
```
{
  "user_name"  : "vmendez5",
  "password"   : "password5",
  "first_name" : "Victor", 
  "last_name"  : "Mendez",
  "email"      : "victor.ivan.mendez@gmail.com",
  "token"      : "GENERATED REFRESH TOKEN"
}
```

- Save Item

Add one item to inventory list and need to have following body request params like json
```
{
    "model"   : "Civic",
    "brand"   : "Honda",
    "type"    : "S",
    "wheels"  : 4,
    "power"   : "200 cc",
    "token"      : "GENERATED REFRESH TOKEN"
}
```

- Get Inventory List

Get the inventory list.
```
{
    "token"      : "GENERATED REFRESH TOKEN"
}
```

##### Those request below are only for test purposes they haven't AUTH validation
- Get tokens

Get the current token list active

- Validate token

Check if a requested token is valid
```
{
    "token"      : "GENERATED REFRESH TOKEN"
}
```