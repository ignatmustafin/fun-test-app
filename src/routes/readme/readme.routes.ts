import { Router } from "express";
import { getHtml } from "./readme.actions";

export const ReadmeRouter = Router().get("/", getHtml);
