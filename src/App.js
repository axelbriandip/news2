import { HashRouter, Routes, Route } from "react-router-dom";
import { Favorites, Home, Login, NewsDetail } from "./pages";
import { LoadingScreen, NavBar, ProtectedRoutes } from "./components";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import "./styles.css";

function App() {
  const isLoading = useSelector((state) => state.isLoading);

  return (
    <HashRouter>
      <NavBar />
      {isLoading && <LoadingScreen />}
      <Container className="mt-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/favorites" element={<Favorites />} />
          </Route>
        </Routes>
      </Container>
    </HashRouter>
  );
}

export default App;
