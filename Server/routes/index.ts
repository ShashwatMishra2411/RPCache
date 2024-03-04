import {adminProcedure, t} from "../trpc"
import { userRouter } from "./users";

export const appRouter = t.router({
    sayHi: t.procedure.query(() => {//query is for getting data and mutation is for modifying data
        return "Hello World";
    }),
    logToServer: t.procedure.input(v =>{
        if (typeof v === "string") return v;

        throw new Error("Invalid input: Expected String");
    }).mutation((req)=>{
        console.log(req.ctx.isAdmin);
        console.log(`Client says: ${req.input}`);
        return true;
    }),
    users: userRouter,
    admin: adminProcedure.query(({ctx})=>{
        if(ctx.user)
        return ctx.user;
    else{
        return (ctx.code);
    }
    })
})
