import express from "express";
import passport from "passport";
import ClientModel from "./schema.js";
import { JWTAuthentication, verifyJWT } from "../../auth/tools.js";
import { JWTAuthMiddleware } from "../../auth/middlewares.js";

const clientsRouter = express.Router();

clientsRouter.post("/register", async (req, res, next) => {
  try {
    const newClient = new ClientModel(req.body);
    const { _id } = await newClient.save();
    res.status(201).send({ _id });
  } catch (error) {
    next(error);
  }
});
clientsRouter.get("/me", JWTAuthMiddleware, async (req, res, next) => {
  const client = req.client;
  console.log("this is be", client);
  try {
    const me = await ClientModel.findById(client._id).populate("events");

    res.send(me);
  } catch (error) {}
});

clientsRouter.get("/", JWTAuthMiddleware, async (req, res, next) => {
  try {
    const clients = await ClientModel.find();
    console.log(clients);
    res.send(clients);
  } catch (error) {
    next(error);
  }
});
clientsRouter.get("/:id", JWTAuthMiddleware, async (req, res, next) => {
  try {
    let client = await ClientModel.findById(req.params.id);

    if (!client) {
      res.status(404).send({ message: "Client not found" });
    } else {
      res.send(client);
    }
  } catch (error) {
    next(error);
  }
});
clientsRouter.put("/:id", async (req, res, next) => {
  try {
    let client = await ClientModel.findById(req.params.id);
    if (!client) {
      res.status(404).send({ message: "Client not found" });
    } else {
      client = await ClientModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.send(client);
    }
  } catch (error) {
    next(error);
  }
});
clientsRouter.delete("/:id", async (req, res, next) => {
  try {
    const client = await ClientModel.findByIdAndDelete(req.params.id);
    if (!client) {
      res.status(404).send({ message: "Client not found" });
    } else {
      res.send(client);
    }
  } catch (error) {
    next(error);
  }
});

clientsRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const client = await ClientModel.checkCreditentials(email, password);
    if (client) {
      const accessToken = await JWTAuthentication(client);
      res.status(200).send({ accessToken });
    } else {
      next(new Error("Invalid credentials"));
    }
  } catch (error) {
    next(error);
  }
});

clientsRouter.post("/logout", JWTAuthMiddleware, async (req, res, next) => {
  try {
    res.status(200).send({ message: "Logout success" });
  } catch (error) {
    next(error);
  }
});

clientsRouter.get("/googlelogin", passport.authenticate("google"));

clientsRouter.get(
  "/googleRedirect",
  passport.authenticate("google"),
  async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  }
);
export default clientsRouter;
