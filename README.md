# Task Manager Application

This is a task manager application that allows users to perform CRUD (Create, Read, Update, Delete) operations on tasks.The Context API is utilized in React applications for handling state management. Users can register themselves using their email as a unique identifier. Once registered, users can log in and manage their tasks. The application also provides a search functionality for tasks. Users can also update their profile details such as name and password.

## Getting Started

To run the application, follow these steps:

1. Clone the repository.
2. Install the dependencies using the command `npm install`.
3. Start the JSON server by running the command `npx json-server data/db.json -m ./node_modules/json-server-auth -r data/routes.json --port 8080`.
4. Start the application using the command `npm run start`. The application will be accessible at `http://localhost:3000`.

## Styling

The application uses Tailwind CSS for styling, providing a modern and responsive design. It also includes a dark mode feature for enhanced user experience.

## Deployment

The application has been deployed to a server and is accessible at [https://task-manager-niranjan.netlify.app/login](https://task-manager-niranjan.netlify.app/login).

Please feel free to explore the application and provide any feedback or suggestions.