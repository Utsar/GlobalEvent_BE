import mongoose from "mongoose";

const { Schema, model } = mongoose;

const SupplierSchema = new Schema({
  supplierName: { type: String, required: true },
  supplierAddress: { type: String, required: true },
  supplierState: { type: String, required: true },
  supplierCity: { type: String, required: true },
  supplierZip: { type: String, required: true },
  supplierEmail: { type: String, required: true },
  supplierCategory: [{ type: String, required: true }],
  supplierOperatingRange: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
      index: "2dsphere",
    },
  },
  createdAt: { type: Date, default: Date.now },
  supplierPhone: { type: String },
});

export default model("Supplier", SupplierSchema);
