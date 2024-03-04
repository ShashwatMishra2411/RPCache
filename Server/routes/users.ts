import {t} from "../trpc"
import {z} from "zod";

const procedures = [
    t.procedure.input(z.object({userId: z.string()})),
]

export const userRouter = t.router({
    getUser: procedures[0].query((req)=>{
        return req.input.userId;
    })
})