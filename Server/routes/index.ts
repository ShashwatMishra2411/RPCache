import { adminProcedure, t } from "../trpc"
import { userRouter } from "./users";
import { redisClient } from "../app";
import axios from "axios";

export const appRouter = t.router({
    sayHi: t.procedure.query(() => {//query is for getting data and mutation is for modifying data
        return "Hello World";
    }),
    logToServer: t.procedure.input(v => {
        if (typeof v === "string") return v;

        throw new Error("Invalid input: Expected String");
    }).mutation((req) => {
        console.log(req.ctx.isAdmin);
        console.log(`Client says: ${req.input}`);
        return true;
    }),
    users: userRouter,
    admin: adminProcedure.input(v => {
        if (typeof v === "string") return v;

        throw new Error("Invalid input: Expected String");
    }).query(({ ctx, input }) => {
        if (ctx.user)
            return {user:ctx.user,input:input};
        else {
            return (ctx.code);
        }
    }),
    getPics: t.procedure.input(v=>{
        if(typeof v === "number"|| typeof v === "undefined") return v;
        throw new Error("Invalid Input: Expected a number")
    }).query(async req=>{
        const albumId = req.input;
        if(await redisClient.get("photos")){
            const data = await redisClient.get("photos")
            return JSON.parse(data as string);
        }else{
            const {data} = await axios.get("https://jsonplaceholder.typicode.com/photos",
            {params: {albumId}})
            redisClient.set("photos", JSON.stringify(data));
            return data;
        }
    })
})
