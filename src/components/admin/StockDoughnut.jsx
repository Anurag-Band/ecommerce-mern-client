import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const StockDoughnut = ({ outOfStock, productCount }) => {
  const data = {
    labels: ["In Stock", "Out Of Stock"],
    datasets: [
      {
        label: "# of Votes",
        data: [productCount - outOfStock, outOfStock],
        backgroundColor: ["#a16ef5", "#ff6f6f"],
        borderColor: ["rgba(255, 99, 132, 1)", "#ff1919"],
        borderWidth: 1,
      },
    ],
  };

  return <Doughnut data={data} />;
};

export default StockDoughnut;
