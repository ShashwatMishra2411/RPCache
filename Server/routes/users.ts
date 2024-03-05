import {t} from "../trpc"
import {z} from "zod";
import {EventEmitter} from "events";
import { observable } from "@trpc/server/observable";


const ee = new EventEmitter();
const procedures = [
    t.procedure.input(z.object({userId: z.string()})),
]

export const userRouter = t.router({
    getUser: procedures[0].query((req)=>{
        ee.emit("getUser", req.input.userId)
        return req.input.userId;
    }),
    updateUser: t.procedure.subscription(()=>{
        return observable<string>((emit)=>{
            const onGetUser = (userId:string)=>{
                console.log("User updated", userId);
                emit.next(userId);
            }
            ee.on("getUser", onGetUser);
            return ()=>{
                ee.off("getUser", onGetUser);
            }
        })
    })
})