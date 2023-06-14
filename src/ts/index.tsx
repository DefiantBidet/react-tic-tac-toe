import ReactDOM from 'react-dom/client';

import App from './App';

const appElement = document.querySelector('main#app');

if (!appElement) {
  throw new Error("Cannot Find Application Main Dom Element");
}

const domRoot = ReactDOM.createRoot(appElement);

domRoot.render(<App />);
