# Speed Game

## CS 3750 Final Project

### Description

For our final project we built a playable speed game, that included both California Speed, and Regular Speed. This implementation also included a full login system, a high schores, and a chat room.

### Technologies Used

For this project, we built the game using the MERN stack, meaning it was comprised of

- Mongo DB - Our Data Store

- Express.js - Backend Javascript framework to help with the backend APIs

- React.js - Frontend Javascript framework that allowed us to seamlessly create web pages that incorporated html, css, and javascript.

- Node.js - Another backend Javascript framework that allowed us to build the backend using Javascript

Also used, was

- Socket.io - A javascript framework that allowed us to easily create and use web sockets in our speed project.

### Challenges Conqured

This project had many unique challenges that caused for unique solutions.

First and foremost, we had to figure out how to create separate rooms for the players, as well as figuring out how to keep them separate from everyone else.

We solved this thanks to Socket.io as it provided an easy way to setup different rooms.

----------------------------------------

We also had to figure out how create the logic of the speed game ensuring that each player only saw their deck and that the viewer was able to see everything.

This again was solved by using Socket.io in order to keep a consistent connection and communicate with the separate clients and server.

----------------------------------------

Last was figuring out how to drag the cards during the game and ensure that the game board updated when cards were dragged onto the board.

Through creative engineering we were able to get this taken care of.

### Screenshots







