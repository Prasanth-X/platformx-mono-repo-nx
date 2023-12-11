import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getCurrentLang, getSelectedSite } from '../utils/helperFunctions';

const getUri = () => {
  const link = createHttpLink({
    uri: process.env.REACT_APP_GRAPHQL_URI,
    headers: {
      language: 'en',
      sitename: getSelectedSite()
    },
    credentials: 'include',
  });
  const languageHeader = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        language: getCurrentLang(),
      },
    };
  });
  return languageHeader.concat(link);
};

const graphqlConfig: any = {
  uri: getUri(),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
};
const graphqlInstance = new ApolloClient({
  link: getUri(),
  cache: new InMemoryCache(),
});
export default graphqlInstance;
