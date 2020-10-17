import { AuthProvider, ProtectRoute } from './auth';
import ApolloProvider from './apollo';

const AppProvider: React.FC = ({ children }) => (
  <ApolloProvider>
    <AuthProvider>
      <ProtectRoute>{children}</ProtectRoute>
    </AuthProvider>
  </ApolloProvider>
);

export default AppProvider;
