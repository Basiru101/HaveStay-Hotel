// import React, { useState, useEffect } from "react";
// import PaymentForm from "./PaymentForm";
// import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";

// // Colors for different payment methods in the chart
// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// const Dashboard = () => {
//   const [payments, setPayments] = useState([]);

//   // Load payments from localStorage when the component mounts
//   useEffect(() => {
//     const storedPayments = localStorage.getItem("payments");
//     if (storedPayments) {
//       setPayments(JSON.parse(storedPayments));
//     }
//   }, []);

//   // Update payments both in state and localStorage
//   const handlePaymentSubmit = (paymentDetails) => {
//     const updatedPayments = [...payments, paymentDetails];
//     setPayments(updatedPayments);
//     localStorage.setItem("payments", JSON.stringify(updatedPayments)); // Save to localStorage
//   };

//   // Function to calculate the payment method breakdown for the chart
//   const getPaymentMethodData = () => {
//     const methodCount = payments.reduce((acc, payment) => {
//       acc[payment.method] = (acc[payment.method] || 0) + 1;
//       return acc;
//     }, {});

//     return Object.keys(methodCount).map((method) => ({
//       name: method,
//       value: methodCount[method],
//     }));
//   };

//   // Function to calculate cumulative revenue over time
//   const getRevenueOverTime = () => {
//     const revenueByDate = payments.reduce((acc, payment) => {
//       const { date, amount } = payment;
//       acc[date] = (acc[date] || 0) + parseFloat(amount);
//       return acc;
//     }, {});

//     // Sort dates and calculate cumulative revenue
//     const sortedDates = Object.keys(revenueByDate).sort((a, b) => new Date(a) - new Date(b));
//     let cumulativeRevenue = 0;

//     return sortedDates.map((date) => {
//       cumulativeRevenue += revenueByDate[date];
//       return {
//         date,
//         revenue: cumulativeRevenue, // Cumulative revenue
//       };
//     });
//   };

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

//       {/* Render the PaymentForm and pass the handlePaymentSubmit function */}
//       <PaymentForm onPaymentSubmit={handlePaymentSubmit} />

//       {/* Payment History Table */}
//       <div className="mt-8">
//         <h2 className="text-xl font-semibold mb-4">Payment History</h2>
//         {payments.length > 0 ? (
//           <table className="table-auto w-full text-left border-collapse">
//             <thead>
//               <tr>
//                 <th className="border-b-2 py-2">Amount</th>
//                 <th className="border-b-2 py-2">Method</th>
//                 <th className="border-b-2 py-2">Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {payments.map((payment, index) => (
//                 <tr key={index}>
//                   <td className="border-b py-2">{payment.amount}</td>
//                   <td className="border-b py-2">{payment.method}</td>
//                   <td className="border-b py-2">{payment.date}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         ) : (
//           <p>No payments have been made yet.</p>
//         )}
//       </div>

//       {/* Payment Methods Pie Chart */}
//       <div className="mt-8">
//         <h2 className="text-xl font-semibold mb-4">Payment Methods Breakdown</h2>
//         {payments.length > 0 ? (
//           <div style={{ width: "100%", height: 300 }}>
//             <ResponsiveContainer>
//               <PieChart>
//                 <Pie
//                   data={getPaymentMethodData()}
//                   cx="50%"
//                   cy="50%"
//                   outerRadius={100}
//                   labelLine={false}
//                   label={({ name, percent }) =>
//                     `${name}: ${(percent * 100).toFixed(0)}%`
//                   }
//                   dataKey="value"
//                 >
//                   {getPaymentMethodData().map((entry, index) => (
//                     <Cell
//                       key={`cell-${index}`}
//                       fill={COLORS[index % COLORS.length]}
//                     />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//                 <Legend />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         ) : (
//           <p>No data to display for payment methods.</p>
//         )}
//       </div>

//       {/* Revenue Over Time Line Chart */}
//       <div className="mt-8">
//         <h2 className="text-xl font-semibold mb-4">Revenue Over Time</h2>
//         {payments.length > 0 ? (
//           <div style={{ width: "100%", height: 300 }}>
//             <ResponsiveContainer>
//               <LineChart data={getRevenueOverTime()}>
//                 <CartesianGrid stroke="#ccc" />
//                 <XAxis dataKey="date" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         ) : (
//           <p>No revenue data available yet.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// import React, { useEffect, useState, useRef } from "react";
// import Chart from "chart.js/auto";
// import moment from "moment";
// import "tailwindcss/tailwind.css";
// import PaymentForm from "../components/PaymentForm";

