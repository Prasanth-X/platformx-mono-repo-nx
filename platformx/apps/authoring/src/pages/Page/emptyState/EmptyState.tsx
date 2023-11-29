import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ThemeConstants from '../../../theme/variable';
// import { EmptyStateProps } from '../utils/prelemTypes';
import { EmptyStateProps } from '../utils/prelemTypes';
export const EmptyState = ({
  searchCategoryKeyword,
  searchInputKeyword,
}: EmptyStateProps) => {
  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: ThemeConstants.LIGHT_BG_COLOR,
        padding: { lg: '3% 0', md: '3% 0', sm: '2% 0', xs: '5% 0' },
      }}
      data-testid='empty-state-wrap'
    >
      <Container>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            minHeight: '500px',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          {searchInputKeyword ? (
            <SearchIcon
              sx={{
                color: ThemeConstants.TEXT_MAIN_COLOR,
                width: { xs: '100px', md: '93px' },
                height: { xs: '109px', md: '93px' },
                marginBottom: '10px',
                opacity: { xs: 0.23, lg: 1 },
              }}
              data-testid='search-icon'
            />
          ) : searchCategoryKeyword ? (
            <SearchIcon
              sx={{
                color: ThemeConstants.TEXT_MAIN_COLOR,
                width: { xs: '100px', md: '93px' },
                height: { xs: '109px', md: '93px' },
                marginBottom: '10px',
                opacity: { xs: 0.23, lg: 1 },
              }}
              data-testid='search-icon'
            />
          ) : (
            ''
          )}

          <Typography
            variant='h3'
            sx={{
              fontSize: {
                xs: ThemeConstants.FONTSIZE_LG,
                md: ThemeConstants.FONTSIZE_XL,
              },
              fontWeight: ThemeConstants.FONTWEIGHT_MEDIUM,
            }}
            data-testid='empty-state-title'
          >
            {searchInputKeyword
              ? 'No matching results for  '
              : searchCategoryKeyword
              ? 'No matching results for  '
              : ''}
            {searchCategoryKeyword?.length && searchInputKeyword
              ? `'${searchCategoryKeyword}' and `
              : searchCategoryKeyword?.length
              ? `'${searchCategoryKeyword}' `
              : ''}
            {searchInputKeyword ? `'${searchInputKeyword}' ` : ''}
          </Typography>
          <Typography
            variant='body1'
            sx={{
              color: ThemeConstants.LIGHT_GREY_COLOR,
              fontSize: {
                xs: ThemeConstants.FONTSIZE_DEFAULT,
                md: ThemeConstants.FONTSIZE_LG,
              },
            }}
            data-testid='empty-state-sub-title'
          >
            {searchInputKeyword
              ? 'Try checking your spelling or use other keywords.'
              : searchCategoryKeyword
              ? 'Try checking your spelling or use other keywords.'
              : ''}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
