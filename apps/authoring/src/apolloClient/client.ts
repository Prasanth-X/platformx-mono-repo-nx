import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getCurrentLang, getSelectedSite } from '../utils/helperFunctions';
import { getLocale } from '../utils/helperFunctions';
import i18next from 'i18next';

const defaultOptions: any = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
};

const link = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URI,
  headers: {
    language: 'en',
    sitename: getSelectedSite()
  },
  credentials: 'include',
});
const updateLanguageheader = setContext((_, { headers }) => {
  const language =
    headers && headers.language ? headers.language : i18next.language;
  return {
    headers: {
      ...headers,
      language,
      Locale: getLocale(language, language),
    },
  };
  // return {
  //   headers: {
  //     ...headers,
  //     language: getCurrentLang()
  //   }
  // };
});
export const client = new ApolloClient({
  link: updateLanguageheader.concat(link),
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions,
});
