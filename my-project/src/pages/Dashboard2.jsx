// import React, { useState } from "react";

// const PaymentForm = ({ onPaymentSubmit }) => {
//   const [paymentDetails, setPaymentDetails] = useState({
//     amount: "",
//     method: "Credit Card", // default payment method
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setPaymentDetails((prevState) => ({ ...prevState, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onPaymentSubmit(paymentDetails);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
//       <div className="mb-4">
//         <label htmlFor="amount" className="block text-sm font-semibold">
//           Amount
//         </label>
//         <input
//           type="number"
//           id="amount"
//           name="amount"
//           value={paymentDetails.amount}
//           onChange={handleChange}
//           className="mt-1 block w-full p-2 border border-gray-300 rounded"
//           placeholder="Enter amount"
//           required
//         />
//       </div>

//       <div className="mb-4">
//         <label htmlFor="method" className="block text-sm font-semibold">
//           Payment Method
//         </label>
//         <select
//           id="method"
//           name="method"
//           value={paymentDetails.method}
//           onChange={handleChange}
//           className="mt-1 block w-full p-2 border border-gray-300 rounded"
//         >
//           <option value="Credit Card">Credit Card</option>
//           <option value="PayPal">PayPal</option>
//           <option value="Bank Transfer">Bank Transfer</option>
//           <option value="Crypto">Crypto</option>
//         </select>
//       </div>

//       <button
//         type="submit"
//         className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4"
//       >
//         Submit Payment
//       </button>
//     </form>
//   );
// };

// export default PaymentForm;
