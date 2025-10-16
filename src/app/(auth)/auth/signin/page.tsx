"use client";

import SignInFormClient from "@/features/auth/components/signin-form-client";
import {Toaster} from "@/src/components/ui/sonner";
import Image from "next/image";
import {useSearchParams} from "next/navigation";
import {useEffect} from "react";
import {toast} from "sonner";

function showToastError(searchParams: string) {
    if (searchParams === "OAuthAccountNotLinked") {
        toast.error("Please use a different OAuth account to sign in.");
    }
}

export default function Page() {
    const searchParams = useSearchParams();

    useEffect(() => {
        const error = searchParams.get("error");

        if (error !== null) {
            showToastError(error);
        }
    }, [searchParams]);

    return (
        <div className="flex flex-col gap-4 items-center justify-center">
            <div className="flex gap-3 items-center">
                <Image
                    src="/logo.png"
                    width={64}
                    height={64}
                    alt="DevMind Logo"
                />
                <span className="text-4xl font-bold text-foreground">
                    DevMind Code Editor
                </span>
            </div>

            <SignInFormClient />

            <Toaster richColors={true} position="top-right" />
        </div>
    );
}
