# LMS
Distronix Backend Recruitment Test - LMS API

## CRUD-Using-Nodejs-PostgreSQL
This repository showcases a Learning Management System (LMS) application that demonstrates CRUD operations, statistics , and robust user authentication features. 

It leverages PostgreSQL as the database and utilizes Node.js for the backend development.

## Environment Setup
To run this project, make sure you have the following installed on your system.

1: [Visual Studio Code] (https://code.visualstudio.com/)

2: [PostgreSQL] (https://www.postgresql.org/download/)

3: [Nodejs] (https://nodejs.org/en/download/)


Before moving forward, confirm the NodeJs installing by checking its version with the 'node -v' command.
Also check that you have NPM installed with the 'npm -v' command.

Next, check the installation of PostgreSQL database with 'postgres --version' command and check that its running with 'psql --version' command.

## Creating Database
You can either create a database using [pgAdmin](https://www.pgadmin.org/download/) or straight up use raw SQL. pgAdmin comes with an easy to follow UI. 

In order to create database using raw SQL queries, all you need to do is to do is connect to Postgres using 'psql -U postgres' command. Later, you can execute SQL queries from within terminal.
e.g.

During Creating Database Set your datase credentials as given below So you don't need to change in databasedb.js file and other places where database crendential is imported: 

{``` 
  host: localhost,
  user: "shubhamkumar,
  port: 5432,
  password: shubham123,
  database: shubhamkumar```
}

## Connecting to Database
Connecting to PostgreSQL:
      ```psql -U postgres```
      
Creating shubhamkumar as Database:
      ```CREATE DATABASE shubhamkumar;```

Connecting to recently created Database:
      ```\c shubhamkumar```

Create Table: Check is it working creating table (you can ignore):

CREATE TABLE table_name (
  field_name TYPE CONSTRAINTS,
  field_name TYPE(args) CONSTRAINTS
  ...
);

## Running the Application
To run the application, move to the source folder i.e. the folder contains 'package.json' if not go to 'app.js' file and execute ```npm install```

To install Express and Nodemon for a Node.js project, you can use npm (Node Package Manager) commands.
If you haven't already initialized your Node.js project ```npm init```

Follow the prompts to create a package.json file if you don't have one.
```
   npm install express --save
   npm install nodemon --save-dev
```

"npm install express --save":
This installs the Express.js framework and adds it as a dependency to your project.
The --save flag updates your package.json file with the dependency information.

"npm install nodemon --save-dev": 
This installs Nodemon as a development dependency and also updates your package.json file. 

Nodemon is a utility that helps automatically restart your Node.js application when you make code changes during development.

After running these commands, you can start your Node.js application with Nodemon using:
```npx nodemon app.js```

Nodemon will monitor your files for changes and restart the server automatically when changes are detected, making the development process smoother.

The source folder also contains 'app.js' file. Execute ```node app.js``` to run the application.

Also check 6 database table created if not you can also use ```npx nodemon app.js``` to run the application

If everything goes well, you should see 'SERVER STARTED SUCCESSFULLY'. Move to (http://localhost:1000/) in default browser.

But it is working after authentication via token generated during log in.

## API Testing : 
Now install thunder client in visual studio to Thunder Client is a popular REST client extension for Visual Studio Code. 

It can be used to send HTTP requests and test APIs.
While it doesn't directly help with handling createdAt and updatedAt timestamps in PostgreSQL and Node.js, it can be a useful tool for testing your API endpoints, including those that involve creating or updating records with these timestamps.

## Sending HTTP Requests: 
Thunder Client allows you to easily create and send HTTP requests to your API endpoints. You can specify the HTTP method, headers, request body, and URL parameters.

## 1) POST -> localhost:1000/profile/signup/

body : JSON 
   {```
    "user_name":"sk001",
    "email":"sk001@gmail.com",
    "password":"123001"```
    }

Then click send and you got user_credential data in table. 

After signup : now again go to new request : for login where login count is updated in user credentials

## 2)  POST -> localhost:1000/profile/login/

body : JSON 
{```
  "email":"sk001@gmail.com",
    "password":"123001"```
 }
 
After request send in terminal a token is generated save that token for authentication.

For further request which is proceeded after authentication : 
Save Token for further request go to header Add Authorization in header and token in values.

## 3) POST -> localhost:1000/profile/logout/
Click send and it will be successfully logout.

## 4) NOW CRUD FOR users :

i) POST -> ```localhost:1000/users/```

Body - JSON :

{```
  "name": "Ram",
  "category": "Student",
  "registration_date": "15-09-2023",
  "user_id":"1"```
  }

ii) GET -> ```localhost:1000/users/```

iii) GET BY ID :  ```localhost:1000/users/1```

iv) PUT BY ID : ``` localhost:1000/users/1```

v) DELETE BY ID :  ```localhost:1000/users/1```

## 5) NOW CRUD FOR books :

i) POST -> ```localhost:1000/books/```

Body - JSON :

 {```
    "title": "book",
    "author": "Shubham",
    "isbn": 100000,
    "subject": "Computer",
    "publication_date": "25-10-2005"```
  }

ii) GET -> ```localhost:1000/users/```

iii) GET BY ID :  ```localhost:1000/books/1```

iv) PUT BY ID :  ```localhost:1000/books/1```

v) DELETE BY ID :  ```localhost:1000/books/1```

## 6) NOW for multiple copies of same book 

 i)POST USING ID -> ```localhost:1000/books/copies/1```
 
 Body - JSON :
 
 {```
    "book_id" : 5```
  }
  
 ii)  DELETE USING ID -> ```localhost:1000/books/copies/1```
 
 iii) GET USING ID -> ```localhost:1000/books/copies/1```

## 7) NOW CRUD FOR records :
i) POST -> ```localhost:1000/records/```

Body - JSON :

{```
  "issue_date": "10-08-2023",
  "return_date": "25-09-2023", 
  "book_id": 1, 
  "users_id": 1 ```
}

ii) GET -> ```localhost:1000/records/```

iii) GET BY ID :  ```localhost:1000/records/1```

iv) PUT BY ID :  ```localhost:1000/records/1```

v) DELETE BY ID :  ```localhost:1000/records/1```

## 8) NOW CRUD FOR payments :

i) POST -> ```localhost:1000/payments/```

Body - JSON :
{```
    "amount": 400.00,                  
    "payment_date": "20-05-2023",
    "book_id": 1,           
    "users_id": 1```
  }

ii) GET -> ```localhost:1000/payments/```

iii) GET BY ID :  ```localhost:1000/payments/1```

iv) PUT BY ID : ```localhost:1000/payments/1```

v) DELETE BY ID : ```localhost:1000/payments/1```

## 9) Stats API :

GET request ->
```
localhost:1000/stats/most-active-user/
localhost:1000/stats/total-lent-book/
localhost:1000/total-book/
localhost:1000/most-available-book/
localhost:1000/latest-book/
localhost:1000/oldest-book/
localhost:1000/highest-lent-book/
localhost:1000/total-user/

```

