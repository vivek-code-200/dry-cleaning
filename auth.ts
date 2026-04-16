import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "./lib/prisma"


// const customAdapter = PrismaAdapter(prisma)

export const {
    auth,
    handlers,
    signIn,
    signOut,
} = NextAuth({
    secret: process.env.NEXTAUTH_SECRET,
    // adapter: {
    //     ...customAdapter,
    //     getUserByAccount: async ({ provider, providerAccountId }: { provider: string; providerAccountId: string }) => {
    //         const account = await prisma.account.findUnique({
    //             where: {
    //                 providerId_providerAccountId: {
    //                     providerId: provider,
    //                     providerAccountId,
    //                 },
    //             },
    //             include: { user: true },
    //         })
    //         return account?.user ?? null
    //     },
    //     linkAccount: async (account) => {
    //         await prisma.account.create({
    //             data: {
    //                 userId: account.userId,
    //                 providerType: account.type,
    //                 providerId: account.provider,
    //                 providerAccountId: account.providerAccountId,
    //                 refreshToken: account.refresh_token,
    //                 accessToken: account.access_token,
    //                 accessTokenExpires: account.expires_at ? new Date(account.expires_at * 1000) : null,
    //             },
    //         })
    //     },
    // } as Adapter,
    adapter: PrismaAdapter(prisma),

    providers: [
        GitHub({
            clientId: process.env.AUTH_GITHUB_ID!,
            clientSecret: process.env.AUTH_GIHUB_SECRET!,
            allowDangerousEmailAccountLinking: true,
        }),
        Google({
            clientId: process.env.AUTH_GOOGLE_ID!,
            clientSecret: process.env.AUTH_GOOGLE_SECRET!,
        }),
        // Credentials({
        //     name: "Email & Password",
        //     credentials: {
        //         email: { label: "Email", type: "email" },
        //         password: { label: "Password", type: "password" },
        //     },

        //     async authorize(credentials) {
        //         const parsed = CredentialsSchema.safeParse(credentials)
        //         if (!parsed.success) {
        //             return null
        //             // throw new Error("Invalid credentials")
        //         }

        //         const { email, password } = parsed.data

        //         const user = await prisma.user.findUnique({ where: { email } })
        //         if (!user || !user.password) {
        //             // throw new Error("User not found or password not set yet!")
        //             return null
        //         }

        //         if (!user.emailVerified) {
        //             throw new Error("NOT_VERIFIED")
        //         }
        //         const isValid = await compare(password, user.password)
        //         if (!isValid) {
        //             // throw new Error("Invalid password!")
        //             return null
        //         }


        //         return user
        //         // {
        //         //     id: user.id,
        //         //     email: user.email,
        //         //     name: user.name,
        //         // }
        //     },
        // })
    ],

    // events: {
    //     async createUser({ user }) {
    //         await prisma.user.update({
    //             where: { id: user.id },
    //             data: {
    //                 emailVerified: new Date()
    //             }
    //         })
    //     }
    // },

    session: {
        strategy: "jwt",
    },

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id

            }
            // if (account?.provider !== "credentials" && user) {
            //     await prisma.user.upd({
            //         // where: { email: user.email! },
            //         data: { emailVerified: new Date() }
            //     })
            // }
            // For OAuth providers, persist session to DB manually if needed
            // if (account?.provider !== "credentials" && user) {
            //     const sessionToken = crypto.randomUUID()
            //     const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)

            //     await prisma.session.create({
            //         data: {
            //             sessionToken,
            //             userId: user.id as string,
            //             expires,
            //         },
            //     })
            //     await prisma.user.update({
            //         where: { email: user.email! },
            //         data: { emailVerified: new Date() }
            //     })
            //     token.sessionToken = sessionToken
            // }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string
            }
            return session
        },
    },

    debug: true,
})