// const Dashboard = () => {
//   const [data, setData] = useState(() => {
//     const savedData = localStorage.getItem("dashboardData");
//     return savedData
//       ? JSON.parse(savedData)
//       : {
//           totalRevenue: 48063,
//           pendingPayments: 8787,
//           successfulTransactions: 509,
//           failedTransactions: 10,
//         };
//   });

//   const [transactions, setTransactions] = useState(() => {
//     const savedTransactions = localStorage.getItem("transactions");
//     return savedTransactions ? JSON.parse(savedTransactions) : [];
//   });

//   const revenueChartRef = useRef(null);
//   const paymentMethodsChartRef = useRef(null);

//   const handlePaymentSubmit = (paymentDetails) => {
//     const paymentAmount = parseFloat(paymentDetails.amount);

//     const newTransaction = {
//       date: moment().format("YYYY-MM-DD"),
//       transactionId: Math.random().toString(36).substr(2, 9).toUpperCase(),
//       amount: paymentAmount.toFixed(2),
//       status: "Pending",
//     };

//     const updatedTransactions = [...transactions, newTransaction];

//     setTransactions(updatedTransactions);
//     localStorage.setItem("transactions", JSON.stringify(updatedTransactions));

//     const updatedData = {
//       ...data,
//       pendingPayments: data.pendingPayments + paymentAmount,
//     };

//     setData(updatedData);
//     localStorage.setItem("dashboardData", JSON.stringify(updatedData));
//   };

//   const markPaymentAsSuccessful = (paymentAmount) => {
//     const updatedData = {
//       ...data,
//       pendingPayments: data.pendingPayments - paymentAmount,
//       totalRevenue: data.totalRevenue + paymentAmount,
//       successfulTransactions: data.successfulTransactions + 1,
//     };

//     setData(updatedData);
//     localStorage.setItem("dashboardData", JSON.stringify(updatedData));
//   };

//   useEffect(() => {
//     if (revenueChartRef.current && paymentMethodsChartRef.current) {
//       createRevenueChart();
//       createPaymentMethodsChart();
//     }
//   }, []);

//   const createRevenueChart = () => {
//     const ctx = revenueChartRef.current.getContext("2d");
//     const labels = Array.from({ length: 12 }, (_, i) =>
//       moment().subtract(11 - i, "months").format("MMM YYYY")
//     );
//     const chartData = Array.from({ length: 12 }, () =>
//       Math.floor(Math.random() * 100000)
//     );

//     new Chart(ctx, {
//       type: "line",
//       data: {
//         labels: labels,
//         datasets: [
//           {
//             label: "Revenue",
//             data: chartData,
//             borderColor: "rgb(75, 192, 192)",
//             tension: 0.1,
//           },
//         ],
//       },
//       options: {
//         responsive: true,
//         scales: {
//           y: {
//             beginAtZero: true,
//           },
//         },
//       },
//     });
//   };

//   const createPaymentMethodsChart = () => {
//     const ctx = paymentMethodsChartRef.current.getContext("2d");
//     const chartData = {
//       labels: ["Credit Card", "PayPal", "Bank Transfer", "Crypto"],
//       datasets: [
//         {
//           data: [45, 25, 20, 10],
//           backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
//         },
//       ],
//     };

//     new Chart(ctx, {
//       type: "doughnut",
//       data: chartData,
//       options: {
//         responsive: true,
//         plugins: {
//           legend: {
//             position: "bottom",
//           },
//         },
//       },
//     });
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-4xl font-bold mb-8 text-center text-gray-800 pt-16">
//         HavenStay Advanced Payment Dashboard
//       </h1>

//       {/* Flexbox layout for cards */}
//       <div className="flex flex-wrap justify-between gap-6 mb-8">
//         {[
//           { title: "Total Revenue", value: data.totalRevenue, color: "text-green-600" },
//           { title: "Pending Payments", value: data.pendingPayments, color: "text-yellow-600" },
//           { title: "Successful Transactions", value: data.successfulTransactions, color: "text-blue-600" },
//           { title: "Failed Transactions", value: data.failedTransactions, color: "text-red-600" },
//         ].map(({ title, value, color }, index) => (
//           <div key={index} className="dashboard-card flex-1 bg-white p-6 rounded-lg shadow-md min-w-[200px]">
//             <h2 className="text-xl font-semibold mb-2 text-gray-700">{title}</h2>
//             <p className={`text-3xl font-bold ${color}`}>${value.toLocaleString()}</p>
//           </div>
//         ))}
//       </div>

