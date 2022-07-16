import express from "express";
import BandBusiness from "../../business/Bands/BandBusiness";
import { BandDatabase } from "../../data/BandDatabase";
import Authenticator from "../../services/Authenticator";
import IdGenerator from "../../services/IdGenerator";
import { BandController } from "../BandController";

export const bandRouter = express.Router();

const bandBusiness = new BandBusiness(
  new BandDatabase(),
  new Authenticator(),
  new IdGenerator()
);
const bandController = new BandController(bandBusiness);

bandRouter.post("/register", bandController.bandRegister);

bandRouter.get("/bands", bandController.getBand);
