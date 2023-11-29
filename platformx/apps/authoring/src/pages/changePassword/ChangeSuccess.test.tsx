import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { ChangeSuccess } from './ChangeSuccess';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('change password form', () => {
  it('renders default state', () => {
    const { getByTestId } = render(<ChangeSuccess />);
    const dashboardButton = getByTestId('dashboard-button');

    expect(screen.getByText('Congratulations!')).toBeInTheDocument();

    expect(screen.getByRole('button')).toHaveTextContent('Go to Dashboard');
    fireEvent.click(dashboardButton);
  });
});
