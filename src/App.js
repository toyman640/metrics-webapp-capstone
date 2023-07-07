import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Countries from './components/Countries';
import Country from './components/Country';
import './App.css';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Countries />} />
        <Route path="/country/:id" element={<Country />} />
      </Routes>
    </>
  );
}

export default App;
