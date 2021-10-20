import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema, model } = mongoose;

const ClientSchema = new Schema(
  {
    firstName: { type: String },
    surname: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    events: [{ type: Schema.Types.ObjectId, ref: "Event" }],
    googleId: { type: String },
  },
  { timestamps: new Date("<YYYY-mm-dd>") }
);

// hashing the password before saving it to the database
ClientSchema.pre("save", async function (next) {
  const newClient = this;
  const plainPW = newClient.password;
  if (!newClient.isModified("password")) return next();
  newClient.password = await bcrypt.hash(plainPW, 10);
  next();
});

// deleting information which doesnt need to be visible
ClientSchema.methods.toJSON = function () {
  const client = this;
  const clientObject = client.toObject();
  delete clientObject.password;
  delete clientObject.__v;
  return clientObject;
};

ClientSchema.statics.checkCreditentials = async function (email, plainPW) {
  const client = await this.findOne({ email });
  if (client) {
    const isMatch = await bcrypt.compare(plainPW, client.password);
    if (isMatch) return client;
    else return null;
  } else {
    return null;
  }
};

export default model("Client", ClientSchema);
