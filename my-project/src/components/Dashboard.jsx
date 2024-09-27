import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import moment from "moment";
import "tailwindcss/tailwind.css";

const Dashboard = () => {
  const [data, setData] = useState({
    totalRevenue: 0,
    pendingPayments: 0,
    successfulTransactions: 0,
    failedTransactions: 0,
  });

  // Simulated data function
  const simulateData = () => {
    const totalRevenue = Math.floor(Math.random() * 100000);
    const pendingPayments = Math.floor(Math.random() * 10000);
    const successfulTransactions = Math.floor(Math.random() * 1000);
    const failedTransactions = Math.floor(Math.random() * 100);

    setData({
      totalRevenue,
      pendingPayments,
      successfulTransactions,
      failedTransactions,
    });
  };

  // Create revenue chart
  const createRevenueChart = () => {
    const ctx = document.getElementById("revenueChart").getContext("2d");
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

  // Create payment methods chart
  const createPaymentMethodsChart = () => {
    const ctx = document.getElementById("paymentMethodsChart").getContext("2d");
    const chartData = {
      labels: ["Credit Card", "PayPal", "Bank Transfer", "Crypto"],
      datasets: [
        {
          data: [45, 25, 20, 10],
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
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

  // Populate transactions table
  const populateTransactionsTable = () => {
    const tableBody = document.getElementById("transactionTableBody");
    const statuses = ["Success", "Pending", "Failed"];
    const statusClasses = {
      Success: "text-green-600",
      Pending: "text-yellow-600",
      Failed: "text-red-600",
    };

    for (let i = 0; i < 10; i++) {
      const row = document.createElement("tr");
      const date = moment().subtract(i, "days").format("YYYY-MM-DD");
      const transactionId = Math.random().toString(36).substr(2, 9).toUpperCase();
      const amount = (Math.random() * 1000).toFixed(2);
      const status = statuses[Math.floor(Math.random() * statuses.length)];

      row.innerHTML = `
        <td class="border px-4 py-2">${date}</td>
        <td class="border px-4 py-2">${transactionId}</td>
        <td class="border px-4 py-2">$${amount}</td>
        <td class="border px-4 py-2 ${statusClasses[status]}">${status}</td>
      `;

      tableBody.appendChild(row);
    }
  };

  useEffect(() => {
    simulateData();
    createRevenueChart();
    createPaymentMethodsChart();
    populateTransactionsTable();

    const interval = setInterval(() => {
      simulateData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800 pt-16">
       HavenStay Advanced Payment Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="dashboard-card bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">
            Total Revenue
          </h2>
          <p className="text-3xl font-bold text-green-600">
            ${data.totalRevenue.toLocaleString()}
          </p>
        </div>
        <div className="dashboard-card bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">
            Pending Payments
          </h2>
          <p className="text-3xl font-bold text-yellow-600">
            ${data.pendingPayments.toLocaleString()}
          </p>
        </div>
        <div className="dashboard-card bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">
            Successful Transactions
          </h2>
          <p className="text-3xl font-bold text-blue-600">
            {data.successfulTransactions.toLocaleString()}
          </p>
        </div>
        <div className="dashboard-card bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">
            Failed Transactions
          </h2>
          <p className="text-3xl font-bold text-red-600">
            {data.failedTransactions.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Revenue Over Time
          </h2>
          <canvas id="revenueChart"></canvas>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Payment Methods
          </h2>
          <canvas id="paymentMethodsChart"></canvas>
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Recent Transactions
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Transaction ID</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody id="transactionTableBody"></tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
