import React from 'react';
import logo from './logo.svg';
import './App.css';
import EventManager from './components/EventManager';

const App: React.FC = () => {
  return (
    <div className="app">
      <h1>Event Management App</h1>
      <EventManager />
    </div>
  );
};

export default App;
