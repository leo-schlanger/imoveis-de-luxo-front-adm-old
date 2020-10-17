/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import ThemeContainer from '../contexts/theme/ThemeContainer';
import ContextProvider from '../contexts/hooks';

function MyApp({ Component, pageProps }): JSX.Element {
  return (
    <ThemeContainer>
      <ContextProvider>
        <Component {...pageProps} />
      </ContextProvider>
    </ThemeContainer>
  );
}

export default MyApp;
