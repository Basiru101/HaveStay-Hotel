import React, { useState } from 'react';
import Dashboard from './Dashboard';
import PaymentForm from './PaymentForm';

const AdminDashboard = () => {
  const [transactions, setTransactions] = useState([]);

  // Handler to add new transactions
  const handlePaymentSubmit = (paymentDetails) => {
    const newTransaction = {
      ...paymentDetails,
      transactionId: `TXN-${Date.now()}`, 
    };
    setTransactions((prev) => [newTransaction, ...prev]);
  };

  return (
    <div>
      <PaymentForm onPaymentSubmit={handlePaymentSubmit} />
      <Dashboard transactions={transactions} />
    </div>
  );
};

export default AdminDashboard;
