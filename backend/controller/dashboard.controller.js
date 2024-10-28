// backend/controllers/dashboard.controller.js
import Transaction from '../models/Transaction.model.js';

// Function to get dashboard data
export const getDashboardData = async (req, res) => {
  try {
    const totalRevenue = await Transaction.aggregate([
      { $match: { status: 'Success' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);

    const pendingPayments = await Transaction.countDocuments({ status: 'Pending' });
    const successfulTransactions = await Transaction.countDocuments({ status: 'Success' });
    const failedTransactions = await Transaction.countDocuments({ status: 'Failed' });

    res.json({
      totalRevenue: totalRevenue[0]?.total || 0,
      pendingPayments,
      successfulTransactions,
      failedTransactions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching dashboard data' });
  }
};
