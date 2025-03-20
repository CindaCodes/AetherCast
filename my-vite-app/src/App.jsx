import React from 'react'
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";


function App() {

  return (
    <>
      <div className='text-center'>React Weather App</div>
      <footer className='text-center'>
        This project was{" "}
        <a
          href="https://www.linkedin.com/in/jacinda-bietz-3158a0338/"
          target="_blank"
          rel="noopener noreferrer"
        >
          coded by Jacinda Bietz
        </a>{" "}
        is{" "}
        <a
          href="https://github.com/CindaCodes/React-Weather-Forecast"
          target="_blank"
          rel="noopener noreferrer"
        >
          open-sourced on GitHub
        </a>{" "}
        and is{" "}
        <a
          href="https://cindas-weather-forecast.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          hosted on Netlify.
        </a>
      </footer>
    </>
  );
}

export default App
