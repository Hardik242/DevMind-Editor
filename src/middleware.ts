import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import {
    apiAuthPrefix,
    authRoutes,
    DEFAULT_LOGIN_REDIRECT,
    publicRoutes,
} from "../routes";

const {auth} = NextAuth(authConfig);

export default auth((req) => {
    const {nextUrl} = req;

    const isLoggedin = !!req.auth;

    const isApiRoute = nextUrl.pathname.startsWith(apiAuthPrefix);

    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if (isApiRoute) {
        return null;
    }

    if (isAuthRoute) {
        if (isLoggedin) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return null;
    }

    if (!isLoggedin && !isPublicRoute) {
        return Response.redirect(new URL("/auth/signin", nextUrl));
    }

    return null;
});

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
