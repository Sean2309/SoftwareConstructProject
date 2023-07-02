import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// import views
import Layout from './views/Layout';
import Home from './views/Home';
import Login from './views/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="Login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );

}

export default App;
