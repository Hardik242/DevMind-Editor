"use client";

import {DotLottieReact} from "@lottiefiles/dotlottie-react";
import {Button} from "../components/ui/button";
import {ArrowUpRight} from "lucide-react";
import Link from "next/link";

export default function Page() {
    return (
        <div className="h-screen w-screen flex justify-center items-center bg-white">
            <div className="w-full max-w-[850px] flex flex-col items-center gap-4 px-4">
                <h1 className="text-4xl text-black text-center font-bold">
                    Page Not Found
                </h1>
                <DotLottieReact
                    className="w-full h-full"
                    src="https://lottie.host/b696aa38-0d84-4218-9dc1-87108f028ad4/wf85ezM7o3.lottie"
                    loop
                    autoplay
                />
                <Link href="/">
                    <Button>
                        Go to Home Page <ArrowUpRight className="size-4" />
                    </Button>
                </Link>
            </div>
        </div>
    );
}
