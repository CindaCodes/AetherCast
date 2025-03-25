import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const getBarColor = (value) => {
  if (value < 20) return "#76c7c0"; // Light teal
  if (value < 50) return "#f1c40f"; // Yellow
  if (value < 80) return "#e67e22"; // Orange
  return "#e74c3c"; // Red
};

export default function RainChart({ hourlyForecast, is24Hour }) {
  const data = hourlyForecast.map((hour) => {
    return {
      time: new Date(hour.dt * 1000).toLocaleTimeString("en-US", {
        hour: "numeric",
        hour12: !is24Hour,
      }),
      pop: Math.round((hour.pop || 0) * 100), // convert to percentage
    };
  });

  return (
    <ResponsiveContainer width="100%" height={180}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 10, bottom: 10, left: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis domain={[0, 100]} hide />
        <Tooltip formatter={(value) => `${value}%`} />
        <Bar
          dataKey="pop"
          radius={[6, 6, 0, 0]}
          fill="#8884d8"
          isAnimationActive={false}
        >
          <LabelList
            dataKey="pop"
            position="top"
            formatter={(value) => `${value}%`}
            style={{ fill: "#fff", fontWeight: "bold" }}
          />
          {data.map((entry, index) => (
            <cell key={`cell-${index}`} fill={getBarColor(entry.pop)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
