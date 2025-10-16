import {PrismaAdapter} from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import authConfig from "./auth.config";
import {getUserById} from "./features/auth/action";
import {db} from "./src/lib/db";

export const {auth, handlers, signIn, signOut} = NextAuth({
    pages: {
        signIn: "/auth/signin",
    },
    callbacks: {
        /*         async signIn({user, account, profile}) {
            console.log("Inside sigin but above condition");
            if (!user || !account) return false;
            console.log("Inside sigin but below condition");

            const existingUser = await db.user.findUnique({
                where: {email: user.email},
            });

            if (!existingUser) {
                const newUser = await db.user.create({
                    data: {
                        email: user.email,
                        name: user.name,
                        imageUrl: user.image,

                        accounts: {
                            create: {
                                type: account.type,
                                provider: account.provider,
                                providerAccountId: account.providerAccountId,
                                refresh_token: account.refresh_token,
                                access_token: account.access_token,
                                expires_at: account.expires_at,
                                token_type: account.token_type,
                                scope: account.scope,
                                id_token: account.id_token,
                                session_state: account.session_state,
                            },
                        },
                    },
                });

                if (!newUser) return false;
            } else {
                const existingAccount = await db.account.findUnique({
                    where: {
                        provider_providerAccountId: {
                            provider: account.provider,
                            providerAccountId: account.providerAccountId,
                        },
                    },
                });

                if (!existingAccount) {
                    const newAccount = await db.account.create({
                        data: {
                            type: account.type,
                            provider: account.provider,
                            providerAccountId: account.providerAccountId,
                            refresh_token: account.refresh_token,
                            access_token: account.access_token,
                            expires_at: account.expires_at,
                            token_type: account.token_type,
                            scope: account.scope,
                            id_token: account.id_token,
                            session_state: account.session_state,
                        },
                    });

                    if (!newAccount) {
                        return false;
                    }
                }
            }

            return true;
        },
 */
        async jwt({token}) {
            if (!token.sub) return token;

            const existingUser = await getUserById(token.sub);

            if (!existingUser) return token;

            token.name = existingUser.name;
            token.email = existingUser.email;
            token.role = existingUser.role;
            token.image = existingUser.image;

            return token;
        },

        async session({session, token}) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
                session.user.role = token.role;
                session.user.image = token.image;
            }

            return session;
        },
    },
    secret: process.env.AUTH_SECRET,
    adapter: PrismaAdapter(db),
    session: {strategy: "jwt"},
    ...authConfig,
});
