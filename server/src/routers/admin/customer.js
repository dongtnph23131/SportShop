import { Router } from "express";
import Customer from "../../models/customer";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find();

    return res.status(200).json(customers);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id).populate(
      "orderIds"
    );

    if (!customer) {
      return res.status(404).send("Customer does not exist!");
    }

    return res.status(200).json(customer);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

export const customerRoutes = router;
