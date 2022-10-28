import { ColorModeScript } from '@chakra-ui/react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import theme from 'theme';
import { App } from './App';
import { store } from './app/store';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';

const container: HTMLElement | any = document.getElementById('root');
const root = createRoot(container);
console.log({ staging: true })
root.render(
  <>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <Provider store={store}>
      <App />
    </Provider>
  </>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
