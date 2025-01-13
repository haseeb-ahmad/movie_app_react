import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./pages/SignIn";
import MovieList from "./pages/MovieList";
import MovieForm from "./pages/MovieForm";
import ProtectedRoute from "./components/ProtectedRoute";

const routes = [
  { path: "/movies", element: <MovieList /> },
  { path: "/movie/new", element: <MovieForm /> },
  { path: "/movie/:id/edit", element: <MovieForm isEdit={true} /> },
];

function App() {
  const token = localStorage.getItem("token");
  const isAuthenticated = !!token;
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/movies" /> : <SignIn />} 
        />
        {routes.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={<ProtectedRoute>{element}</ProtectedRoute>}
          />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
