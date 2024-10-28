// src/pages/ProcessPayment.jsx
import React from "react";
import PaymentForm from "../components/PaymentForm";

const ProcessPayment = () => {
  const handlePaymentSubmit = (paymentDetails) => {
    console.log("Payment Submitted:", paymentDetails);
    // Replace with API call to process payment
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Process a New Payment</h2>
      <PaymentForm onPaymentSubmit={handlePaymentSubmit} />
    </div>
  );
};

export default ProcessPayment;
