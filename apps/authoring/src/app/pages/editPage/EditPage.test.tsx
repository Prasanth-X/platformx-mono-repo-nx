import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { EditPage } from './EditPage';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('EditPage', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(() => null),
      },
      writable: true,
    });
  });

  it('Should call localStorage getItem on render', () => {
    const dataSt =
      '[{"id":"da1557c8-ebd3-4ed6-857d-b711faa1638d","contentType":"Contact Us","meta":{"name":"ContactUS","tags":["blog","Article","xyz"],"thumbnails":[{"desktop":"url"},{"tab":"url"},{"mobile":"url"}],"owner":"plat X dev","developedOn":"20 Dec 2020"},"seoEnabled":true,"analyticsEnabled":true,"structureData":"","content":{"title":{"type":"","value":"Contact us","maxLength":"","required":true},"subTitle":{"type":"","value":"How can we help?","maxLength":"","required":true},"description":{"type":"","value":"All the essential numbers and email addresses you need to get in touch with us at Harvest Essential Oils.","maxLength":"","required":true},"buttons":[{"name":"reach-us","type":"","value":"","redirectUrl":"https://www.google.com/","restEndPoint":"","maxLength":"","required":true}],"images":[{"name":"background","imageUrl":"","title":"Default title of image","description":"This is default image description","attribution":false}]}}]';
    const { getByTestId } = render(<EditPage />);
    window.localStorage.setItem('prelemModelChild', dataSt);
    const linkElement = getByTestId('card0');
    expect(linkElement).toBeInTheDocument();
    fireEvent.mouseEnter(linkElement);
    const edit = getByTestId('edit_0');
    const visibility = getByTestId('visibility_0');
    const copy = getByTestId('copy_0');
    const up = getByTestId('up_0');
    const down = getByTestId('down_0');
    const del = getByTestId('delete_0');
    const settings = getByTestId('settings_0');
    expect(edit).toBeInTheDocument();
    expect(visibility).toBeInTheDocument();
    expect(copy).toBeInTheDocument();
    expect(up).toBeInTheDocument();
    expect(down).toBeInTheDocument();
    expect(del).toBeInTheDocument();
    expect(settings).toBeInTheDocument();
    expect(up).toHaveClass('Mui-disabled');
  });
  it('Back present', () => {
    render(<EditPage />);
    const linkElement = screen.getByText(/Back/i);
    expect(linkElement).toBeInTheDocument();
  });
  it('Icons present and enabled/disabled last card', () => {
    const dataSt =
      '[{"id":"da1557c8-ebd3-4ed6-857d-b711faa1638d","contentType":"Contact Us","meta":{"name":"ContactUS","tags":["blog","Article","xyz"],"thumbnails":[{"desktop":"url"},{"tab":"url"},{"mobile":"url"}],"owner":"plat X dev","developedOn":"20 Dec 2020"},"seoEnabled":true,"analyticsEnabled":true,"structureData":"","content":{"title":{"type":"","value":"Contact us","maxLength":"","required":true},"subTitle":{"type":"","value":"How can we help?","maxLength":"","required":true},"description":{"type":"","value":"All the essential numbers and email addresses you need to get in touch with us at Harvest Essential Oils.","maxLength":"","required":true},"buttons":[{"name":"reach-us","type":"","value":"","redirectUrl":"https://www.google.com/","restEndPoint":"","maxLength":"","required":true}],"images":[{"name":"background","imageUrl":"","title":"Default title of image","description":"This is default image description","attribution":false}]}}]';
    const lastEl = JSON.parse(dataSt).length - 1;
    const { getByTestId } = render(<EditPage />);
    fireEvent.mouseOver(getByTestId(`card${  lastEl}`));
    const edit = getByTestId(`edit_${  lastEl}`);
    const visibility = getByTestId(`visibility_${  lastEl}`);
    const copy = getByTestId(`copy_${  lastEl}`);
    const up = getByTestId(`up_${  lastEl}`);
    const down = getByTestId(`down_${  lastEl}`);
    const del = getByTestId(`delete_${  lastEl}`);
    const settings = getByTestId(`settings_${  lastEl}`);
    expect(edit).toBeInTheDocument();
    expect(visibility).toBeInTheDocument();
    expect(copy).toBeInTheDocument();
    expect(up).toBeInTheDocument();
    expect(down).toBeInTheDocument();
    expect(del).toBeInTheDocument();
    expect(settings).toBeInTheDocument();
    expect(down).toHaveClass('Mui-disabled');
  });
  it('Delete last Prelem', () => {
    const { getByTestId } = render(<EditPage />);
    const linkElement = getByTestId('card0');
    expect(linkElement).toBeInTheDocument();
    fireEvent.mouseEnter(linkElement);
    const del = getByTestId('delete_0');
    fireEvent.click(del);
    const confirmDelMessage = screen.getByText(
      /Are you sure you want to delete this Prelem?/i
    );
    expect(confirmDelMessage).toBeInTheDocument();
    const confirm = screen.getByText(/Yes/i);
    fireEvent.click(confirm);
    const blankAddPrelem = screen.queryByText(/Add Prelem/i);
    expect(blankAddPrelem).toBeInTheDocument();
  });
});
