﻿## 😸 Exploding Kitten 

## Introduction
A mern stack application for The objective of this exercise is to build a web-based game. assignments within an organization.The application allow users to play the game.

## Features
The key features of application.

- validation and error handling for API requests
- authentication and authorization mechanisms to ensure secure access to the API endpoints
- APIs for retrieving task statistics, such as Update score and Leaderboard


## Deployed link
[link](https://emtr-frontend-srinivasgokarla.vercel.app/)

## Installation or How to run the app
I created cloud database using MongoDb Atlas. So, if you want to run our code then please read the instructions below :
- Clone our repository `https://github.com/srinivasGokarla/Emitrr`
- Open the code in your VS code, open Backend folder in the terminal by running `cd Backend`
-Now run `npm install` or `npm i` which will install all the required packages of node
- After installation, now run `npm run server` and  you will see `server is listening on 5000` 
- Simlutaniously, open a new terminal and run `cd frontend` by which you get into frontend folder
- Now here, run `npm install` or `npm i` which will install all the required packages of react aswell
- After installation, now run `npm start` and  you will see a new window will be opening in the default browser which is running on port `http://localhost:3000`
- Open MongoDb compass and url `mongodb://localhost:27017/todo` which will create database collection named todo
- Now you see app running, you can click on `Register` to sign in and after that you will be redirected to Home page where you can play the game and enjoy.

## Task Description
 This will be an online single-player card game that consists of 4 different types of cards

- Cat card 😼
- Defuse card 🙅‍♂️
- Shuffle card 🔀
- Exploding kitten card 💣 

There will be a button to start the game. When the game is started there will be a deck of 5 cards ordered randomly. Each time user clicks on the deck a card is revealed and that card is removed from the deck. A player wins the game once he draws all 5 cards from the deck and there is no card left to draw. 

##  Rules –
- If the card drawn from the deck is a cat card, then the card is removed from the deck.
- If the card is exploding kitten (bomb) then the player loses the game.
- If the card is a defusing card, then the card is removed from the deck. This card can be used to defuse one bomb that may come in subsequent cards drawn from the deck.
- If the card is a shuffle card, then the game is restarted and the deck is filled with 5 cards again.


## Usage
As there are some validations please follow this when using -
 - Regsiter first with name, username, email and password
 - Name should be `Alphabets only`
 - username should be having `atleast one number or one alphabet`
 - After registering anytime you can logout and login with your credentials
 - Play the game By  clicking `Show Card` button
 



## API Endpoints
Backend Applications provide a list of API endpoints
- GET /users/leaderboard - retrieve all users on leaderboard
- PATCH /users/updatescore/:userId - Update the score of the User
- POST /users/register - registering into app
- POST /users/login - login into app

## Technology Stack
List and provide a brief overview of the technologies used in the project.

- MongoDB
- Express JS
- React JS
- Node JS
 
 ### Dependencies and packages

#### Backend
- `express-validator` <br/>
   used for validation
- `mongoose`<br/>
  connecting MongoDB to the Node js server
- `jsonwebtoken`<br/>
  generate a token for securely transmitting information
- `nodemon`<br/>
  It monitors your project and automatically restarts when detects any changes.
- `cors`<br/>
  allowing browser should permit loading resources


#### Frontend
- `axios`<br/>
  JavaScript library to make HTTP requests or fetching data
- `moment` <br/>
  for displaying dates and times in JavaScript
- `react-router-dom`<br/>
  implementaion of dynamic routing 
- `react-toastify`<br/>
  pacakge used to display backend messages
- `bootstrap.min.css`<br/>
  a file which I used from `bootswatch` free theme for bootstrap to style the app components like for headers, forms, buttons etc.

#### Cloud Deployment

- Render
used Render for deploying the MongoDB (database), node js (Backend).
- vercel 
used vercel for deploying reactjs(frontend)
#
