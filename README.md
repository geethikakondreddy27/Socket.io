# Mission 12 - Real-Time Chat Application using Socket.io

## Overview

A real-time chat application built using React, Node.js, Express, and Socket.io. The application enables users to communicate instantly through WebSockets, display typing indicators, and participate in separate chat rooms.

## Features

- Real-time bidirectional communication using Socket.io
- Username-based chat sessions
- Live typing indicators
- Multiple chat rooms
  - General Room
  - Tech Support Room
- Room-specific messaging
- Responsive and clean user interface

## Tech Stack

### Frontend
- React
- Vite
- Socket.io Client
- CSS

### Backend
- Node.js
- Express.js
- Socket.io
- CORS


## WebSocket Events

### Client to Server

- join-room
- send-message
- typing

### Server to Client

- receive-message
- show-typing

## Rooms

The application supports separate communication channels:

- General
- Tech Support

Messages are delivered only to users who belong to the selected room.



## Author

- Geethika Kondreddy 