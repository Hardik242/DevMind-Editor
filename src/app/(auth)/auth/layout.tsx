import {ReactNode} from "react";

const AuthLayout = ({children}: {children: ReactNode}) => {
    return (
        <div className="bg-foreground w-full">
            <main className="flex justify-center items-center h-screen flex-col bg-background/90">
                {children}
            </main>
        </div>
    );
};

export default AuthLayout;
