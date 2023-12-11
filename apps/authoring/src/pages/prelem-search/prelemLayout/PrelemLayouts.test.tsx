import { render } from '@testing-library/react';
import PrelemLayouts from './';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

describe('Empty State', () => {
  it('renders default state', async () => {
    const layoutListMockData = [
      {
        id: '1',
        mapping: 'layout_map1',
        thumbnail:
          'https://platx-prelem-regs-dev.fanuep.com/platform-x/api/v1/assets/site/binaries/_ht_1640193233952/content/gallery/hclplatformx/prelem/prelemcontactus/prelem_contactus.png',
        title: 'contactUs',
      },
      {
        id: '2',
        mapping: 'layout_map2',
        thumbnail:
          'https://platx-prelem-regs-dev.fanuep.com/platform-x/api/v1/assets/site/binaries/_ht_1640193233952/content/gallery/hclplatformx/prelem/prelemcontactus/prelem_contactus.png',
        title: 'contactUs',
      },
    ];
    const { getByTestId } = render(
      <MemoryRouter>
        <PrelemLayouts
          layoutList={layoutListMockData}
          handleLayoutFilter={function (arg: string, index: string): void {
            throw new Error('Function not implemented.');
          }}
          layoutState={{
            layoutIndex: '',
            layoutValue: '',
          }}
          searchValue="abc"
          categoryState={{
            categoryIndex: 0,
            categoryValue: '',
          }}
        />
      </MemoryRouter>
    );
    const layoutWrapper = getByTestId('layout-wrapper');
    expect(layoutWrapper).toBeInTheDocument();
    const layoutItemList = getByTestId('layout-image-list');
    expect(layoutItemList).toBeInTheDocument();
    const layoutItem = getByTestId('layout-image-item');
    expect(layoutItem).toBeInTheDocument();
  });
});
