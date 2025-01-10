import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import MovieList from "./pages/MovieList";
import MovieForm from "./pages/MovieForm";
import ProtectedRoute from "./components/ProtectedRoute"; 

const routes = [
  { path: "/", element: <SignIn /> , nonProtective: true },
  { path: "/movies", element: <MovieList /> },
  { path: "/movie/new", element: <MovieForm /> },
  { path: "/movie/:id/edit", element: <MovieForm isEdit={true} /> },
];

function App() {
  return (
    <Router>
      <Routes>
        {routes.map(({ path, element, nonProtective}) => (
          <Route
            key={path}
            path={path}
            element={nonProtective ? element : <ProtectedRoute>{element}</ProtectedRoute> }
          />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
