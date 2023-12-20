import { Dashboard } from "@mui/icons-material"; 
import { RouteConfig } from "./routes.type";
import { ProtectedRoute } from "./ProtectedRoute";

export const routes: RouteConfig[] = [
    {
        path: "/dashboard",
        element:  <ProtectedRoute category="dashboard" subCategory="dashboard" name="dashboard" >   Dashboard </ProtectedRoute>,
        
      },
]