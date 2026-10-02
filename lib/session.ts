import { cache } from "react"
import "server-only"
import { auth } from "./auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"


type Role = 'CANDIDATE' | 'EMPLOYER' |  'ADMIN'

// Reads the session from the cookie. used cache() for one lookup per request.
export const getSession = cache(async()=>{
    return auth.api.getSession({ headers: await headers() })
})

// Must be logged in, otherwise redirect to /login.
export async function requireUser(){
    const session = await getSession();
    if(!session){
        redirect('/login')
    }
    return session.user;
}

// Must be logged in and have the right role, otherwise go home.
export async function requireRole(role: Role){
    const user = await requireUser();
    if(user.role !== role){
        redirect('/')
    }
    return user;
}       

