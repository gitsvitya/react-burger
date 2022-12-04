import React from 'react';
import appstyles from './App.module.css';
import AppHeader from "../AppHeader/AppHeader.jsx";

function App() {
  return (
    <div className={appstyles.page}>
      <AppHeader/>
    </div>
  );
}

export default App;
