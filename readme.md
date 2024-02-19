# REST API build

This is a basic REST API made using express with mongodb as the database.


## Install

    npm install

## Run the app

    npm start


# REST API

The REST API is described below.

base API URL = https://api-build.onrender.com/

## Get list of Blog Posts

### Request

`GET /blog/`

    curl -i -H 'Accept: application/json' http://localhost:7000/thing/

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 2

    []

## Create a new Blog Posts

### Request

`POST /blog`


## Get a specific Blog Posts

### Request

`GET /blog/id`



## Change a Blog Posts

### Request

`PUT /blog/id`


## Delete a Blog Posts

### Request

`DELETE /blog/id`


## Get list of pokemon

### Request

`GET /pokemon/`

    curl -i -H 'Accept: application/json' http://localhost:7000/thing/

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 2

    []

## Add a new pokemon

### Request

`POST /pokemon/`


## Get a specific pokemon

### Request

`GET /pokemon/id`



## Change a pokemon

### Request

`PUT /pokemon/id`


## Delete a pokemon

### Request

`DELETE /pokemon/id`

