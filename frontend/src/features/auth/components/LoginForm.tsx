import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { PATHS } from "@/routes/paths";
import { useLogin } from "../hooks/useLogin";
import { loginSchema, type LoginFormData } from "../schemas/login.schema";

export function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),

        defaultValues: {
            email: "",
            password: "",
        },
    });

    const loginMutation = useLogin();

    function onSubmit(data: LoginFormData) {
        loginMutation.mutate(data, {
            onSuccess: () => {
                toast.success("Successfully signed in!");
                // Navigation is handled by useLogin → getRedirectPath
            },
            onError: () => {
                toast.error("Failed to sign in. Please check your credentials.");
            },
        });
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
        >
            <div className="space-y-2">
                <Label htmlFor="email">
                    Email Address
                </Label>

                <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    {...register("email")}
                />

                {errors.email && (
                    <p className="text-sm text-danger">
                        {errors.email.message}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <Label htmlFor="password">
                        Password
                    </Label>

                    <button
                        type="button"
                        className="text-sm text-primary hover:underline"
                    >
                        Forgot Password?
                    </button>
                </div>

                <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    autoComplete="current-password"
                    {...register("password")}
                />

                {errors.password && (
                    <p className="text-sm text-danger">
                        {errors.password.message}
                    </p>
                )}
            </div>

            <Button
                type="submit"
                className="w-full"
                loading={isSubmitting || loginMutation.isPending}
            >
                Sign In
            </Button>

            <p className="text-center text-sm text-muted">
                Don't have an account?{" "}
                <Link
                    to={PATHS.auth.register}
                    className="font-medium text-primary hover:underline"
                >
                    Create Account
                </Link>
            </p>
        </form>
    );
}