import { render } from '@testing-library/react';
import EmptyState from './';
import '@testing-library/jest-dom';

describe('Empty State', () => {
  it('renders default state', () => {
    const searchCategoryKeyword = 'Video';
    const searchInputKeyword = 'contact';
    const { getByTestId } = render(
      <EmptyState
        searchCategoryKeyword={searchCategoryKeyword}
        searchInputKeyword={searchInputKeyword}
      />
    );
    const emptyState = getByTestId('empty-state-wrap');
    expect(emptyState).toBeInTheDocument();
    const searchIcon = getByTestId('search-icon');
    expect(searchIcon).toBeInTheDocument();
    const emptyStateTitle = getByTestId('empty-state-title');
    const emptyStateSubTitle = getByTestId('empty-state-sub-title');
    expect(emptyStateTitle.textContent).toBe(
      `No matching results for 'Video and contact'`
    );
    expect(emptyStateSubTitle.textContent).toBe(
      'Try checking your spelling or use other keywords.'
    );
  });
});
