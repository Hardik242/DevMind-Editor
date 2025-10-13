import {ReactNode} from "react";

const AuthLayout = ({children}: {children: ReactNode}) => {
    return (
        <main className="flex justify-center items-center h-screen flex-col bg-zinc-800">
            {children}
        </main>
    );
};

export default AuthLayout;
