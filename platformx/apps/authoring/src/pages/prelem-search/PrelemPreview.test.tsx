import { render, fireEvent } from '@testing-library/react';
import PrelemPreview from './PrelemPreview';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import '@testing-library/jest-dom';

interface Mockdata {
  screenType: string;
  image: string;
}
describe('prelem info', () => {
  it('renders default state', async () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <PrelemPreview />
      </MemoryRouter>
    );
    const pageTitle = getByTestId('page-title');
    expect(pageTitle.textContent).toBe('Preview Prelem');
    const prelemBackBtn = getByTestId('prelem-back-button');
    await fireEvent.click(prelemBackBtn);
    const prelemBackMobileBtn = getByTestId('prelem-back-mobile-button');
    await fireEvent.click(prelemBackMobileBtn);
    const addPrelemBtn = getByTestId('add-prelem-button');
    await fireEvent.click(addPrelemBtn);
    const prelemInfoBtn = getByTestId('prelem-info-button');
    await fireEvent.click(prelemInfoBtn);
    const prelemInfoMobileBtn = getByTestId('prelem-info-mobile-button');
    await fireEvent.click(prelemInfoMobileBtn);
  });
});
