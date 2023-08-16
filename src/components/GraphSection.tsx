import React, { FC, useState } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  PieChart,
  Pie,
  Cell as PieCell,
  Tooltip as PieTooltip,
} from "recharts";

interface GraphSectionProps {
  wordsCounter: { [key: string]: number };
}

const GraphSection: FC<GraphSectionProps> = ({ wordsCounter }) => {
  const chartData = Object.keys(wordsCounter).map((key) => ({
    name: key,
    entities: wordsCounter[key],
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const [selectedGraph, setSelectedGraph] = useState<
    "bar" | "pie" | "customPie"
  >("pie");

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
    index: number;
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="black"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const renderGraph = (): JSX.Element => {
    if (selectedGraph === "bar") {
      return (
        <BarChart
          width={500}
          height={chartData.length * 40}
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="entities" fill="#82ca9d" />
        </BarChart>
      );
    } else if (selectedGraph === "pie") {
      return (
        <PieChart width={800} height={400}>
          <Pie
            dataKey="entities"
            data={chartData}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {chartData.map((entry, index) => (
              <PieCell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend />
          <PieTooltip />
        </PieChart>
      );
    } else if (selectedGraph === "customPie") {
      return (
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              dataKey="entities"
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              label={renderCustomizedLabel}
            >
              {chartData.map((entry, index) => (
                <PieCell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend />
            <PieTooltip />
          </PieChart>
        </ResponsiveContainer>
      );
    }

    return <></>;
  };

  return (
    <div className="graph-section ms-5 mt-5 me-5 alert alert-warning">
      <h5 className="mb-5">Analytics</h5>
      <select
        className="mb-5"
        value={selectedGraph}
        onChange={(e) =>
          setSelectedGraph(e.target.value as "pie" | "customPie" | "bar")
        }
      >
        <option value="pie">Pie Chart(N)</option>
        <option value="customPie">Custom Pie Chart(%)</option>
        <option value="bar">Bar Graph</option>
      </select>

      <ResponsiveContainer width="100%" aspect={3}>
        {renderGraph()}
      </ResponsiveContainer>
    </div>
  );
};

export default GraphSection;
