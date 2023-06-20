import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { Component } from 'react';
import './App.css';

// import views
import Layout from './views/Layout';
import Home from './views/Home';
import TransferPage from './views/TransferPage';

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
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="transferPage" element={<TransferPage />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );

}

export default App;
