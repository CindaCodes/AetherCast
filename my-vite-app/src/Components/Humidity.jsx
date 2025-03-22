import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip } from "chart.js";

// Register Chart.js elements
Chart.register(ArcElement, Tooltip);

const Humidity = ({ humidity }) => {
  const data = {
    datasets: [
      {
        data: [humidity, 100 - humidity], 
        backgroundColor: ["#007bff", "#ddd"], 
        borderWidth: 0,
        cutout: "75%", 
        circumference: 180, 
        rotation: 270, 
      },
    ],
  };

  return (
    <div className="humidity-gauge">
      <Doughnut data={data} />
      <div className="humidity-text">{humidity}%</div> 
    </div>
  );
};

export default Humidity;
