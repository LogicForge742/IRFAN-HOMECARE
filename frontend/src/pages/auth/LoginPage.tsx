import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/shared/components/ui/card";

import { Badge } from "@/shared/components/ui/badge";
import { LoginForm } from "@/features/auth/components/LoginForm";

export default function LoginPage() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-background px-6 py-12">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="space-y-4 text-center">
                    <div className="flex justify-center">
                        <Badge>Healthcare Platform</Badge>
                    </div>

                    <CardTitle className="text-3xl">
                        Irfan HomeCare
                    </CardTitle>

                    <CardDescription>
                        Welcome back. Sign in to access your healthcare dashboard.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <LoginForm />
                </CardContent>
            </Card>
        </main>
    );
}