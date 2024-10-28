import express from "express";
import { addPayment, getPayments } from "../controller/listing.controller.js"; // adjust if `addPayment` and `getPayments` are located elsewhere
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/all", verifyToken, getPayments); // GET to retrieve payments
router.post("/add", verifyToken, addPayment); // POST to add a payment

export default router;
