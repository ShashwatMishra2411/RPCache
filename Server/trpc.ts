import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import { createContext } from "./context";

export const t = initTRPC.context<inferAsyncReturnType<typeof createContext>>().create();//describing the type of the context using inferAsyncReturnType

const isAdminMiddleware = t.middleware(({ ctx, next }) => {
    const token = ctx.req.headers.authorization;
    if (token === "TOKEN") return next({ ctx: { user: { id: 1 } } });
    else return next({ ctx: { code: "UNAUTHORIZED" } });
})

// const getHeaders

export const adminProcedure = t.procedure.use(isAdminMiddleware);