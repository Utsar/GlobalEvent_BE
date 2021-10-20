import ClientModel from "../services/clients/schema.js";
import { verifyJWT } from "./tools.js";

export const JWTAuthMiddleware = async (req, res, next) => {
  console.log(req.headers);
  if (!req.headers.authorization) {
    next(new Error("Provide credentials in the Authorization header"));
  } else {
    const token = req.headers.authorization.replace("Bearer ", "");
    console.log(token);
    const decodedToken = await verifyJWT(token);
    const client = await ClientModel.findById(decodedToken._id);
    if (client) {
      req.client = client;
      next();
    } else {
      next(new Error("Invalid credentials"));
    }
  }
};
