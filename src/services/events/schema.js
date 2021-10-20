import mongoose from "mongoose";

const { Schema, model } = mongoose;

const EventSchema = new Schema({
  eventType: { type: String, required: true },
  location: { type: String },
  attendees: { type: String, required: true },
  datetime: {
    type: String,
    required: true,
    Date: { type: Date, default: Date.now },
  },
  venueType: { type: String },
  venueDescription: { type: String },
  image: {
    data: Buffer,
    contentType: String,
  },
  venueBudget: { type: String },
  catererType: { type: String },
  catererDescription: { type: String },
  image: {
    data: Buffer,
    contentType: String,
  },
  catererBudget: { type: String },
  entertainmentType: { type: String },
  entertainmentDescription: { type: String },
  image: {
    data: Buffer,
    contentType: String,
  },
  entertainmentBudget: { type: String },
  bidStart: {
    type: Date,
    default: Date.now,
  },
  bidEnd: {
    type: Date,
    // required: "Auction end time is required",
  },
  client: {
    type: mongoose.Schema.ObjectId,
    ref: "Client",
  },
  startingBid: { type: Number, default: 0 },
  bids: [
    {
      bidder: { type: mongoose.Schema.ObjectId, ref: "Supplier" },
      bid: Number,
      time: Date,
    },
  ],
});

export default model("Event", EventSchema);
