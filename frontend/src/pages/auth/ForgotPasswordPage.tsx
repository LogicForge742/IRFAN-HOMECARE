import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Link } from "react-router-dom";

export default function ForgotPasswordPage() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-background px-6 py-12">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="space-y-4 text-center">
                    <div className="flex justify-center">
                        <Badge>Healthcare Platform</Badge>
                    </div>

                    <CardTitle className="text-3xl">
                        Reset Password
                    </CardTitle>

                    <CardDescription>
                        Enter your email address and we'll send you a link to reset your password.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" type="email" placeholder="you@example.com" required />
                        </div>

                        <Button type="submit" className="w-full">
                            Send Reset Link
                        </Button>

                        <p className="text-center text-sm text-muted">
                            Remember your password?{" "}
                            <Link to="/login" className="font-medium text-primary hover:underline">
                                Sign In
                            </Link>
                        </p>
                    </form>
                </CardContent>
            </Card>
        </main>
    );
}
