import { CreateExpressContextOptions } from "@trpc/server/adapters/express"


export function createContext() {
    return {
        isAdmin: true,
        code: "",
    }
}

export function getContext({ req, res }: CreateExpressContextOptions) {
    return {
        req,
        res,
        isAdmin: true,
        code: ""
    }
}

// {req, res}:CreateExpressContextOptions