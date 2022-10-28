import React, {useContext} from 'react';
import logo from './logo.svg';
import './App.css';
import HomeyAPI from "./HomeyAPI";
import {YrContext} from "./Context/yrAPIContext";
import WeatherChart from "./charts/WeatherChart";

function App() {
    const yrCtx = useContext(YrContext)

  return (
    <div className="App">
      <header className="App-header">
        <div onClick={() => yrCtx.fetchYrData()} className="control">{yrCtx.weatherPoints.length != 0 && (yrCtx.weatherPoints[0].temp+" °C")}</div>
        <div onClick={() => {
            console.log(yrCtx.weatherPoints);
            console.log(yrCtx.timeFetched)
        }} className="control"></div>
          {yrCtx.weatherPoints.length != 0 &&
              <WeatherChart></WeatherChart>
          }
      </header>
    </div>
  );
}

export default App;
