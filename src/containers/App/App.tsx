import {  Routes, Route } from 'react-router-dom';
import CardList from '../../components/CardList/CardList';
import CardDetail from '../../components/CardDetail/CardDetail';
import CreateCharacter from '../../components/CreateCharacter/CreateCharacter';

function App() {
    return (
      <Routes>
        <Route path="/" element={<CardList />} />
        <Route path="/character/:_id" element={<CardDetail />} />
        <Route path="/create-character" element={<CreateCharacter />} />
      </Routes>
    );
  }
export default App;