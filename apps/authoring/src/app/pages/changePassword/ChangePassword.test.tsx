import React from 'react';
import {
  render,
  fireEvent,
  screen,
  cleanup,
  act,
  waitFor,
} from '@testing-library/react';
import { ChangePassword } from './ChangePassword';
import axios from 'axios';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

jest.mock('axios');

beforeEach(() => {
  axios.put = jest.fn().mockResolvedValue({
    data: {
      code: 200,
      data: { message: 'Password Changed Successfully' },
      status: 'success',
    },
  });
});

afterEach(cleanup);

describe('change password form', () => {
  it('renders default state', () => {
    const { getByTestId } = render(<ChangePassword />);

    const current = getByTestId('current') as HTMLInputElement;
    const change = getByTestId('change') as HTMLInputElement;
    const confirm = getByTestId('confirm') as HTMLInputElement;
    const submit = getByTestId('change-password-submit');

    expect(current.value).toBe('');
    expect(change.value).toBe('');
    expect(confirm.value).toBe('');
    expect(submit).toHaveClass('Mui-disabled');
  });

  it('keeps the submit button disabled until all passwords are provided', () => {
    const { getByTestId } = render(<ChangePassword />);

    const current = getByTestId('current');
    const change = getByTestId('change');
    const submit = getByTestId('change-password-submit');

    fireEvent.change(current, { target: { value: '12345678' } });
    fireEvent.change(change, { target: { value: '123456789' } });
    expect(submit).toHaveClass('Mui-disabled');
  });

  it('enable helper text when the form is filled out', () => {
    const { getByTestId } = render(<ChangePassword />);

    const current = getByTestId('current');
    const change = getByTestId('change');
    const confirm = getByTestId('confirm');
    const submit = getByTestId('change-password-submit');

    fireEvent.change(current, { target: { value: '123' } });
    fireEvent.change(change, { target: { value: '1234' } });
    fireEvent.change(confirm, { target: { value: '1234' } });
    fireEvent.click(submit);
    expect(screen.getAllByText('Minimum 8 characters')[0]).toBeInTheDocument();
  });

  it('enable error text when the form is filled out', () => {
    const { getByTestId } = render(<ChangePassword />);

    const current = getByTestId('current');
    const change = getByTestId('change');
    const confirm = getByTestId('confirm');
    const submit = getByTestId('change-password-submit');

    fireEvent.change(current, { target: { value: '123456789' } });
    fireEvent.change(change, { target: { value: '123456789' } });
    fireEvent.change(confirm, { target: { value: '12345678' } });
    fireEvent.click(submit);
    expect(
      screen.getByText('New password must be different from current password.')
    ).toBeInTheDocument();
    expect(screen.getByText('Must match previous entry')).toBeInTheDocument();
  });

  it('enables the submit button when the form is filled out', () => {
    const { getByTestId } = render(<ChangePassword />);

    const current = getByTestId('current');
    const change = getByTestId('change');
    const confirm = getByTestId('confirm');
    const submit = getByTestId('change-password-submit');

    fireEvent.change(current, { target: { value: '12345678' } });
    fireEvent.change(change, { target: { value: '123456789' } });
    fireEvent.change(confirm, { target: { value: '123456789' } });
    fireEvent.click(submit);

    expect(submit).not.toHaveClass('Mui-disabled');
  });
  it('API call', () => {
    act(async () => {
      const { getByTestId } = render(<ChangePassword />);

      const current = getByTestId('current') as HTMLInputElement;
      const change = getByTestId('change') as HTMLInputElement;
      const confirm = getByTestId('confirm') as HTMLInputElement;
      const submit = getByTestId('change-password-submit');

      fireEvent.change(current, { target: { value: '12345678' } });
      fireEvent.change(change, { target: { value: '123456789' } });
      fireEvent.change(confirm, { target: { value: '123456789' } });
      fireEvent.click(submit);

      expect(axios.put).toHaveBeenCalledTimes(1);
      expect(axios.put).toHaveBeenCalledWith(
        expect.stringContaining('user/change-password'),
        expect.any(Object)
      );
      expect(current.value).toBe('12345678');
      expect(change.value).toBe('123456789');
      expect(confirm.value).toBe('123456789');
      await waitFor(() => getByTestId('snackbar'));
      await waitFor(() => getByTestId('change-success-dialog'));
    });
  });
  it('toggle visibility icon', () => {
    const { getByTestId } = render(<ChangePassword />);

    const current = getByTestId('current');
    const change = getByTestId('change');
    const confirm = getByTestId('confirm');
    const currentIcon = getByTestId('current-icon');
    const changeIcon = getByTestId('change-icon');
    const confirmIcon = getByTestId('confirm-icon');

    fireEvent.change(current, { target: { value: '12345678' } });
    fireEvent.change(change, { target: { value: '123456789' } });
    fireEvent.change(confirm, { target: { value: '123456789' } });
    fireEvent.click(currentIcon);
    fireEvent.click(changeIcon);
    fireEvent.click(confirmIcon);
    const submit = getByTestId('change-password-submit');
    expect(submit).not.toHaveClass('Mui-disabled');
  });
});
