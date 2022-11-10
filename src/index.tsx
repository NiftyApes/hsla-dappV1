import { ColorModeScript } from '@chakra-ui/react';
import * as Sentry from '@sentry/react';
import { WalletProvider } from 'lib/contexts/WalletProvider';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import theme from 'theme';
import { App } from './App';
import { store } from './app/store';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';

// Sentry.init({
//   dsn: 'https://e25ced3220074d7dbed923a26da046da@o4503999473385472.ingest.sentry.io/4504045219545088',
//   integrations: [new BrowserTracing()],

//   // Set tracesSampleRate to 1.0 to capture 100%
//   // of transactions for performance monitoring.
//   // We recommend adjusting this value in production
//   tracesSampleRate: 1.0,
// });

// Sentry.setTag('hostname', window?.location?.hostname);

function FallbackComponent() {
  return <div>An error has occurred. We are investigating 🍌</div>;
}

const container: HTMLElement | any = document.getElementById('root');
const root = createRoot(container);
root.render(
  <Sentry.ErrorBoundary fallback={FallbackComponent} showDialog>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <Provider store={store}>
      <WalletProvider>
        <App />
      </WalletProvider>
    </Provider>
  </Sentry.ErrorBoundary>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
