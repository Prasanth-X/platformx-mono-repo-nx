// ErrorPage.tsx
import React from 'react';

interface ErrorProps {
  errorCode: number;
  errorMessage: string;
}

const Error  = ({ errorCode, errorMessage }:ErrorProps) => {
  return (
    <div>
      <h1>Error {errorCode}</h1>
      <p>{errorMessage}</p>
    </div>
  );
};

export default Error 
