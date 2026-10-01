import { Result } from "pg"
import { authClient } from "./auth-clients"

export async function signUp(input: {
    name: string
    email: string
    password: string
    role: "CANDIDATE" | "EMPLOYER"
}): Promise<Result> {
    const {error} = await authClient.signUp.email(input)
    return {error: error ? 'Could not create your account.' : null}
}

export async function signIn(input: {
    email: string
    password: string
}): Promise<result> {
    const {error} = await authClient.signIn.email(input)
    return {error: error ? 'Invalid email or password.' : null}
}