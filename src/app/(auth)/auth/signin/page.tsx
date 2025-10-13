import SignInFormClient from "@/features/auth/components/signin-form-client";
import Image from "next/image";

export default function Page() {
    return (
        <div className="flex flex-col gap-4 items-center justify-center">
            <div className="flex gap-3 items-center">
                <Image
                    src="/logo.png"
                    width={64}
                    height={64}
                    alt="DevMind Logo"
                />
                <span className="text-4xl font-bold text-white">
                    DevMind Code Editor
                </span>
            </div>

            <SignInFormClient />
        </div>
    );
}
