import {CreateExpressContextOptions} from "@trpc/server/adapters/express"


export function createContext({req, res}:CreateExpressContextOptions) {
    return {
        req,
        res,
        isAdmin: true,
        code: "",
    }
}

export function wsContext(){
    return {
        isAdmin: true,
        code: "",
    }
}