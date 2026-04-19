"use server"
import { signIn } from "@/auth"

export const loginWithGithub= async()=>{
    await signIn("github",{redirectTo:"/dashboard"})
}
export const loginWithGoogle= async()=>{
    await signIn("google",{redirectTo:"/dashboard"})
}