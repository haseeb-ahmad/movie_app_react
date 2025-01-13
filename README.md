# Movie CRUD App

This is a Movie CRUD application built with **React JS**, **Vite**, **Tailwind CSS** for styling, and **Redux Toolkit** for global state management. It allows users to manage a movie collection with features for creating, viewing, editing, and deleting movies.

## Features

### Login Page
- If the user is unauthorized, an unauthorized message will be shown.
- If the user is authorized, they will be redirected to the movie list page.

### Movie List Page
- Displays a message when there are no movies in the list.
- Includes a "Create Movie" button to add a new movie.
- Displays movie cards for each movie with an "Edit" and "Delete" option.

### Movie CRUD Operations
- **Create**: Add a new movie to the list.
- **Read**: View the list of movies.
- **Update**: Edit movie details.
- **Delete**: Remove a movie from the list.

## Technologies Used

- **React JS**: A JavaScript library for building user interfaces.
- **Vite**: A fast development build tool.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **Redux Toolkit**: A library for managing global state in React applications.

## Project Setup

Follow these steps to set up the project locally.

### 1. Clone the repository

First, clone the repository to your local machine.

```bash
git clone https://github.com/haseeb-ahmad/movie_app_react.git
```

```bash
cd movie-crud-app
```

### 2. Install dependencies

Run the following command to install all the project dependencies:

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory. Add your API URL or other sensitive information as required.

Example:

```
VITE_API_URL=https://your-api-url.com
```

### 4. Run the development server

Start the local development server with the following command:

```bash
npm run dev
```

Once the server is running, open your browser and visit:

```
http://localhost:3000
```

### 5. For Building the App for Production

To build your app for production, use the following command:

```bash
npm run build
```

---


## Acknowledgements

- **React JS**: [React](https://reactjs.org/)
- **Vite**: [Vite](https://vitejs.dev/)
- **Tailwind CSS**: [Tailwind CSS](https://tailwindcss.com/)
- **Redux Toolkit**: [Redux Toolkit](https://redux-toolkit.js.org/)


