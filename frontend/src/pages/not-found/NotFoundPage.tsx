import { Button } from "@/shared/components/ui/button";
import { Link } from "react-router-dom";
import { FileQuestion } from "lucide-react";

export default function NotFoundPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
            <div className="flex flex-col items-center space-y-6 max-w-md">
                <div className="p-4 bg-teal-50 text-teal-700 rounded-full">
                    <FileQuestion size={48} />
                </div>

                <div className="space-y-2">
                    <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
                        Page Not Found
                    </h1>
                    <p className="text-muted">
                        We couldn't find the page you're looking for. It might have been moved or deleted.
                    </p>
                </div>

                <Link to="/" className="w-full">
                    <Button className="w-full">
                        Back to Dashboard
                    </Button>
                </Link>
            </div>
        </main>
    );
}
