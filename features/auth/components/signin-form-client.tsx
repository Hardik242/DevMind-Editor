import {signIn} from "@/auth";
import {Button} from "@/src/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/src/components/ui/card";
import Image from "next/image";

async function handleGoogleSignIn() {
    "use server";
    await signIn("google");
}
async function handleGithubSignIn() {
    "use server";
    await signIn("github");
}

export default function SignInFormClient() {
    return (
        <Card className="w-full max-w-md">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">
                    Sign in to continue
                </CardTitle>

                <CardDescription className="text-center">
                    Choose your prefered sign in method
                </CardDescription>
            </CardHeader>

            <CardContent className="grid justify-center gap-4">
                <form action={handleGoogleSignIn}>
                    <Button className="w-64">
                        <Image
                            src="/google.png"
                            height={16}
                            width={16}
                            alt="Google Icon"
                        />
                        <span>Sign in with Google</span>
                    </Button>
                </form>
                <form action={handleGithubSignIn}>
                    <Button className="w-64">
                        <Image
                            src="/github.png"
                            height={16}
                            width={16}
                            alt="Github Icon"
                        />
                        <span>Sign in with Github</span>
                    </Button>
                </form>
            </CardContent>

            <CardFooter>
                <CardDescription className="px-6 text-center">
                    By clicking continue, you agree to our{" "}
                    <a href="#" className="font-semibold text-black">
                        Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="font-semibold text-black">
                        Privacy Policy
                    </a>
                    .
                </CardDescription>
            </CardFooter>
        </Card>
    );
}
