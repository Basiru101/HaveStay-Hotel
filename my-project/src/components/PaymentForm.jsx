// import React, { useState } from 'react';

// const PaymentForm = ({ onPaymentSubmit = () => {} }) => {
//   const [amount, setAmount] = useState('');
//   const [method, setMethod] = useState('Credit Card');
//   const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!amount) return;

//     const paymentDetails = { amount, method, date };
//     console.log('Payment Details:', paymentDetails); // Debugging line
//     onPaymentSubmit(paymentDetails);

//     // Clear the form
//     setAmount('');
//     setMethod('Credit Card');
//     setDate(new Date().toISOString().split('T')[0]);
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md max-w-md w-full">
//         <h2 className="text-xl mb-4">New Payment</h2>
//         <div className="mb-4">
//           <label className="block mb-2">Amount</label>
//           <input
//             type="number"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//             className="border p-2 rounded w-full"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-2">Payment Method</label>
//           <select
//             value={method}
//             onChange={(e) => setMethod(e.target.value)}
//             className="border p-2 rounded w-full"
//           >
//             <option value="Credit Card">Credit Card</option>
//             <option value="PayPal">PayPal</option>
//             <option value="Bank Transfer">Bank Transfer</option>
//             <option value="Crypto">Crypto</option>
//           </select>
//         </div>
//         <div className="mb-4">
//           <label className="block mb-2">Date</label>
//           <input
//             type="date"
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//             className="border p-2 rounded w-full"
//           />
//         </div>
//         <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
//           Submit Payment
//         </button>
//       </form>
//     </div>
//   );
// };

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { store } from "../redux/store";

const PaymentForm = ({ onPaymentSubmit = () => {} }) => {
  const user = store.getState().user;
  const { listingId } = useParams();
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("Credit Card");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [error, setError] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // State for success popup

  useEffect(() => {
    // Clear error when form fields change
    setError("");
  }, [amount, method, date, listingId, user?.currentUser?._id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || parseFloat(amount) <= 0) {
      return setError("Please enter a valid amount.");
    }

    const paymentDetails = {
      amount: parseFloat(amount),
      method,
      date,
      listingRef: listingId,
      userRef: user?.currentUser?._id, // Check for currentUser in store
    };

    // Debugging logs
    console.log("Payment Details:", paymentDetails);

    try {
      const response = await axios.post(
        "/backend/payments/add",
        paymentDetails
      );
      console.log(response);

      if (response.status === 201) {
        onPaymentSubmit(response.data.payment);
        setShowSuccessPopup(true); // Show success popup
        // Clear form fields after successful submission
        setAmount("");
        setMethod("Credit Card");
        setDate(new Date().toISOString().split("T")[0]);
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (err) {
      console.error("Error saving payment:", err);
      setError("Failed to save payment. Please try again.");
    }
  };

  // Function to close the success popup
  const closePopup = () => {
    setShowSuccessPopup(false);
    window.location.href = "/"; // Redirect to dashboard after successful payment
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8 max-w-md mx-auto relative top-1">
      <form onSubmit={handleSubmit}>
        <h2 className="text-xl font-semibold mb-4 mt-20">Payment Form</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="amount">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border p-2 rounded w-full"
            placeholder="Enter amount"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="method">
            Payment Method
          </label>
          <select
            id="method"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="Credit Card">Credit Card</option>
            <option value="PayPal">PayPal</option>
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="Crypto">Crypto</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="date">
            Payment Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 transition-colors"
        >
          Submit Payment
        </button>
      </form>

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-sm">
            <h3 className="text-lg font-semibold mb-4">Payment Successful!</h3>
            <p>Your payment has been processed successfully.</p>
            <button
              onClick={closePopup}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;
