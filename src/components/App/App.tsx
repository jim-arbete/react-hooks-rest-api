import React from 'react';
import logo from './logo.svg';
import './App.css';
import Movies from '../../components/Movies/Movies';

const App = () => (
  <div id="App">
    <header>
      <div className="align-site-content-center flex flex-vertical-center">
        <a href="/"><img src={logo} className="flex flex-vertical-center App-logo" alt="logo" /></a>
        <a href="/">React - Movies App</a>
      </div>
    </header>
    <div id="main">
      <div className="align-site-content-center flex flex-vertical-center">
        <article>
          <Movies />          
        </article>
      </div>
    </div>
  </div>
);

export default App;