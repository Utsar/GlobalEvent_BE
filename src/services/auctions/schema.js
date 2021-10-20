import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ClientSchema = new Schema({
  auctionName: {
    type: String,
    trim: true,
    required: "Auction name is required",
  },
  location: {
    type: String,
    trim: true,
  },
  attendees: {
    type: String,
    trim: true,
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
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

export default mongoose.model("Auction", AuctionSchema);
