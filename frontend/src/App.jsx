import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import DoktoriPage from "./pages/DoktoriPage";
import PacijentiPage from "./pages/PacijentiPage";
import LekoviPage from "./pages/LekoviPage";
import ReceptiPage from "./pages/ReceptiPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/registracija" element={<RegisterPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doktori"
          element={
            <ProtectedRoute>
              <DoktoriPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/pacijenti"
          element={
            <ProtectedRoute>
              <PacijentiPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/lekovi"
          element={
            <ProtectedRoute>
              <LekoviPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recepti"
          element={
            <ProtectedRoute>
              <ReceptiPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;