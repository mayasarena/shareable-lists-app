# Study-Tracker
Welcome to the Shareable Lists App, a web application for managing lists. This repository contains both the frontend and backend components of the List App.

## Features
Live updates of a list using socket.io:

![gif1](https://github.com/mayasarena/shareable-lists-app/assets/42900077/50b4ad61-322a-489c-8928-86dcb38d2ff3)

Creating a new list and task, deleting a list:

![gif2](https://github.com/mayasarena/shareable-lists-app/assets/42900077/5ca46c14-e0ba-4b59-a9af-f9b6e90b0f52)

Editing a list and task:

![gif3](https://github.com/mayasarena/shareable-lists-app/assets/42900077/eeb04fbd-7a3f-4c99-a90d-1caa5949474e)

- **User Authentication**: Signup, login, and logout functionality with form validation and error handling.
- **List Management**: Create, update, delete, and view lists with dynamic rendering.
- **Task Management**: Add, edit, delete, and mark tasks as completed within lists.
- **List Sharing**: Share lists with other users by email or username.
- **Real-time Updates**: Utilize WebSockets to receive real-time updates on list modifications.


## Technologies Used

### Frontend
- **React.js**: JavaScript library for building user interfaces.

### Backend
- **Node.js**: JavaScript runtime for building scalable network applications.
- **Express.js**: Web application framework for Node.js.
- **PostgreSQL**: Relational database management system.
- **Socket.IO**: Library for real-time web applications.
- **Firebase Admin SDK**: SDK for authentication and Firebase services.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js installed on your local machine.
- PostgreSQL database server installed and running.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/mayasarena/shareable-lists-app.git
   ```
2. Navigate to the project directory
      ```sh
   cd shareable-lists-app
   ```
3. Install NPM packages for frontend and backend
  ```sh
  cd frontend
  npm install
  cd ../backend
  npm install
  ```
### Configuration

1. Set up your PostgreSQL database and update the database configuration in the backend .env file.
2. Configure Firebase authentication settings in the backend.

### Starting the Application
1. Start the backend server
   ```sh
   cd backend
   npm start
   ```
2. Start the frontend
   ```sh
   cd frontend
   npm start
3. Navigate in your browser to wherever the frontend development server was deployed (http://localhost:####)

