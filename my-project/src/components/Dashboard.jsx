import React, { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";
import moment from "moment";
import "tailwindcss/tailwind.css";
import axios from "axios";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem("dashboardData");
    return savedData
      ? JSON.parse(savedData)
      : {
          totalRevenue: 48063,
          pendingPayments: 11787,
          successfulTransactions: 509,
          failedTransactions: 10,
        };
  });

  const revenueChartRef = useRef(null);
  const paymentMethodsChartRef = useRef(null);

  const getAllPayments = async () => {
    try {
      const response = await axios.get("/backend/payments/all");
      if (response.status === 200) {
        setTransactions(response.data.payments);
        localStorage.setItem("lastFetchTime", Date.now());
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (err) {
      console.error("Error fetching transactions:", err);
    }
  };

  useEffect(() => {
    getAllPayments();
  }, []);

  useEffect(() => {
    if (revenueChartRef.current && paymentMethodsChartRef.current) {
      createRevenueChart();
      createPaymentMethodsChart();
    }
  }, []);

  const createRevenueChart = () => {
    const ctx = revenueChartRef.current.getContext("2d");
    const labels = Array.from({ length: 12 }, (_, i) =>
      moment().subtract(11 - i, "months").format("MMM YYYY")
    );
    const chartData = Array.from({ length: 12 }, () =>
      Math.floor(Math.random() * 100000)
    );

    new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Revenue",
            data: chartData,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };

  const createPaymentMethodsChart = () => {
    const ctx = paymentMethodsChartRef.current.getContext("2d");
    const chartData = {
      labels: ["Credit Card", "PayPal", "Bank Transfer", "Crypto", "MTN", "Orange"],
      datasets: [
        {
          data: [45, 25, 20, 10, 15, 30],
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#FFA500", "#FF4500"],
        },
      ],
    };

    new Chart(ctx, {
      type: "doughnut",
      data: chartData,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
          },
        },
      },
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl mt-10 font-bold mb-8 pt-8 text-center text-gray-800">
        HavenStay Advanced Payment Dashboard
      </h1>

      {/* Summary Cards Section - Flexbox */}
      <div className="flex flex-wrap justify-between gap-6 mb-8">
        {[
          { title: "Total Revenue", value: data.totalRevenue, color: "text-green-600" },
          { title: "Pending Payments", value: data.pendingPayments, color: "text-yellow-600" },
          { title: "Successful Transactions", value: data.successfulTransactions, color: "text-blue-600" },
          { title: "Failed Transactions", value: data.failedTransactions, color: "text-red-600" },
        ].map(({ title, value, color }, index) => (
          <div
            key={index}
            className="flex-1 min-w-[200px] bg-white p-6 rounded-lg shadow-md"
          >
            <h2 className="text-xl font-semibold mb-2 text-gray-700">{title}</h2>
            <p className={`text-3xl font-bold ${color}`}>{value.toLocaleString()} XAF</p>
          </div>
        ))}
      </div>

      {/* Main Content Section - Flexbox */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Recent Transactions Table */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md overflow-x-auto">
          <h2 className="text-2xl font-semibold mb-4">Recent Transactions</h2>
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2 text-sm md:text-base">Date</th>
                <th className="border px-4 py-2 text-sm md:text-base">Transaction ID</th>
                <th className="border px-4 py-2 text-sm md:text-base">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.slice(0, 5).map((transaction, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border px-4 py-2 text-sm md:text-base">
                    {moment(transaction.date).format("YYYY-MM-DD HH:mm:ss")}
                  </td>
                  <td className="border px-4 py-2 text-sm md:text-base">{transaction._id}</td>
                  <td className="border px-4 py-2 text-sm md:text-base">
                    {transaction.amount} XAF
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Charts Section */}
        <div className="flex-1 flex flex-col gap-8">
          {/* Revenue Chart */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Revenue Over Time</h2>
            <canvas ref={revenueChartRef} />
          </div>

          {/* Payment Methods Chart */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Payment Methods</h2>
            <canvas ref={paymentMethodsChartRef} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
