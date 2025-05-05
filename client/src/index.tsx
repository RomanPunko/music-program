import './styles/global.scss';
import './styles/reset.scss';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { setupStore } from './store/store';

const store = setupStore();

const container = document.getElementById('root');

if (!container) {
  throw new Error("Root container not found");
}

const root = ReactDOM.createRoot(container);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
