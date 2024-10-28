// routes/listing.route.js
import express from "express";
import {
  createListing,
  deleteListing,
  getListing,
  getListings,
  updateListing,
  //   addPayment,
  getPayments,
  addPayment,
} from "../controller/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createListing);
router.delete("/delete/:id", verifyToken, deleteListing);
router.post("/update/:id", verifyToken, updateListing);
router.get("/get/:id", getListing);
router.get("/get", getListings);

router.post("/add", verifyToken, addPayment); // Route to add a payment
router.get("/payments", verifyToken, getPayments); // Route to get payments for the logged-in user

export default router;
