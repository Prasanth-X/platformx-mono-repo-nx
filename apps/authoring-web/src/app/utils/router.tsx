import React, { FC } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import ErrorBoundary from '../Common/ErrorBoundary';

interface PropType {
  component: React.FC;
  isAuthenticated: boolean;
}

const PrivateRoute: FC<PropType> = ({
  component: Component,
  isAuthenticated,
}) => {
  const navigate = useNavigate();
  if (isAuthenticated) {
    return (
      <>
        <Component />
      </>
    );
  } else return <Navigate to='/page-list' />;
};

const PublicRoute: FC<PropType> = ({
  component: Component,
  isAuthenticated,
}) => {
  const navigate = useNavigate();
  if (isAuthenticated) return <Navigate to='/page-list' />;
  return (
    <>
      <Component />
    </>
  );
};

export { PrivateRoute, PublicRoute };
