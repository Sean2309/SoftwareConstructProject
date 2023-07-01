import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { Component } from 'react';
import './App.css';

// import views
import Layout from './views/Layout';
import Home from './views/Home';
import TransferPage from './views/TransferPage';
import LoyaltyPrograms from './views/LoyaltyPrograms';

function App() {

  
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="transferPage" element={<TransferPage />} />
          <Route path="loyaltyPrograms" element={<LoyaltyPrograms />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );

}

export default App;
