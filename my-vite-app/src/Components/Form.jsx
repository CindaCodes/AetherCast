import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";


export default function Form() {
  return (
    <div className="input-container text-center">
      <form>
        <input
          type="search"
          placeholder="🔍 Enter a city..."
          className="weather-input"
        />
        <button type="submit" className="btn mx-3 weather-button">
          Search
        </button>
      </form>
    </div>
  );
}
