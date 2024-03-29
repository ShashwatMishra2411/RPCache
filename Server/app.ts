import express from "express";
import cors from "cors";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import {applyWSSHandler} from "@trpc/server/adapters/ws";
import {appRouter} from "./routes/index";
import { createContext, getContext } from "./context";
import ws from "ws";
import {createClient} from "redis";

export const redisClient = createClient();

redisClient.on("error", err=>console.log("Redis client Error", err))
redisClient.connect();
const app = express();
app.use(cors());
app.use("/trpc", createExpressMiddleware({router: appRouter
,createContext: getContext}));

const server = app.listen(3000);

applyWSSHandler({
    wss: new ws.Server({server}),
    router: appRouter,
    createContext,
});
console.log("hi");

export type Approuter = typeof appRouter;