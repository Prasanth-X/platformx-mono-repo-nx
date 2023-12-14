import { render, cleanup, act } from '@testing-library/react';
import React from 'react';
import PrelemInfo from './PrelemInfo';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import { getRequest } from '../../services/config/request';

const mockedUsedNavigate = jest.fn();
const mockSetState = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
  useState: (loader) => [loader, mockSetState],
}));

jest.mock('axios');

const prelemInformation = {
  prelemByName: {
    id: 'da1557c8-ebd3-4ed6-857d-b711faa1638d',
    name: 'Contact Us Detail',
    tags: ['Video', 'Gallery'],
    previewThumbnail:
      'https://platx-prelem-regs-dev.fanuep.com/platform-x/api/v1/assets/site/binaries/_ht_1645503732504/content/gallery/hclplatformx/prelem/prelemcontactus/contact1-web.jpg',
    description:
      'Standard contact us page with get contact information basic form with background image',
    documentType: 'hclplatformx:SiteComponentContactUsBody',
    seoEnabled: true,
    analyticsEnabled: true,
  },
};

beforeEach(() => {
  axios.get = jest.fn().mockResolvedValue({
    data: prelemInformation,
  });
});

afterEach(cleanup);

describe('get prelem info', () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <PrelemInfo />
    </MemoryRouter>
  );
  it('api call', async () => {
    await act(async () => {
      const payload = { data: prelemInformation };
      axios.get = jest.fn().mockResolvedValue(payload);
      await expect(
        getRequest('api/v1/web/en/authoring/prelem/siteprelems_video_item1')
      ).resolves.toEqual(prelemInformation);
      expect(getByTestId('page-loader')).toBeInTheDocument();
      const prelemTitle = getByTestId('prelem-title');
      expect(prelemTitle.innerText).toBe(prelemInformation.prelemByName.name);
    });
  });
});
