import express from "express";
import EventModel from "../events/schema.js";
import ClientModel from "../clients/schema.js";
import { JWTAuthMiddleware } from "../../auth/middlewares.js";

const eventsRouter = express.Router();

eventsRouter.post("/", JWTAuthMiddleware, async (req, res, next) => {
  try {
    const event = new EventModel(req.body);
    const { _id } = await event.save();
    await ClientModel.updateOne(
      { _id: req.client._id },
      { $push: { events: _id } }
    );
    res.status(201).send({ _id });
  } catch (error) {
    next(error);
  }
});
eventsRouter.get("/", async (req, res, next) => {
  try {
    const events = await EventModel.find();
    res.send(events);
  } catch (error) {
    next(error);
  }
});
eventsRouter.get("/:eventID", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});
eventsRouter.put("/:eventID", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});
eventsRouter.delete("/:eventID", JWTAuthMiddleware, async (req, res, next) => {
  try {
    await EventModel.deleteOne({ _id: req.params.eventID });
    await ClientModel.updateOne(
      { _id: req.client._id },
      { $pull: { events: req.params.eventID } }
    );
    const client = req.client;
    client.events = client.events.filter(
      (event) => event !== req.params.eventID
    );
    res.send(client);

    await client.save();
  } catch (error) {
    next(error);
  }
});
export default eventsRouter;
