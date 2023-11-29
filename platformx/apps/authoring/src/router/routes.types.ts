export type UserRole =
  | "admin"
  | "editor"
  | "author"
  | "content-manager"
  | "reviewer"
  | "publisher";
export type RouteConfig = {
  path: string;
  element: React.ReactNode;
  allowedRoles?: UserRole[];
};
