import React from 'react';
import {
  ApolloProvider as Apollo,
  ApolloClient,
  InMemoryCache,
  HttpLink,
} from '@apollo/react-hooks';

const ApolloProvider: React.FC = ({ children }) => {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({ uri: process.env.REACT_APP_API_GRAPHQL }),
  });

  return <Apollo client={client as ApolloClient<any>}>{children}</Apollo>;
};

export default ApolloProvider;
