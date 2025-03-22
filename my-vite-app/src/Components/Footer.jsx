import React from "react";

export default function Footer() {
  return (
    <footer className="text-center">
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
  );
}
