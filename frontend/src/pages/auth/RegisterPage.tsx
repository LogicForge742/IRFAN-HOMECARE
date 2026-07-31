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

export default function RegisterPage() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-background px-6 py-12">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="space-y-4 text-center">
                    <div className="flex justify-center">
                        <Badge>Healthcare Platform</Badge>
                    </div>

                    <CardTitle className="text-3xl">
                        Create Account
                    </CardTitle>

                    <CardDescription>
                        Sign up to start managing your home care services.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input id="firstName" placeholder="John" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input id="lastName" placeholder="Doe" required />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" type="email" placeholder="you@example.com" required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" placeholder="••••••••" required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input id="confirmPassword" type="password" placeholder="••••••••" required />
                        </div>

                        <Button type="submit" className="w-full">
                            Sign Up
                        </Button>

                        <p className="text-center text-sm text-muted">
                            Already have an account?{" "}
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
