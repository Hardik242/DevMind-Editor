import Image from "next/image";

interface EmptyStateProps {
    title: string;
    description: string;
    imageSrc?: string;
}

export default function EmptyState({
    title,
    description,
    imageSrc,
}: EmptyStateProps) {
    return (
        <div className="flex flex-col justify-center items-center py-16">
            <Image
                src={imageSrc!}
                alt={title}
                className="size-48"
                height={192}
                width={192}
            />

            <h2 className="font-semibold text-xl text-gray-500">{title}</h2>
            <p className="text-gray-400">{description}</p>
        </div>
    );
}
