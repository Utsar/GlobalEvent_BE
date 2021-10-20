import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import passport from "passport";
import googleStrategy from "./auth/oauth.js";

// importd routes
import clientsRouter from "./services/clients/index.js";
import eventsRouter from "./services/events/index.js";
import suppliersRouter from "./services/suppliers/index.js";

const server = express();

const PORT = process.env.PORT || 3001;

passport.use("google", googleStrategy);
// ********************** Middlewares **********************
// const whitelist = [
//   process.env.MONGODB_CONNECTION,
//   "http://localhost:3000",
//   "http://localhost:3001",
//   "mongodb://localhost:27017/",
//   "http://localhost:27017/",
// ];
server.use(cors());
server.use(express.json());
server.use(passport.initialize());
// ********************** Routes **********************
server.use("/clients", clientsRouter);
server.use("/events", eventsRouter);
server.use("/suppliers", suppliersRouter);
// ********************** Error handlers **********************

console.table(listEndpoints(server));

mongoose.connect(process.env.MONGODB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
