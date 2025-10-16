"use client";

import {Button} from "@/src/components/ui/button";
import {DotLottieReact} from "@lottiefiles/dotlottie-react";
import {ArrowUpRight} from "lucide-react";
import Link from "next/link";

export default function Home() {
    return (
        <div className="flex z-20 flex-col items-center justify-start min-h-screen py-2 mt-4">
            <div className="flex z-10 flex-col justify-center items-center my-5">
                <DotLottieReact
                    className="size-96"
                    src="https://lottie.host/7fc56116-c6d0-4e52-b78c-6a94feca3dc6/MsDwVWGYfC.lottie"
                    loop
                    autoplay
                />

                <h1 className="z-20 text-5xl mt-5 font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-teal-500 via-green-500 to-emerald-500 tracking-tight leading-[1.3] ">
                    DevMind Code Editor with intelligence
                </h1>

                <p className="mt-2 text-lg text-center text-gray-600 dark:text-gray-400 px-5 py-10 max-w-2xl">
                    DevMind Code Editor is your intelligent coding
                    companion—offering real-time AI-powered suggestions,
                    seamless code reviews, and collaborative features that
                    supercharge your development workflow. Built for modern web
                    engineers, it transforms your browser into a smart,
                    responsive IDE that thinks with you.
                </p>

                <Link href="/dashboard" className="mb-8">
                    <Button variant={"brand"} size={"lg"}>
                        Get Started <ArrowUpRight className="size-3 ml-2" />
                    </Button>
                </Link>
            </div>
        </div>
    );
}
