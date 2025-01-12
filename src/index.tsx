import ReactDOM from 'react-dom/client';
import { CharacterProvider } from './components/CharacterContext';
import './styles/index.css';
import App from './containers/App/App';
import { HashRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <CharacterProvider>
    <HashRouter>
      <App />
    </HashRouter>
  </CharacterProvider>
);
