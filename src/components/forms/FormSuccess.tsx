import Alert from "@components/bricks/Alert";

export default function FormSuccess({ label }: { label: string }) {
    return (
        <div className="min-h-[400px] md:min-h-[550px] px-5 flex  pb-12 md:pb-40 items-end justify-center">
            <Alert
                status="success"
                title="Úspěch!"
                text={label}
                className="w-fit"
            />
        </div>
    );
}