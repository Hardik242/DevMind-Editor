"use client";

import {Button} from "@/src/components/ui/button";
import {Templates} from "@prisma/client";
import {PlusIcon} from "lucide-react";
import Image from "next/image";
import TemplateSelectionModal from "./template-selection-modal";
import {useState} from "react";
import {createPlayground} from "../actions";
import {toast} from "sonner";
import {useRouter} from "next/navigation";

export default function AddNewButton() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState<{
        title: string;
        template: Templates;
        description?: string;
    } | null>(null);

    const router = useRouter();

    async function handleSubmit(data: {
        title: string;
        template: Templates;
        description?: string;
    }) {
        setSelectedTemplate(data);

        try {
            const res = await createPlayground(data);
            toast.success("Playground created successfully!");
            router.replace(`/playground/${res?.id}`);
        } catch (error) {
            console.error(error);
            toast.error("Error while creating playground!\nPlease try again");
        }

        setIsModalOpen(false);
    }

    return (
        <>
            <div
                className="group px-6 py-6 flex flex-row justify-between items-center border rounded-lg bg-muted cursor-pointer transition-all duration-300 ease-in-out hover:bg-background hover:border-primary hover:scale-[1.02] drop-shadow-lg hover:drop-shadow-primary/50"
                onClick={() => setIsModalOpen(true)}>
                <div className="flex flex-row justify-center items-start gap-4">
                    <Button
                        variant={"outline"}
                        className="flex justify-center items-center bg-white group-hover:bg-[#fff8f8] group-hover:border-primary group-hover:text-primary transition-colors duration-300"
                        size={"icon"}>
                        <PlusIcon
                            size={30}
                            className="transition-transform duration-300 group-hover:rotate-90"
                        />
                    </Button>
                    <div className="flex flex-col">
                        <h1 className="text-xl font-bold text-primary">
                            Add New
                        </h1>
                        <p className="text-sm text-muted-foreground max-w-[220px]">
                            Create a new playground
                        </p>
                    </div>
                </div>

                <div className="relative overflow-hidden">
                    <Image
                        src={"/add-new.svg"}
                        alt="Create new playground"
                        width={150}
                        height={150}
                        className="transition-transform duration-300 rotate-y-180 group-hover:drop-shadow-primary group-hover:drop-shadow-sm"
                    />
                </div>
            </div>

            <TemplateSelectionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
            />
        </>
    );
}
