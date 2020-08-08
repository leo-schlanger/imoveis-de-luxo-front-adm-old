import React from 'react';

import { AuthProvider } from './auth';
import ApolloProvider from './apollo';

const AppProvider: React.FC = ({ children }) => (
  <ApolloProvider>
    <AuthProvider>
      {children}
    </AuthProvider>
  </ApolloProvider>
);

export default AppProvider;