//       {/* Payment Form */}
//       <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
//         <h2 className="text-2xl font-semibold mb-4">Process a New Payment</h2>
//         <PaymentForm onPaymentSubmit={handlePaymentSubmit} />
//       </div>

//       {/* Transactions Table */}
//       <div className="mt-8">
//         <h2 className="text-2xl font-semibold mb-4">Recent Transactions</h2>
//         <table className="table-auto w-full border-collapse bg-white rounded-lg shadow-md">
//           <thead>
//             <tr>
//               <th className="border px-4 py-2">Date</th>
//               <th className="border px-4 py-2">Transaction ID</th>
//               <th className="border px-4 py-2">Amount</th>
//               <th className="border px-4 py-2">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {transactions.map((transaction, index) => (
//               <tr key={index}>
//                 <td className="border px-4 py-2">{transaction.date}</td>
//                 <td className="border px-4 py-2">{transaction.transactionId}</td>
//                 <td className="border px-4 py-2">${transaction.amount}</td>
//                 <td className="border px-4 py-2 text-yellow-600">{transaction.status}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Flex container for the charts */}
//       <div className="flex justify-between items-center mt-8 space-x-6">
//         {/* Revenue Chart */}
//         <div className="w-1/2">
//           <h2 className="text-2xl font-semibold mb-4">Revenue Chart</h2>
//           <canvas
//             id="revenueChart"
//             ref={revenueChartRef}
//             className="bg-white rounded-lg shadow-md"
//           />
//         </div>

//         {/* Payment Methods Chart */}
//         <div className="w-1/2">
//           <h2 className="text-2xl font-semibold mb-4">Payment Methods</h2>
//           <canvas
//             id="paymentMethodsChart"
//             ref={paymentMethodsChartRef}
//             className="bg-white rounded-lg shadow-md"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };
// Dashboard.js
// Dashboard.jsx
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import moment from "moment";
import "tailwindcss/tailwind.css";

const Dashboard = () => {
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem("dashboardData");
    return savedData ? JSON.parse(savedData) : {
      totalRevenue: 48063,
      pendingPayments: 11787,
      successfulTransactions: 509,
      failedTransactions: 10,
    };
  });

  const [transactions, setTransactions] = useState([
    {
      date: moment().subtract(2, "days").format("YYYY-MM-DD"),
      transactionId: "TXN-123456789",
      amount: "150.00",
    },
    {
      date: moment().subtract(1, "days").format("YYYY-MM-DD"),
      transactionId: "TXN-987654321",
      amount: "200.00",
    },
    {
      date: moment().format("YYYY-MM-DD"),
      transactionId: "TXN-112233445",
      amount: "300.00",
    },
  ]);

  const revenueChartRef = useRef(null);
  const paymentMethodsChartRef = useRef(null);

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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl mt-10 font-bold mb-8 text-center text-gray-800">
        HavenStay Advanced Payment Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { title: "Total Revenue", value: data.totalRevenue, color: "text-green-600" },
          { title: "Pending Payments", value: data.pendingPayments, color: "text-yellow-600" },
          { title: "Successful Transactions", value: data.successfulTransactions, color: "text-blue-600" },
          { title: "Failed Transactions", value: data.failedTransactions, color: "text-red-600" },
        ].map(({ title, value, color }, index) => (
          <div key={index} className="dashboard-card bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2 text-gray-700">{title}</h2>
            <p className={`text-3xl font-bold ${color}`}>${value.toLocaleString()}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Recent Transactions</h2>
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr>
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Transaction ID</th>
                <th className="border px-4 py-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{transaction.date}</td>
                  <td className="border px-4 py-2">{transaction.transactionId}</td>
                  <td className="border px-4 py-2">${transaction.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Revenue Over Time</h2>
          <canvas ref={revenueChartRef} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Payment Methods</h2>
          <canvas ref={paymentMethodsChartRef} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
