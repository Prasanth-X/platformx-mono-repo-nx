import { Error } from "@platformx/utilities";
import { ProtectedRoute } from "./ProtectedRoute";
import { RouteConfig } from "./routes.type";

export const routes: RouteConfig[] = [
    {
        path: "/",
        element:  <ProtectedRoute category="dashboard" subCategory="dashboard" name="dashboard" >   Dashboard </ProtectedRoute>,
        
      },
      {
        path: "/error",
        element:<Error errorCode={404} errorMessage="Page not found" />,
      }
]