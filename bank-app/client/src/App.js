import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { Component } from 'react';
import './App.css';

// import views
import Layout from './views/Layout';
import Home from './views/Home';
import TransferPage from './views/TransferPage';
import Login from './views/Login';
import RewardCenter from './views/RewardCenter';

function App() {
  return (
    //<div className="App">
    //  <header className="App-header">
    //    <p>
    //      Edit <code>src/App.js</code> and save to reload.
    //    </p>
    //    <a
    //      className="App-link"
    //      href="https://reactjs.org"
    //      target="_blank"
    //      rel="noopener noreferrer"
    //    >
    //      Learn React
    //    </a>
    //  </header>
    //</div>
    //
    <BrowserRouter>
      <Routes>
        {/* Layout tab is always rendered */}
        {/* this is the bullet point direct linked text */}
        <Route path="/" element={<Layout />}>
          {/* variable rendering depending on route */}
          <Route index element={<Home />} />
          <Route path="transferPage" element={<TransferPage />} />
          <Route path="Login" element={<Login />} />
          <Route path="rewardCenter" element={<RewardCenter/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );

}

export default App;
