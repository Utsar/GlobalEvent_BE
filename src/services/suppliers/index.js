import express from "express";
import SupplierModel from "./schema.js";
import { JWTAuthMiddleware } from "../../auth/middlewares.js";

const suppliersRouter = express.Router();

suppliersRouter.post("/register", async (req, res, next) => {
  try {
    const newSupplier = new SupplierModel(req.body);
    const { _id } = await newSupplier.save();
    res.status(201).send({ _id });
  } catch (error) {
    next(error);
  }
});
suppliersRouter.get("/me", JWTAuthMiddleware, async (req, res, next) => {
  const supplier = req.supplier;
  try {
    const me = await SupplierModel.findById(supplier._id);
    res.send(me);
  } catch (error) {
    next(error);
  }
});
suppliersRouter.get("/", JWTAuthMiddleware, async (req, res, next) => {
  try {
    const suppliers = await SupplierModel.find();
    res.send(suppliers);
  } catch (error) {
    next(error);
  }
});
suppliersRouter.get("/:id", JWTAuthMiddleware, async (req, res, next) => {
  try {
    const supplier = await SupplierModel.findById(req.params.id);
    if (!supplier) {
      res.status(404).send({ message: "Supplier not found" });
    } else {
      res.send(supplier);
    }
  } catch (error) {
    next(error);
  }
});
suppliersRouter.put("/:id", JWTAuthMiddleware, async (req, res, next) => {
  try {
    let supplier = await SupplierModel.findById(req.params.id);

    if (!supplier) {
      res.status(404).send({ message: "Supplier not found" });
    } else {
      supplier = await SupplierModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.send(supplier);
    }
  } catch (error) {
    next(error);
  }
});
suppliersRouter.delete("/:id", JWTAuthMiddleware, async (req, res, next) => {
  try {
    const supplier = await SupplierModel.findByIdAndDelete(req.params.id);
    if (!supplier) {
      res.status(404).send({ message: "Supplier not found" });
    } else {
      res.send(supplier);
    }
  } catch (error) {
    next(error);
  }
});

export default suppliersRouter;
