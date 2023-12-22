import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Dashboard } from "@mui/icons-material"; 
import { ProtectedRoute } from "./ProtectedRoute";

export const routes = [
  {
    path: "/",
    element: (
      <ProtectedRoute category="dashboard" subCategory="dashboard" name="dashboard">
        <Dashboard />
      </ProtectedRoute>
    ),
  }, 
];

const ReactRouterConfig = () => {
  return (
    <Router>
      <Routes>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={route.element}
          />
        ))}
      </Routes>
    </Router>
  );
};

export default ReactRouterConfig;
