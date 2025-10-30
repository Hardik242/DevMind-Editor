import {Button} from "@/src/components/ui/button";
import {ArrowDownIcon} from "lucide-react";
import Image from "next/image";

export default function AddRepoButton() {
    return (
        <div className="group px-6 py-6 flex flex-row justify-between items-center border rounded-lg bg-muted cursor-pointer transition-all duration-300 ease-in-out hover:bg-background hover:border-primary hover:scale-[1.02] drop-shadow-lg hover:drop-shadow-primary/50">
            <div className="flex flex-row justify-center items-start gap-4">
                <Button
                    variant={"outline"}
                    className="flex justify-center items-center bg-white group-hover:bg-[#fff8f8] group-hover:border-primary group-hover:text-primary transition-colors duration-300"
                    size={"icon"}>
                    <ArrowDownIcon size={30} />
                </Button>
                <div className="flex flex-col">
                    <h1 className="text-xl font-bold text-primary">
                        Open Github Repository
                    </h1>
                    <p className="text-sm text-muted-foreground max-w-[220px]">
                        Work with your repository in our editor
                    </p>
                </div>
            </div>

            <div className="relative overflow-hidden">
                <Image
                    src={"/add-repo.svg"}
                    alt="Create new playground"
                    width={150}
                    height={150}
                    className="transition-transform duration-300 group-hover:drop-shadow-primary group-hover:drop-shadow-sm"
                />
            </div>
        </div>
    );
}
