import React from 'react';
import {
  ApolloProvider as Apollo,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  concat,
} from '@apollo/react-hooks';

const ApolloProvider: React.FC = ({ children }) => {
  const authMiddleware = new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    operation.setContext({
      headers: {
        authorization:
          `Bearer ${localStorage.getItem('@ImoveisDeLuxoAdm:token')}` || null,
      },
    });

    return forward(operation);
  });

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: concat(
      authMiddleware,
      new HttpLink({ uri: process.env.REACT_APP_API_GRAPHQL }),
    ),
  });

  return <Apollo client={client as ApolloClient<any>}>{children}</Apollo>;
};

export default ApolloProvider;
