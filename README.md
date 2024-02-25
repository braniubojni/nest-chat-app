# Chat Application with Nest.js and React

This repository contains a chat application with real-time messaging using Nest.js for the backend and React.js for the frontend. The application allows users to join chat rooms, send and receive messages in real-time, and includes features like username entry and message timestamps.
Project Structure

- client: Contains the React.js frontend code.
- server: Contains the Nest.js backend code.

## Getting Started
### Prerequisites

- Node.js
- npm (Node Package Manager)

## Installation
1. #### git clone [https://github.com/braniubojni/nest-chat-app]
2. #### Set up the server
- Navigate to the server directory:
    - `cd server`
- Install dependencies:
    - `npm install`
- Create a .env file in the server directory and add the following:
    - `PORT=5005`
3. #### Set up the client
- Navigate to the client directory:
    - `cd ../client`
- Install dependencies:
    - `npm install`
- Create a .env file in the server directory and add the following:
    - `REACT_APP_SERVER_URL=http://localhost:5005`

## Running the Application
1. #### Start the server
- In the server directory, run the following command:
- `npm run start:dev`
2. #### Start the client
- Open a new terminal and navigate to the client directory.
- Run the following command:
- `npm run start`

## Features
### Frontend (React.js and TypeScript)
- ChatRoom component to display the chat room.
- ChatInput component for message input.
- Real-time messaging using WebSocket.
- User authentication with username.
- Display of messages with timestamps.

### Backend (Nest.js, TypeScript, WebSocket)
- Real-time communication using WebSockets.
- In-memory storage of chat messages.
- Basic user authentication.
- TypeScript for type safety.

## Bonus Features
- User avatars/profile pictures.
- Message history for newly joined users.
- Basic error handling for message delivery.

## General Guidelines
- The application follows a simplified folder structure for ease of navigation.
- The code is organized and focuses on the core features of a chat application.
