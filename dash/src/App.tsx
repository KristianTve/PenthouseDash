import React, {useContext} from 'react';
import logo from './logo.svg';
import './App.css';
import HomeyAPI from "./HomeyAPI";
import {YrContext} from "./Context/yrAPIContext";

function App() {
    const yrCtx = useContext(YrContext)

  return (
    <div className="App">
      <header className="App-header">
        <div onClick={() => yrCtx.fetchYrData()} className="control"></div>
        <div onClick={() => {
            console.log(yrCtx.weatherPoints);
            console.log(yrCtx.timeFetched)
        }} className="control"></div>
      </header>
    </div>
  );
}

export default App;
