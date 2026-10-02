import { cache } from "react"
import "server-only"
import { auth } from "./auth"
import { headers } from "next/headers"


type Role = 'CANDIDATE' | 'EMPLOYER' |  'ADMIN'

// Reads the session from the cookie. used cache() for one lookup per request.
export const getSession = cache(async()=>{
    return auth.api.getSession({headers: await headers()})
})

