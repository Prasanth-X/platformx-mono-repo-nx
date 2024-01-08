import React from 'react';

export const PageHeader = ({ title }: { title: string }) => {
  return React.createElement(
    'header',
    null,
    React.createElement('h1', null, title)
  );
};
