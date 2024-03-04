import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import { createContext, getContext } from "./context";

export const t = initTRPC.context<inferAsyncReturnType<typeof createContext>>().create();//describing the type of the context using inferAsyncReturnType

export const t1 = initTRPC.context<inferAsyncReturnType<typeof getContext>>().create();

const isAdminMiddleware = t1.middleware(({ ctx, next }) => {
    const token = ctx.req.headers.authorization;
    if (token === "TOKEN") return next({ ctx: { user: { id: 1 } } });
    else return next({ ctx: { code: "UNAUTHORIZED" } });
})

// const getHeaders

export const adminProcedure = t1.procedure.use(isAdminMiddleware);