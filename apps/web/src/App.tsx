import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CatalogPage from "./pages/CatalogPage";
import LoginPage from "./pages/LoginPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/catalogue" element={<CatalogPage />} />
      <Route path="/connexion" element={<LoginPage />} />
    </Routes>
  );
}
