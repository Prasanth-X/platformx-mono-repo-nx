import { Error } from "@platformx/utilities";
import { ProtectedRoute } from "./ProtectedRoute";
import { RouteConfig } from "./routes.type";
import { Dashboard } from '@platformx/dashboard';
import { UserListing } from '@platformx/user-management';
import { Content } from "@platformx/content";

export const routes: RouteConfig[] = [
  {
    path: "/",
    element: <ProtectedRoute category="dashboard" subCategory="dashboard" name="dashboard" > <Dashboard /> </ProtectedRoute>,

  },
  {
    path: "/dashboard",
    element: <ProtectedRoute category="dashboard" subCategory="dashboard" name="dashboard" > <Dashboard /> </ProtectedRoute>,
  },
  {
    path: '/user-management/user-list',
    element: (
      <ProtectedRoute
        category="user-list"
        subCategory="user-list"
        name="user-list"
      >
        {' '}
        <UserListing></UserListing>
      </ProtectedRoute>
    ),
  },
  // {
  //   path: "/content",
  //   element: <ProtectedRoute category="content" subCategory="content" name="page" >  <Content></Content> </ProtectedRoute>,

  // },
  // {
  //   path: "/dashboard",
  //   element: <ProtectedRoute category="dashboard" subCategory="dashboard" name="dashboard" >  Dashboard </ProtectedRoute>,

  // },
  // {
  //   path: "content/article",
  //   element: (
  //     <ProtectedRoute name='article' subCategory='article' category='content'>
  //       <Content />
  //     </ProtectedRoute>
  //   ),
  // },
  // {
  //   path: "/error",
  //   element: <Error errorCode={404} errorMessage="Page not found" />,
  // }
];
