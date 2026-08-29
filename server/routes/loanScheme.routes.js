import express from "express";
import { getLoanSchemes } from "../controllers/loanScheme.controller.js";

const router = express.Router();

router.get("/", getLoanSchemes);

export default router;