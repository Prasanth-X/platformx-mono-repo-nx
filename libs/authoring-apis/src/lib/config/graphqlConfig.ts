import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getCurrentLang, getLocale, getSelectedSite } from '../utils/helper'; 
import {i18next} from '@platformx/utilities';

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
  uri: process.env.NX_GRAPHQL_URI,
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
});

const graphqlInstance = new ApolloClient({
  link: updateLanguageheader.concat(link),
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions,
});
export default graphqlInstance; 